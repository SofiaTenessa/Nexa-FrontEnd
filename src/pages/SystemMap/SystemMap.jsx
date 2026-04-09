import styles from "./SystemMap.module.css";
import VisualSystemMap from "./VisualSystemMap";

function TypeCell({ icon, label }) {
  return (
    <div className={styles.typeCell}>
      <span className="material-symbols-outlined" aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  );
}

export default function SystemMap() {
  return (
    <div className={styles.page}>
      <div className={styles.pageTitleRow}>
        <span
          className={`material-symbols-outlined ${styles.pageTitleIcon}`}
          aria-hidden="true"
        >
          hub
        </span>
        <h1 className={styles.title}>System Map</h1>
      </div>

      <div className={styles.graphCard}>
        <div className={styles.graphHeader}>System Map</div>

        <div className={styles.graphCanvas}>
          <div className={styles.mapArea}>
            <div className={styles.mapFrame}>
              <VisualSystemMap />
            </div>
          </div>

          <div className={styles.graphActions}>
            <button className={styles.fullscreenBtn}>FULL SCREEN ⤢</button>
          </div>
        </div>
      </div>

      <div className={styles.readings}>
        <span className="material-symbols-outlined" aria-hidden="true">
          history
        </span>
        <span>Readings as of 18 seconds ago</span>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>Flow Links</div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Outlet name</th>
              <th className={styles.arrowCol}></th>
              <th>Type</th>
              <th>Inlet name</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <TypeCell icon="water_drop" label="Leak Detector" />
              </td>
              <td>
                <a href="/">Leak Sensor (Fuel Puck)</a>
              </td>
              <td className={styles.arrowCell}>&gt;&gt;&gt;&gt;</td>
              <td>
                <TypeCell icon="location_on" label="Location" />
              </td>
              <td>
                <a href="/">Plant 1 Pad</a>
              </td>
            </tr>

            <tr>
              <td>
                <TypeCell icon="hub" label="Tee" />
              </td>
              <td>Tee 1133</td>
              <td className={styles.arrowCell}>&gt;&gt;&gt;&gt;</td>
              <td>
                <TypeCell icon="hub" label="Tee" />
              </td>
              <td>Tee 1117</td>
            </tr>

            <tr>
              <td>
                <TypeCell icon="radio_button_checked" label="Flow Meter" />
              </td>
              <td>
                <a href="/">Meter 3</a>
              </td>
              <td className={styles.arrowCell}>&gt;&gt;&gt;&gt;</td>
              <td>
                <TypeCell icon="hub" label="Tee" />
              </td>
              <td>Tee 1133</td>
            </tr>

            <tr>
              <td>
                <TypeCell icon="water_drop" label="Leak Detector" />
              </td>
              <td>
                <a href="/">Leak Sensor (DT-502)</a>
              </td>
              <td className={styles.arrowCell}>&gt;&gt;&gt;&gt;</td>
              <td>
                <TypeCell icon="location_on" label="Location" />
              </td>
              <td>
                <a href="/">Electrical Closet - 208</a>
              </td>
            </tr>

            <tr>
              <td>
                <TypeCell icon="speed" label="Pressure Sensor" />
              </td>
              <td>
                <a href="/">Pressure 300 PSI</a>
              </td>
              <td className={styles.arrowCell}>&gt;&gt;&gt;&gt;</td>
              <td>
                <TypeCell icon="hub" label="Tee" />
              </td>
              <td>Tee 1120</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.tableFooter}>
          <span>Rows per page: 5</span>
          <span className={styles.footerCount}>1–5 of 36</span>
          <span className={styles.footerArrows}>‹</span>
          <span className={styles.footerArrows}>›</span>
        </div>
      </div>
    </div>
  );
}