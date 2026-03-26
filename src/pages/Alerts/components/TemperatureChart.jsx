import styles from "./TemperatureChart.module.css";

function buildSparklinePoints(count = 140) {
  const points = [];
  let y = 55;

  for (let i = 0; i < count; i += 1) {
    const drift = (Math.sin(i / 3.5) + Math.sin(i / 7)) * 3;
    const jitter = ((i * 17) % 11) - 5;
    y = Math.max(18, Math.min(90, 55 + drift + jitter));
    const x = (i / (count - 1)) * 100;
    points.push(`${x},${y}`);
  }

  return points.join(" ");
}

export default function TemperatureChart({ alert }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.rail}>
        <div className={styles.topLine} />
        <span className={`material-symbols-outlined ${styles.redIcon}`} aria-hidden="true">
          error
        </span>
        <div className={styles.bottomLine} />
      </div>

      <div className={styles.cardArea}>
        <div className={styles.topCard}>
          <div className={styles.dateCol}>
            <div>{alert.timelineEvents[0].date}</div>
            <div>{alert.timelineEvents[0].time}</div>
          </div>

          <div className={styles.eventTitle}>{alert.timelineEvents[0].title}</div>
        </div>

        <div className={styles.metricsRow}>
          <div className={styles.legendArea}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.blueDot}`} />
              <span>{alert.legendLabel}</span>
            </div>

            <div className={styles.thresholdPill}>
              <span className={`${styles.legendDot} ${styles.yellowDot}`} />
              <span>{alert.thresholdLabel}</span>
            </div>
          </div>

          <div className={styles.readingBox}>
            <div className={styles.readingValue}>{alert.readingValue}</div>
            <div className={styles.deltaRow}>
              <span className="material-symbols-outlined" aria-hidden="true">
                warning
              </span>
              <span>{alert.readingDelta}</span>
            </div>
          </div>

          <div className={styles.readingTime}>
            <div>Reading as of:</div>
            <div>{alert.readingAsOf}</div>
          </div>
        </div>

        <div className={styles.chartWrap}>
          <div className={styles.chartInner}>
            <svg
              className={styles.svg}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <rect x="0" y="0" width="100" height="100" className={styles.bgRect} />
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="0.35"
                points={buildSparklinePoints()}
                className={styles.line}
              />
            </svg>

            <div className={styles.yAxis}>
              {alert.yAxisLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>

          <div className={styles.xAxis}>
            {alert.xAxisLabels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>

          <div className={styles.footer}>
            <div>{alert.chartDateLabel}</div>
            <div>Timezone: {alert.timezone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}