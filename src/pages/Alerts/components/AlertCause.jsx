import styles from "./AlertCause.module.css";

export default function AlertCause({ cause }) {
  if (!cause) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.sectionLabel}>LIKELY CAUSE</div>
      <div className={styles.card}>
        <span
          className={`material-symbols-outlined ${styles.icon}`}
          aria-hidden="true"
        >
          tips_and_updates
        </span>
        <p className={styles.text}>{cause}</p>
      </div>
    </div>
  );
}
