import styles from "./AlertListCard.module.css";

export default function AlertListCard({ alert, isSelected, onClick }) {
  return (
    <button
      type="button"
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <div className={styles.topLine}>
        <span className={styles.label}>TIME IN ALERT:</span>
        <span className={styles.time}>{alert.timeInAlertShort}</span>
        <span className={styles.severityWrap}>
          <span className={styles.redDot} />
          <span className={styles.severity}>{alert.severity}</span>
        </span>
      </div>

      <div className={styles.titleRow}>
        <span
          className={`material-symbols-outlined ${styles.icon}`}
          aria-hidden="true"
        >
          {alert.cardIcon}
        </span>
        <span className={styles.title}>{alert.title}</span>
      </div>

      <div className={styles.automationRow}>
        <span className={styles.automationLabel}>AUTOMATION:</span>
        <span className={styles.automationText}>{alert.automation}</span>
      </div>
    </button>
  );
}