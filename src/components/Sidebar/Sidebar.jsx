import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles['sidebar-topbar']}>
        <div className={styles['topbar-left']}>
          <span>☰</span>
        </div>
        <div className={styles['topbar-right']}>
          <span>👤</span>
          <div className={styles['bell-wrap']}>
            <span>🔔</span>
            <span className={styles.badge}>7</span>
          </div>
        </div>
      </div>

      <div className={styles['sidebar-expanded']}>
        <div className={styles['sidebar-section']}>
          <div className={`${styles['sidebar-link']} ${styles.active}`}>
            <span className={styles['nav-icon']}>🏠</span>
            <span>Home</span>
          </div>
          <div className={styles['sidebar-link']}>
            <span className={styles['nav-icon']}>⇢</span>
            <span>System Map</span>
          </div>
          <div className={styles['sidebar-link']}>
            <span className={styles['nav-icon']}>🔔</span>
            <span>Alerts</span>
          </div>
          <div className={styles['sidebar-link']}>
            <span className={styles['nav-icon']}>📊</span>
            <span>Analytics</span>
          </div>
        </div>

        <div className={styles['sidebar-divider']} />

        <div className={styles['sidebar-section']}>
          <div className={styles['sidebar-link']}>
            <span className={styles['nav-icon']}>📍</span>
            <span>Locations</span>
          </div>
          <div className={styles['sidebar-link']}>
            <span className={styles['nav-icon']}>⎇</span>
            <span>Equipment</span>
          </div>
          <div className={styles['sidebar-link']}>
            <span className={styles['nav-icon']}>◉</span>
            <span>Sensors</span>
          </div>
          <div className={styles['sidebar-link']}>
            <span className={styles['nav-icon']}>⚙</span>
            <span>Automations</span>
          </div>
          <div className={styles['sidebar-link']}>
            <span className={styles['nav-icon']}>📶</span>
            <span>Gateways</span>
          </div>
        </div>

        <div className={styles['sidebar-divider']} />

        <div className={styles['sidebar-section']}>
          <div className={styles['sidebar-link']}>
            <span className={styles['nav-icon']}>⚙</span>
            <span>Settings</span>
          </div>
          <div className={styles['sidebar-link']}>
            <span className={styles['nav-icon']}>?</span>
            <span>Help</span>
          </div>
          <div className={styles['sidebar-link']}>
            <span className={styles['nav-icon']}>↪</span>
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </aside>
  );
}