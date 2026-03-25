import "./App.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-topbar">
        <div className="topbar-left">
          <span className="hamburger">☰</span>
        <div className="topbar-right">
          <span className="top-icon">👤</span>
          <div className="bell-wrap">
            <span className="top-icon">🔔</span>
            <span className="badge">7</span>
          </div>
        </div>
      </div>

      <div className="sidebar-expanded">
        <div className="sidebar-section">
          <div className="sidebar-link active">
            <span className="nav-icon">🏠</span>
            <span>Home</span>
          </div>

          <div className="sidebar-link">
            <span className="nav-icon">⇢</span>
            <span>System Map</span>
          </div>

          <div className="sidebar-link">
            <span className="nav-icon">🔔</span>
            <span>Alerts</span>
          </div>

          <div className="sidebar-link">
            <span className="nav-icon">📊</span>
            <span>Analytics</span>
          </div>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-section">
          <div className="sidebar-link">
            <span className="nav-icon">📍</span>
            <span>Locations</span>
          </div>

          <div className="sidebar-link">
            <span className="nav-icon">⎇</span>
            <span>Equipment</span>
          </div>

          <div className="sidebar-link">
            <span className="nav-icon">◉</span>
            <span>Sensors</span>
          </div>

          <div className="sidebar-link">
            <span className="nav-icon">⚙</span>
            <span>Automations</span>
          </div>

          <div className="sidebar-link">
            <span className="nav-icon">📶</span>
            <span>Gateways</span>
          </div>
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-section">
          <div className="sidebar-link">
            <span className="nav-icon">⚙</span>
            <span>Settings</span>
          </div>

          <div className="sidebar-link">
            <span className="nav-icon">?</span>
            <span>Help</span>
          </div>

          <div className="sidebar-link">
            <span className="nav-icon">↪</span>
            <span>Sign Out</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function StatusDot({ color }) {
  return <span className={`status-dot ${color}`} />;
}

function WarningIcon() {
  return (
    <div className="warning-icon" aria-hidden="true">
      <div className="warning-triangle" />
      <span className="warning-mark">!</span>
    </div>
  );
}

function HealthCard() {
  return (
    <div className="status-card">
      <div className="status-head">
        <div>
          <div className="health-subtitle">Health</div>
          <h2 className="health-title">Check Communication</h2>
        </div>
        <WarningIcon />
      </div>

      <div className="health-row">
        <div className="asset-name">
          <span className="asset-icon">⎇</span>
          <span>29 Equipment</span>
        </div>

        <div className="asset-status">
          <StatusDot color="green" />
          <span>All Active</span>
        </div>
      </div>

      <div className="health-row">
        <div className="asset-name">
          <span className="asset-icon">◉</span>
          <span>21 Sensors</span>
        </div>

        <div className="asset-status-group">
          <div className="asset-status">
            <StatusDot color="red" />
            <a href="/">Lost Comm (1)</a>
          </div>

          <div className="asset-status">
            <StatusDot color="green" />
            <span>Batteries Good</span>
          </div>
        </div>
      </div>

      <div className="health-row">
        <div className="asset-name">
          <span className="asset-icon">📶</span>
          <span>5 Gateways</span>
        </div>

        <div className="asset-status">
          <StatusDot color="red" />
          <a href="/">Lost Comm (1)</a>
        </div>
      </div>
    </div>
  );
}

function OpenAlertsCard() {
  return (
    <div className="status-card">
      <div className="status-head">
        <div>
          <div className="health-subtitle">Performance</div>
          <h2 className="health-title">Open Alerts</h2>
        </div>
        <WarningIcon />
      </div>

      <div className="single-row">
        <StatusDot color="red" />
        <a href="/">5 High Alerts</a>
      </div>
    </div>
  );
}

function AlertRow({ title, time }) {
  return (
    <div className="alert-row">
      <div className="alert-main">
        <span className="alert-dot" />
        <span className="severity">High</span>
        <a href="/">{title}</a>
      </div>

      <div className="time-block">
        <div className="time-label">TIME IN ALERT:</div>
        <div>{time}</div>
      </div>
    </div>
  );
}

function TopAlertsCard() {
  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="panel-subtitle">Alerts</div>
          <h2>Top Open Alerts</h2>
        </div>
        <button className="outline-btn">VIEW ALERTS</button>
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
    <div className="water-card">
      <div className="water-block water-title-block">
        <strong>Water Usage</strong>
        <span className="water-dots">•••</span>
      </div>

      <div className="water-block">
        <span>WEEK RUNNING TREND</span>
        <strong>+1%</strong>
        <span className="trend-up">↗</span>
      </div>

      <div className="water-block">
        <span>MONTH RUNNING TREND</span>
        <strong>+1%</strong>
        <span className="trend-up">↗</span>
      </div>

      <div className="water-actions">
        <button className="outline-btn">SHOW HISTORY</button>
        <span className="water-chevron">⌄</span>
      </div>
    </div>
  );
}

function LeakInsights() {
  return (
    <div className="panel leak-panel">
      <h3>Leak Insights</h3>

      <div className="leak-grid">
        <div className="mini-card">
          <div className="mini-label">Last 30 days</div>
          <div className="mini-big">0 leak alerts</div>
        </div>

        <div className="mini-card">
          <div className="mini-label">Last 90 days</div>
          <div className="mini-big">9 leak alerts</div>
        </div>

        <div className="mini-card">
          <div className="mini-label">Lifetime</div>
          <div className="mini-big">9 leak alerts</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main">
        <div className="wordmark">nexa</div>

        <header className="page-header">
          <h1>Home</h1>
          <p>Your Nexa Overview.</p>
        </header>

        <div className="top-grid">
          <div className="left-column">
            <OpenAlertsCard />
            <HealthCard />
          </div>

          <TopAlertsCard />
        </div>

        <WaterUsageCard />
        <LeakInsights />
      </main>
    </div>
  );
}