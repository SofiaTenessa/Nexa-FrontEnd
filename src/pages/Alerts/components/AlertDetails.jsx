import styles from "./AlertDetails.module.css";
import AlertDetailHeader from "./AlertDetailHeader";
import AlertTimeline from "./AlertTimeline";
import AlertNotifications from "./AlertNotifications";
import TemperatureChart from "./TemperatureChart";
import AISummary from "./AISummary";
import MiniSystemMap from "./MiniSystemMap";

export default function AlertDetails({ alert }) {
  if (!alert) {
    return <div className={styles.empty}>Select an alert to view details.</div>;
  }

  return (
    <div className={styles.panel}>
      <AlertDetailHeader alert={alert} />

      <MiniSystemMap alert={alert} />

      <div className={styles.sectionLabel}>AI ANALYSIS</div>
      <AISummary alert={alert} />

      <div className={styles.sectionLabel}>TIMELINE</div>

      {alert.type === "temperature" ? (
        <TemperatureChart alert={alert} />
      ) : (
        <AlertTimeline events={alert.timelineEvents} />
      )}

      <div className={styles.sectionLabel}>NOTIFICATIONS</div>

      <AlertNotifications
        notifications={alert.notifications}
        emptyText={alert.notificationEmptyText}
      />
    </div>
  );
}