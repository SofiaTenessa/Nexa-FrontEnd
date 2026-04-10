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
import { alerts } from "../src/pages/Alerts/alertsData.js";

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

// Sensor readings — generate realistic historical data per sensorId
function generateSensorReadings(sensorId) {
  const now = new Date();
  const readings = [];

  // Config per known sensor
  const configs = {
    "monnit-1307348": {
      // DHW temp sensor — dropped below 110°F threshold ~14 days ago
      alertStartDaysAgo: 14,
      baseTemp: 118,
      dropTo: 101.8,
      dropDaysAgo: 14,
    },
  };

  const cfg = configs[sensorId] || {
    alertStartDaysAgo: 7,
    baseTemp: 115,
    dropTo: 104,
    dropDaysAgo: 7,
  };

  // Generate one reading every 15 minutes for the past 30 days
  const intervalMs = 15 * 60 * 1000;
  const totalReadings = (30 * 24 * 60 * 60 * 1000) / intervalMs;
  const dropMs = cfg.dropDaysAgo * 24 * 60 * 60 * 1000;

  for (let i = totalReadings; i >= 0; i--) {
    const ts = new Date(now.getTime() - i * intervalMs);
    const ageMs = now.getTime() - ts.getTime();

    let value;
    if (ageMs > dropMs) {
      // Before the drop — hovering around baseTemp with small noise
      value = cfg.baseTemp + (Math.random() - 0.5) * 3;
    } else {
      // After the drop — interpolate down then stabilize at dropTo
      const progress = Math.min(1, (dropMs - ageMs) / (2 * 24 * 60 * 60 * 1000));
      const trend = cfg.baseTemp - (cfg.baseTemp - cfg.dropTo) * progress;
      value = trend + (Math.random() - 0.5) * 1.5;
    }

    // Format: "MM/DD/YY HH:MM:SS AM/PM"
    const month = String(ts.getMonth() + 1).padStart(2, "0");
    const day = String(ts.getDate()).padStart(2, "0");
    const year = String(ts.getFullYear()).slice(2);
    let hours = ts.getHours();
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const hStr = String(hours).padStart(2, "0");
    const mStr = String(ts.getMinutes()).padStart(2, "0");
    const sStr = String(ts.getSeconds()).padStart(2, "0");
    const timestamp = `${month}/${day}/${year} ${hStr}:${mStr}:${sStr} ${meridiem}`;

    readings.push({ timestamp, value: parseFloat(value.toFixed(1)) });
  }

  return readings;
}

// Sensor readings endpoint
app.get("/api/sensors/:sensorId/readings", (req, res) => {
  const { sensorId } = req.params;
  const readings = generateSensorReadings(sensorId);
  res.json({ sensorId, readings });
});

// Generate AI summary for an alert
app.post("/api/ai/summary", async (req, res) => {
  const { alert } = req.body;
  const start = Date.now();

  try {
    const completion = await openai.chat.completions.create({
      model: process.env.AI_MODEL || "GPT 4.1 Mini",
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

// Get current alerts
app.get("/api/alerts", (_req, res) => {
  res.json(alerts);
});

// AI Chat
app.post("/api/ai/chat", async (req, res) => {
  const { message, sessionId = "default", alertContext } = req.body;
  const start = Date.now();

  if (!chatHistories[sessionId]) {
    const currentAlerts = alerts.filter((a) => a.status === "current");
    const alertsSummary = currentAlerts
      .map(
        (a) =>
          `- [${a.severity}] ${a.title} | Location: ${a.location} | Equipment: ${a.equipment} | Time in alert: ${a.timeInAlertFull} | Started: ${a.startTime}${a.readingValue ? ` | Reading: ${a.readingValue}` : ""}${a.readingDelta ? ` (${a.readingDelta})` : ""}`
      )
      .join("\n");

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

CURRENT FACILITY ALERTS (live data as of session start):
${alertsSummary}

Use the above alert data to answer questions about current facility status, which alerts are most urgent, recommended actions, etc. Keep responses concise and actionable.`,
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
      model: process.env.AI_MODEL || "GPT 4.1 Mini",
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
