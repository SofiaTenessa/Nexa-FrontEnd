import styles from "./AlertsList.module.css";
import AlertListCard from "./AlertListCard";

export default function AlertsList({ alerts, selectedAlertId, onSelect }) {
  return (
    <div className={styles.listPane}>
      <div className={styles.scrollArea}>
        {alerts.length === 0 ? (
          <div className={styles.empty}>No alerts match the current filters.</div>
        ) : (
          alerts.map((alert) => (
            <AlertListCard
              key={alert.id}
              alert={alert}
              isSelected={selectedAlertId === alert.id}
              onClick={() => onSelect(alert.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}