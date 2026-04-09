import { useMemo, useState } from "react";
import { useSensorReadings } from "../../../hooks/useSensorReadings";
import styles from "./TemperatureChart.module.css";

const RANGES = [
  { label: "24H", hours: 24 },
  { label: "3D", hours: 72 },
  { label: "7D", hours: 168 },
  { label: "All", hours: null },
];

// Parse "04/02/26 06:03:11 PM" → Date
function parseTimestamp(ts) {
  const [datePart, timePart, meridiem] = ts.split(" ");
  const [month, day, year] = datePart.split("/").map(Number);
  const [h, m, s] = timePart.split(":").map(Number);
  let hours = h;
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  return new Date(2000 + year, month - 1, day, hours, m, s);
}

// Bucket readings into N evenly-spaced slots and average values per bucket
function aggregate(readings, buckets = 60) {
  if (readings.length === 0) return [];
  if (readings.length <= buckets) return readings.map((r) => ({ ...r, date: parseTimestamp(r.timestamp) }));

  const withDates = readings.map((r) => ({ ...r, date: parseTimestamp(r.timestamp) }));
  const minT = withDates[0].date.getTime();
  const maxT = withDates[withDates.length - 1].date.getTime();
  const slotSize = (maxT - minT) / buckets;

  const slots = Array.from({ length: buckets }, () => []);
  for (const r of withDates) {
    const i = Math.min(Math.floor((r.date.getTime() - minT) / slotSize), buckets - 1);
    slots[i].push(r.value);
  }

  return slots
    .map((vals, i) => {
      if (vals.length === 0) return null;
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      return { date: new Date(minT + i * slotSize + slotSize / 2), value: avg };
    })
    .filter(Boolean);
}

function buildPolylinePoints(aggregated) {
  if (aggregated.length < 2) return "";
  const values = aggregated.map((r) => r.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;
  return aggregated
    .map((r, i) => {
      const x = (i / (aggregated.length - 1)) * 100;
      const y = 90 - ((r.value - minVal) / range) * 80;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function formatXLabel(date, rangeHours) {
  if (rangeHours !== null && rangeHours <= 24) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  }
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function deriveXAxisLabels(aggregated, rangeHours, count = 5) {
  if (aggregated.length === 0) return [];
  const step = Math.floor(aggregated.length / (count - 1));
  return Array.from({ length: count }, (_, i) => {
    const r = aggregated[Math.min(i * step, aggregated.length - 1)];
    return formatXLabel(r.date, rangeHours);
  });
}

function deriveYAxisLabels(aggregated) {
  if (aggregated.length === 0) return [];
  const values = aggregated.map((r) => r.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const mid = (max + min) / 2;
  return [`${max.toFixed(1)}°F`, `${mid.toFixed(1)}°F`, `${min.toFixed(1)}°F`];
}

export default function TemperatureChart({ alert }) {
  const { readings, loading } = useSensorReadings(alert.sensorId ?? null);
  const [rangeIndex, setRangeIndex] = useState(0);

  const selectedRange = RANGES[rangeIndex];

  const filteredReadings = useMemo(() => {
    if (readings.length === 0) return [];
    if (selectedRange.hours === null) return readings;

    const withDates = readings.map((r) => ({ ...r, date: parseTimestamp(r.timestamp) }));
    const latest = withDates[withDates.length - 1].date.getTime();
    const cutoff = latest - selectedRange.hours * 60 * 60 * 1000;
    return withDates.filter((r) => r.date.getTime() >= cutoff);
  }, [readings, selectedRange]);

  const aggregated = useMemo(() => aggregate(filteredReadings), [filteredReadings]);
  const points = useMemo(() => buildPolylinePoints(aggregated), [aggregated]);
  const yAxisLabels = useMemo(
    () => (aggregated.length ? deriveYAxisLabels(aggregated) : alert.yAxisLabels),
    [aggregated, alert.yAxisLabels]
  );
  const xAxisLabels = useMemo(
    () => (aggregated.length ? deriveXAxisLabels(aggregated, selectedRange.hours) : alert.xAxisLabels),
    [aggregated, selectedRange.hours, alert.xAxisLabels]
  );

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
              <span className="material-symbols-outlined" aria-hidden="true">warning</span>
              <span>{alert.readingDelta}</span>
            </div>
          </div>

          <div className={styles.readingTime}>
            <div>Reading as of:</div>
            <div>{alert.readingAsOf}</div>
          </div>
        </div>

        <div className={styles.chartWrap}>
          <div className={styles.rangeSelector}>
            {RANGES.map((range, i) => (
              <button
                key={range.label}
                className={`${styles.rangeBtn} ${i === rangeIndex ? styles.rangeBtnActive : ""}`}
                onClick={() => setRangeIndex(i)}
              >
                {range.label}
              </button>
            ))}
          </div>

          <div className={styles.chartInner}>
            <svg
              className={styles.svg}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <rect x="0" y="0" width="100" height="100" className={styles.bgRect} />
              {!loading && points && (
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.35"
                  points={points}
                  className={styles.line}
                />
              )}
            </svg>

            <div className={styles.yAxis}>
              {yAxisLabels.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>

          <div className={styles.xAxis}>
            {xAxisLabels.map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>

          <div className={styles.footer}>
            <div>
              {aggregated.length > 0
                ? `${aggregated[0].date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })} — ${aggregated[aggregated.length - 1].date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })}`
                : alert.chartDateLabel}
            </div>
            <div>Timezone: {alert.timezone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
