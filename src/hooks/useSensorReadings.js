import { useEffect, useState } from "react";

export function useSensorReadings(sensorId) {
  // Track which sensorId the current readings belong to
  const [data, setData] = useState({ sensorId: null, readings: [], error: null });

  // Loading is derived: we're fetching if sensorId is set but doesn't match fetched data yet
  const loading = sensorId !== null && sensorId !== data.sensorId && data.error === null;

  useEffect(() => {
    if (!sensorId) return;

    let cancelled = false;

    fetch(`/api/sensors/${sensorId}/readings`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((result) => {
        if (!cancelled) setData({ sensorId, readings: result.readings, error: null });
      })
      .catch((err) => {
        if (!cancelled) setData({ sensorId, readings: [], error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [sensorId]);

  return { readings: data.readings, loading, error: data.error };
}
