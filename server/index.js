import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import {
  insertFeedback,
  getAllFeedback,
  insertMetric,
  getMetricsSummary,
  getFeedbackSummary,
} from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
});

// Chat histories stay in memory (session-scoped, not persistent)
const chatHistories = {};

// Generate AI summary for an alert
app.post("/api/ai/summary", async (req, res) => {
  const { alert } = req.body;
  const start = Date.now();

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a facilities management AI assistant for Nexa, a building monitoring platform.
You analyze sensor alerts and provide concise, actionable insights for facilities managers.
Keep responses brief and professional. Use plain language, not overly technical jargon.`,
        },
        {
          role: "user",
          content: `Analyze this building alert and provide:
1. A brief summary (2-3 sentences) explaining why this alert likely occurred.
2. A list of 3-4 recommended actions the facilities manager should take.

Alert details:
- Title: ${alert.title}
- Type: ${alert.type}
- Severity: ${alert.severity}
- Location: ${alert.location}
- Equipment: ${alert.equipment}
- Sensor Type: ${alert.sensorType}
- Automation Rule: ${alert.automation}
- Time in Alert: ${alert.timeInAlertFull}
- Start Time: ${alert.startTime}
${alert.readingValue ? `- Current Reading: ${alert.readingValue}` : ""}
${alert.readingDelta ? `- Delta: ${alert.readingDelta}` : ""}

Respond in JSON format:
{
  "summary": "your summary here",
  "actions": ["action 1", "action 2", "action 3"]
}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(completion.choices[0].message.content);
    const elapsed = Date.now() - start;

    insertMetric.run(alert.id, "summary", elapsed);

    res.json({
      summary: result.summary,
      actions: result.actions,
      alertId: alert.id,
      responseTimeMs: elapsed,
    });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ error: "Failed to generate AI summary" });
  }
});

// Submit feedback
app.post("/api/feedback", (req, res) => {
  const { alertId, rating, summaryText } = req.body;

  const result = insertFeedback.run(alertId, rating, summaryText || null);

  res.json({
    success: true,
    entry: { id: result.lastInsertRowid, alertId, rating },
  });
});

// Get metrics
app.get("/api/metrics", (_req, res) => {
  const metrics = getMetricsSummary.get();
  const feedback = getFeedbackSummary.get();

  res.json({
    totalRequests: metrics.total_requests,
    avgResponseTimeMs: metrics.avg_response_time_ms || 0,
    thumbsUp: feedback.thumbs_up,
    thumbsDown: feedback.thumbs_down,
    feedbackCount: feedback.total,
    approvalRate:
      feedback.thumbs_up + feedback.thumbs_down > 0
        ? Math.round(
            (feedback.thumbs_up /
              (feedback.thumbs_up + feedback.thumbs_down)) *
              100
          )
        : null,
  });
});

// Get all feedback entries
app.get("/api/feedback", (_req, res) => {
  res.json(getAllFeedback.all());
});

// AI Chat
app.post("/api/ai/chat", async (req, res) => {
  const { message, sessionId = "default", alertContext } = req.body;
  const start = Date.now();

  if (!chatHistories[sessionId]) {
    chatHistories[sessionId] = [
      {
        role: "system",
        content: `You are Nexa AI, a helpful facilities management assistant. You help facilities managers understand building alerts, sensor data, equipment issues, and maintenance best practices.

You have knowledge about:
- HVAC systems, water management, leak detection
- Temperature monitoring and Legionella risk
- Sensor communication issues and troubleshooting
- Building equipment maintenance
- Alert triage and prioritization

Keep responses concise and actionable. If you don't have specific data, provide general best practices and suggest where to look.`,
      },
    ];
  }

  // If there's alert context, inject it
  if (alertContext) {
    chatHistories[sessionId].push({
      role: "system",
      content: `The user is currently viewing this alert:
- Title: ${alertContext.title}
- Type: ${alertContext.type}
- Severity: ${alertContext.severity}
- Location: ${alertContext.location}
- Equipment: ${alertContext.equipment}
- Sensor: ${alertContext.sensorType}
- Time in Alert: ${alertContext.timeInAlertFull}
${alertContext.readingValue ? `- Reading: ${alertContext.readingValue}` : ""}`,
    });
  }

  chatHistories[sessionId].push({ role: "user", content: message });

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "gpt-4o-mini",
      messages: chatHistories[sessionId],
      temperature: 0.5,
    });

    const reply = completion.choices[0].message.content;
    chatHistories[sessionId].push({ role: "assistant", content: reply });

    const elapsed = Date.now() - start;
    insertMetric.run(null, "chat", elapsed);

    res.json({ reply, responseTimeMs: elapsed });
  } catch (err) {
    console.error("Chat error:", err.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

// Clear chat history
app.delete("/api/ai/chat/:sessionId", (req, res) => {
  delete chatHistories[req.params.sessionId];
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
