import styles from './Home.module.css';

function StatusDot({ color }) {
  const dotStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '10px',
    flexShrink: 0,
    backgroundColor: color === 'red' ? 'rgb(211, 47, 47)' : 'rgb(76, 175, 80)'
  };
  return <span style={dotStyle} />;
}

function WarningIcon() {
  return (
    <div className={styles['warning-icon']} aria-hidden="true">
      <div className={styles['warning-triangle']} />
      <span className={styles['warning-mark']}>!</span>
    </div>
  );
}

function HealthCard() {
  return (
    <div className={styles['status-card']}>
      <div className={styles['status-head']}>
        <div>
          <div className={styles['health-subtitle']}>Health</div>
          <h2 className={styles['health-title']}>Check Communication</h2>
        </div>
        <WarningIcon />
      </div>
      <div className={styles['health-row']}>
        <div className={styles['asset-name']}>
          <span className={styles['asset-icon']}>⎇</span>
          <span>29 Equipment</span>
        </div>
        <div className={styles['asset-status']}>
          <StatusDot color="green" />
          <span>All Active</span>
        </div>
      </div>
      <div className={styles['health-row']}>
        <div className={styles['asset-name']}>
          <span className={styles['asset-icon']}>◉</span>
          <span>21 Sensors</span>
        </div>
        <div className={styles['asset-status-group']}>
          <div className={styles['asset-status']}>
            <StatusDot color="red" />
            <a href="/">Lost Comm (1)</a>
          </div>
          <div className={styles['asset-status']}>
            <StatusDot color="green" />
            <span>Batteries Good</span>
          </div>
        </div>
      </div>
      <div className={styles['health-row']}>
        <div className={styles['asset-name']}>
          <span className={styles['asset-icon']}>📶</span>
          <span>5 Gateways</span>
        </div>
        <div className={styles['asset-status']}>
          <StatusDot color="red" />
          <a href="/">Lost Comm (1)</a>
        </div>
      </div>
    </div>
  );
}

function OpenAlertsCard() {
  return (
    <div className={styles['status-card']}>
      <div className={styles['status-head']}>
        <div>
          <div className={styles['health-subtitle']}>Performance</div>
          <h2 className={styles['health-title']}>Open Alerts</h2>
        </div>
        <WarningIcon />
      </div>
      <div className={styles['single-row']}>
        <StatusDot color="red" />
        <a href="/">5 High Alerts</a>
      </div>
    </div>
  );
}

function AlertRow({ title, time }) {
  const dotStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    display: 'inline-block',
    flexShrink: 0,
    backgroundColor: 'rgb(211, 47, 47)'
  };

  return (
    <div className={styles['alert-row']}>
      <div className={styles['alert-main']}>
        <span style={dotStyle} />
        <span className={styles.severity}>High</span>
        <a href="/">{title}</a>
      </div>
      <div className={styles['time-block']}>
        <div className={styles['time-label']}>TIME IN ALERT:</div>
        <div>{time}</div>
      </div>
    </div>
  );
}

function TopAlertsCard() {
  return (
    <div className={styles.panel}>
      <div className={styles['panel-header']}>
        <div>
          <div className={styles['panel-subtitle']}>Alerts</div>
          <h2>Top Open Alerts</h2>
        </div>
        <button className={styles['outline-btn']}>VIEW ALERTS</button>
      </div>
      <AlertRow title="Temp Out (Floor 1 W) has lost communication" time="10 days" />
      <AlertRow title="Smart Base Station 1 has lost communication" time="1 month" />
      <AlertRow title="Sensor 30000005 has Leak Detected" time="1 month" />
      <AlertRow title="Sensor 30000004 has Leak Detected" time="1 month" />
      <AlertRow title="Sensor 30000003 has Leak Detected" time="1 month" />
    </div>
  );
}

function WaterUsageCard() {
  return (
    <div className={styles['water-card']}>
      <div className={`${styles['water-block']} ${styles['water-title-block']}`}>
        <strong>Water Usage</strong>
        <span className={styles['water-dots']}>•••</span>
      </div>
      <div className={styles['water-block']}>
        <span>WEEK RUNNING TREND</span>
        <strong>+1%</strong>
        <span className={styles['trend-up']}>↗</span>
      </div>
      <div className={styles['water-block']}>
        <span>MONTH RUNNING TREND</span>
        <strong>+1%</strong>
        <span className={styles['trend-up']}>↗</span>
      </div>
      <div className={styles['water-actions']}>
        <button className={styles['outline-btn']}>SHOW HISTORY</button>
        <span className={styles['water-chevron']}>⌄</span>
      </div>
    </div>
  );
}

function LeakInsights() {
  return (
    <div className={`${styles.panel} ${styles['leak-panel']}`}>
      <h3>Leak Insights</h3>
      <div className={styles['leak-grid']}>
        <div className={styles['mini-card']}>
          <div className={styles['mini-label']}>Last 30 days</div>
          <div className={styles['mini-big']}>0 leak alerts</div>
        </div>
        <div className={styles['mini-card']}>
          <div className={styles['mini-label']}>Last 90 days</div>
          <div className={styles['mini-big']}>9 leak alerts</div>
        </div>
        <div className={styles['mini-card']}>
          <div className={styles['mini-label']}>Lifetime</div>
          <div className={styles['mini-big']}>9 leak alerts</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.wordmark}>nexa</div>
      <header className={styles['page-header']}>
        <h1>Home</h1>
        <p>Your Nexa Overview.</p>
      </header>
      <div className={styles['top-grid']}>
        <div className={styles['left-column']}>
          <OpenAlertsCard />
          <HealthCard />
        </div>
        <TopAlertsCard />
      </div>
      <WaterUsageCard />
      <LeakInsights />
    </main>
  );
}