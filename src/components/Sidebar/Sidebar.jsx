import styles from "./Sidebar.module.css";

function NavIcon({ name }) {
  return (
    <span
      className={`material-symbols-outlined ${styles.navIcon}`}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

export default function Sidebar({ page, setPage }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTopbar}>
        <div className={styles.topbarLeft}>
          <span className="material-symbols-outlined" aria-hidden="true">
            menu
          </span>
        </div>

        <div className={styles.topbarLogo}>nexa</div>

        <div className={styles.topbarRight}>
          <span className="material-symbols-outlined" aria-hidden="true">
            person
          </span>

          <div className={styles.bellWrap}>
            <span className="material-symbols-outlined" aria-hidden="true">
              notifications
            </span>
            <span className={styles.badge}>7</span>
          </div>
        </div>
      </div>

      <div className={styles.sidebarExpanded}>
        <div className={styles.sidebarSection}>
          <div
            className={`${styles.sidebarLink} ${
              page === "home" ? styles.active : ""
            }`}
            onClick={() => setPage("home")}
          >
            <NavIcon name="home" />
            <span className={styles.navLabel}>Home</span>
          </div>

          <div
            className={`${styles.sidebarLink} ${
              page === "systemMap" ? styles.active : ""
            }`}
            onClick={() => setPage("systemMap")}
          >
            <NavIcon name="hub" />
            <span className={styles.navLabel}>System Map</span>
          </div>

          <div
            className={`${styles.sidebarLink} ${
              page === "alerts" ? styles.active : ""
            }`}
            onClick={() => setPage("alerts")}
          >
            <NavIcon name="notifications" />
            <span className={styles.navLabel}>Alerts</span>
          </div>

          <div
            className={`${styles.sidebarLink} ${
              page === "chat" ? styles.active : ""
            }`}
            onClick={() => setPage("chat")}
          >
            <NavIcon name="smart_toy" />
            <span className={styles.navLabel}>AI Chat</span>
          </div>

          <div className={styles.sidebarLink}>
            <NavIcon name="analytics" />
            <span className={styles.navLabel}>Analytics</span>
          </div>
        </div>

        <div className={styles.sidebarDivider} />

        <div className={styles.sidebarSection}>
          <div className={styles.sidebarLink}>
            <NavIcon name="location_on" />
            <span className={styles.navLabel}>Locations</span>
          </div>

          <div className={styles.sidebarLink}>
            <NavIcon name="device_hub" />
            <span className={styles.navLabel}>Equipment</span>
          </div>

          <div className={styles.sidebarLink}>
            <NavIcon name="sensors" />
            <span className={styles.navLabel}>Sensors</span>
          </div>

          <div className={styles.sidebarLink}>
            <NavIcon name="settings_input_component" />
            <span className={styles.navLabel}>Automations</span>
          </div>

          <div className={styles.sidebarLink}>
            <NavIcon name="router" />
            <span className={styles.navLabel}>Gateways</span>
          </div>
        </div>

        <div className={styles.sidebarDivider} />

        <div className={styles.sidebarSection}>
          <div className={styles.sidebarLink}>
            <NavIcon name="settings" />
            <span className={styles.navLabel}>Settings</span>
          </div>

          <div className={styles.sidebarLink}>
            <NavIcon name="help" />
            <span className={styles.navLabel}>Help</span>
          </div>

          <div className={styles.sidebarLink}>
            <NavIcon name="logout" />
            <span className={styles.navLabel}>Sign Out</span>
          </div>
        </div>
      </div>
    </aside>
  );
}