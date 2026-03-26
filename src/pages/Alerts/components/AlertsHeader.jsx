import styles from "./AlertsHeader.module.css";

export default function AlertsHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.titleWrap}>
        <span className="material-symbols-outlined" aria-hidden="true">
          notifications
        </span>
        <h1 className={styles.title}>Alerts</h1>
      </div>

      <button className={styles.refreshBtn} type="button" aria-label="Refresh">
        <span className="material-symbols-outlined" aria-hidden="true">
          refresh
        </span>
      </button>
    </div>
  );
}