import styles from "./AlertDetailHeader.module.css";

export default function AlertDetailHeader({ alert }) {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.titleRow}>
          <span
            className={`material-symbols-outlined ${styles.alertIcon}`}
            aria-hidden="true"
          >
            {alert.headerIcon}
          </span>
          <h2 className={styles.title}>{alert.title}</h2>
        </div>

        <div className={styles.linksRow}>
          <span className={`material-symbols-outlined ${styles.metaIcon}`} aria-hidden="true">
            {alert.locationIcon}
          </span>
          <a href="/" onClick={(event) => event.preventDefault()}>
            {alert.location}
          </a>

          <span className={`material-symbols-outlined ${styles.metaIcon}`} aria-hidden="true">
            {alert.targetIcon}
          </span>
          <a href="/" onClick={(event) => event.preventDefault()}>
            {alert.targetName}
          </a>
        </div>

        <div className={styles.automationRow}>
          <span className={styles.automationLabel}>AUTOMATION:</span>
          <span>{alert.automation}</span>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.severityRow}>
          <span className={styles.redDot} />
          <span>{alert.severity}</span>
        </div>

        <div className={styles.metaLine}>
          <span className={styles.metaLabel}>START TIME:</span> {alert.startTime}
        </div>

        <div className={styles.metaLine}>
          <span className={styles.metaLabel}>TIME IN ALERT:</span> {alert.timeInAlertFull}
        </div>
      </div>
    </div>
  );
}