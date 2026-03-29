import { useState } from "react";
import styles from "./AIFeedback.module.css";
import { submitFeedback } from "../../../services/aiService";

export default function AIFeedback({ alertId, summaryText }) {
  const [rating, setRating] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFeedback = async (value) => {
    if (rating) return;
    setSubmitting(true);
    try {
      await submitFeedback({ alertId, rating: value, summaryText });
      setRating(value);
    } catch {
      // Silently fail — non-critical
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.label}>Was this helpful?</span>
      <div className={styles.buttons}>
        <button
          className={`${styles.btn} ${rating === "up" ? styles.active : ""}`}
          onClick={() => handleFeedback("up")}
          disabled={submitting || !!rating}
          title="Helpful"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            thumb_up
          </span>
        </button>
        <button
          className={`${styles.btn} ${rating === "down" ? styles.activeDown : ""}`}
          onClick={() => handleFeedback("down")}
          disabled={submitting || !!rating}
          title="Not helpful"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
            thumb_down
          </span>
        </button>
      </div>
      {rating && (
        <span className={styles.thanks}>Thanks for your feedback!</span>
      )}
    </div>
  );
}
