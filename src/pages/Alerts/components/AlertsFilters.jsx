import styles from "./AlertsFilters.module.css";

function FilterSelect({
  label,
  value,
  onChange,
  options,
  icon = "keyboard_arrow_down",
}) {
  return (
    <div className={styles.selectWrap}>
      <select className={styles.select} value={value} onChange={onChange}>
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className={`material-symbols-outlined ${styles.selectIcon}`} aria-hidden="true">
        {icon}
      </span>
    </div>
  );
}

export default function AlertsFilters({
  activeTab,
  setActiveTab,
  counts,
  search,
  setSearch,
  selectedLocation,
  setSelectedLocation,
  selectedEquipment,
  setSelectedEquipment,
  selectedSensor,
  setSelectedSensor,
  selectedSensorType,
  setSelectedSensorType,
  locations,
  equipmentOptions,
  sensorOptions,
  sensorTypes,
  severityFilters,
  toggleSeverity,
  clearAllFilters,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "current" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("current")}
          type="button"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            warning
          </span>
          <span>CURRENT ({counts.current})</span>
        </button>

        <button
          className={`${styles.tab} ${activeTab === "resolved" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("resolved")}
          type="button"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            check_circle
          </span>
          <span>RESOLVED ({counts.resolved})</span>
        </button>

        <button
          className={`${styles.tab} ${activeTab === "all" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("all")}
          type="button"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            all_inclusive
          </span>
          <span>ALL ({counts.all})</span>
        </button>
      </div>

      <div className={styles.filtersRow}>
        <div className={styles.searchWrap}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <span className={`material-symbols-outlined ${styles.searchIcon}`} aria-hidden="true">
            search
          </span>
        </div>

        <FilterSelect
          label="Location"
          value={selectedLocation}
          onChange={(event) => setSelectedLocation(event.target.value)}
          options={locations}
        />

        <FilterSelect
          label="Equipment"
          value={selectedEquipment}
          onChange={(event) => setSelectedEquipment(event.target.value)}
          options={equipmentOptions}
        />

        <FilterSelect
          label="Sensor"
          value={selectedSensor}
          onChange={(event) => setSelectedSensor(event.target.value)}
          options={sensorOptions}
        />

        <FilterSelect
          label="Sensor Type"
          value={selectedSensorType}
          onChange={(event) => setSelectedSensorType(event.target.value)}
          options={sensorTypes}
        />
      </div>

      <div className={styles.chipsRow}>
        <button
          type="button"
          className={`${styles.chip} ${severityFilters.includes("High") ? styles.chipActive : ""}`}
          onClick={() => toggleSeverity("High")}
        >
          <span className={`${styles.dot} ${styles.red}`} />
          <span>High</span>
        </button>

        <button
          type="button"
          className={`${styles.chip} ${severityFilters.includes("Low") ? styles.chipActive : ""}`}
          onClick={() => toggleSeverity("Low")}
        >
          <span className={`${styles.dot} ${styles.orange}`} />
          <span>Low</span>
        </button>

        <button type="button" className={styles.clearBtn} onClick={clearAllFilters}>
          CLEAR ALL
        </button>
      </div>
    </div>
  );
}