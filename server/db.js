import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database(path.join(__dirname, "nexa.db"));

// Enable WAL mode for better concurrent read performance
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alert_id TEXT NOT NULL,
    rating TEXT NOT NULL CHECK(rating IN ('up', 'down')),
    summary_text TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS ai_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    alert_id TEXT,
    endpoint TEXT NOT NULL,
    response_time_ms INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export const insertFeedback = db.prepare(
  "INSERT INTO feedback (alert_id, rating, summary_text) VALUES (?, ?, ?)"
);

export const getAllFeedback = db.prepare(
  "SELECT * FROM feedback ORDER BY created_at DESC"
);

export const insertMetric = db.prepare(
  "INSERT INTO ai_metrics (alert_id, endpoint, response_time_ms) VALUES (?, ?, ?)"
);

export const getMetricsSummary = db.prepare(`
  SELECT
    COUNT(*) as total_requests,
    ROUND(AVG(response_time_ms)) as avg_response_time_ms
  FROM ai_metrics
`);

export const getFeedbackSummary = db.prepare(`
  SELECT
    COUNT(*) as total,
    COALESCE(SUM(CASE WHEN rating = 'up' THEN 1 ELSE 0 END), 0) as thumbs_up,
    COALESCE(SUM(CASE WHEN rating = 'down' THEN 1 ELSE 0 END), 0) as thumbs_down
  FROM feedback
`);

export default db;
