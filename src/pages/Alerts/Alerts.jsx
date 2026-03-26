import { useMemo, useState } from "react";
import styles from "./Alerts.module.css";
import { alerts } from "./alertsData";
import AlertsHeader from "./components/AlertsHeader";
import AlertsFilters from "./components/AlertsFilters";
import AlertsList from "./components/AlertsList";
import AlertDetails from "./components/AlertDetails";

export default function Alerts() {
  const [selectedAlertId, setSelectedAlertId] = useState(alerts[0]?.id ?? null);
  const [activeTab, setActiveTab] = useState("current");
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [selectedSensor, setSelectedSensor] = useState("");
  const [selectedSensorType, setSelectedSensorType] = useState("");
  const [severityFilters, setSeverityFilters] = useState(["High", "Low"]);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesTab =
        activeTab === "all" ? true : alert.status.toLowerCase() === activeTab;

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        alert.title.toLowerCase().includes(query) ||
        alert.location.toLowerCase().includes(query) ||
        alert.targetName.toLowerCase().includes(query) ||
        alert.automation.toLowerCase().includes(query);

      const matchesLocation =
        !selectedLocation || alert.location === selectedLocation;
      const matchesEquipment =
        !selectedEquipment || alert.equipment === selectedEquipment;
      const matchesSensor = !selectedSensor || alert.targetName === selectedSensor;
      const matchesSensorType =
        !selectedSensorType || alert.sensorType === selectedSensorType;
      const matchesSeverity =
        severityFilters.length === 0 || severityFilters.includes(alert.severity);

      return (
        matchesTab &&
        matchesSearch &&
        matchesLocation &&
        matchesEquipment &&
        matchesSensor &&
        matchesSensorType &&
        matchesSeverity
      );
    });
  }, [
    activeTab,
    search,
    selectedLocation,
    selectedEquipment,
    selectedSensor,
    selectedSensorType,
    severityFilters,
  ]);

  const selectedAlert =
    filteredAlerts.find((alert) => alert.id === selectedAlertId) ??
    filteredAlerts[0] ??
    null;

  const locations = [...new Set(alerts.map((alert) => alert.location))];
  const equipmentOptions = [...new Set(alerts.map((alert) => alert.equipment))];
  const sensorOptions = [...new Set(alerts.map((alert) => alert.targetName))];
  const sensorTypes = [...new Set(alerts.map((alert) => alert.sensorType))];

  const counts = {
    current: alerts.filter((alert) => alert.status === "current").length,
    resolved: alerts.filter((alert) => alert.status === "resolved").length,
    all: alerts.length,
  };

  function toggleSeverity(severity) {
    setSeverityFilters((prev) =>
      prev.includes(severity)
        ? prev.filter((item) => item !== severity)
        : [...prev, severity]
    );
  }

  function clearAllFilters() {
    setSearch("");
    setSelectedLocation("");
    setSelectedEquipment("");
    setSelectedSensor("");
    setSelectedSensorType("");
    setSeverityFilters([]);
  }

  return (
    <div className={styles.page}>
      <AlertsHeader />
      <AlertsFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={counts}
        search={search}
        setSearch={setSearch}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedEquipment={selectedEquipment}
        setSelectedEquipment={setSelectedEquipment}
        selectedSensor={selectedSensor}
        setSelectedSensor={setSelectedSensor}
        selectedSensorType={selectedSensorType}
        setSelectedSensorType={setSelectedSensorType}
        locations={locations}
        equipmentOptions={equipmentOptions}
        sensorOptions={sensorOptions}
        sensorTypes={sensorTypes}
        severityFilters={severityFilters}
        toggleSeverity={toggleSeverity}
        clearAllFilters={clearAllFilters}
      />

      <div className={styles.content}>
        <AlertsList
          alerts={filteredAlerts}
          selectedAlertId={selectedAlert?.id ?? null}
          onSelect={setSelectedAlertId}
        />

        <AlertDetails alert={selectedAlert} />
      </div>
    </div>
  );
}