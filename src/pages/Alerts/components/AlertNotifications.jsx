import styles from "./AlertNotifications.module.css";

export default function AlertNotifications({ notifications, emptyText }) {
  if (!notifications?.length) {
    return <div className={styles.empty}>{emptyText || "No notifications."}</div>;
  }

  return (
    <div className={styles.box}>
      {notifications.map((item) => (
        <div key={item.label} className={styles.row}>
          <span className={`material-symbols-outlined ${styles.icon}`} aria-hidden="true">
            {item.icon}
          </span>
          <span className={styles.label}>{item.label}</span>

          {item.pills?.map((pill) => (
            <span key={pill} className={styles.pill}>
              {pill}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}