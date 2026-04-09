const API_BASE = "/api";

export async function fetchAISummary(alert) {
  const res = await fetch(`${API_BASE}/ai/summary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alert }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch AI summary");
  }

  return res.json();
}

export async function submitFeedback({ alertId, rating, summaryText }) {
  const res = await fetch(`${API_BASE}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ alertId, rating, summaryText }),
  });

  if (!res.ok) {
    throw new Error("Failed to submit feedback");
  }

  return res.json();
}

export async function sendChatMessage({ message, sessionId, alertContext }) {
  const res = await fetch(`${API_BASE}/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sessionId, alertContext }),
  });

  if (!res.ok) {
    throw new Error("Failed to get AI response");
  }

  return res.json();
}

export async function clearChatHistory(sessionId = "default") {
  const res = await fetch(`${API_BASE}/ai/chat/${sessionId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to clear chat history");
  }

  return res.json();
}

export async function fetchMetrics() {
  const res = await fetch(`${API_BASE}/metrics`);

  if (!res.ok) {
    throw new Error("Failed to fetch metrics");
  }

  return res.json();
}
