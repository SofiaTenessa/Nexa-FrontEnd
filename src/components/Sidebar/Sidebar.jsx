import { NavLink } from "react-router-dom";
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

function SidebarLink({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles.sidebarLink} ${isActive ? styles.active : ""}`
      }
    >
      <NavIcon name={icon} />
      <span className={styles.navLabel}>{label}</span>
    </NavLink>
  );
}

function SidebarPlaceholder({ icon, label }) {
  return (
    <div className={styles.sidebarLink}>
      <NavIcon name={icon} />
      <span className={styles.navLabel}>{label}</span>
    </div>
  );
}

export default function Sidebar() {
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
          <SidebarLink to="/" icon="home" label="Home" />
          <SidebarLink to="/system-map" icon="hub" label="System Map" />
          <SidebarLink to="/alerts" icon="notifications" label="Alerts" />
          <SidebarPlaceholder icon="analytics" label="Analytics" />
        </div>

        <div className={styles.sidebarDivider} />

        <div className={styles.sidebarSection}>
          <SidebarPlaceholder icon="location_on" label="Locations" />
          <SidebarPlaceholder icon="device_hub" label="Equipment" />
          <SidebarPlaceholder icon="sensors" label="Sensors" />
          <SidebarPlaceholder icon="settings_input_component" label="Automations" />
          <SidebarPlaceholder icon="router" label="Gateways" />
        </div>

        <div className={styles.sidebarDivider} />

        <div className={styles.sidebarSection}>
          <SidebarPlaceholder icon="settings" label="Settings" />
          <SidebarPlaceholder icon="help" label="Help" />
          <SidebarPlaceholder icon="logout" label="Sign Out" />
        </div>
      </div>
    </aside>
  );
}
