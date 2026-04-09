import { alerts } from "../pages/Alerts/alertsData";

export function useAlerts() {
  return { alerts, loading: false, error: null };
}
