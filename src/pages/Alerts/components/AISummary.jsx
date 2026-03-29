import { useState, useEffect } from "react";
import styles from "./AISummary.module.css";
import { fetchAISummary } from "../../../services/aiService";
import AIFeedback from "./AIFeedback";

export default function AISummary({ alert }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setError(null);
  }, [alert.id]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAISummary(alert);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!data && !loading && !error) {
    return (
      <div className={styles.container}>
        <button className={styles.generateBtn} onClick={handleGenerate}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
            auto_awesome
          </span>
          Generate AI Analysis
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span>Analyzing alert...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#d32f2f" }}>
            error
          </span>
          <span>{error}</span>
          <button className={styles.retryBtn} onClick={handleGenerate}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#1976d2" }}>
            auto_awesome
          </span>
          <span className={styles.headerTitle}>AI Analysis</span>
          <span className={styles.badge}>AI Generated</span>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Why this may have occurred</div>
          <p className={styles.summaryText}>{data.summary}</p>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>Recommended Actions</div>
          <ul className={styles.actionsList}>
            {data.actions.map((action, i) => (
              <li key={i} className={styles.actionItem}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#1976d2" }}>
                  arrow_right
                </span>
                {action}
              </li>
            ))}
          </ul>
        </div>

        <AIFeedback alertId={alert.id} summaryText={data.summary} />

        <div className={styles.meta}>
          Response time: {data.responseTimeMs}ms
        </div>
      </div>
    </div>
  );
}
