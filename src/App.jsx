import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/index.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import SystemMap from "./pages/SystemMap/SystemMap";
import Alerts from "./pages/Alerts/Alerts";
import styles from "./components/Navbar/Navbar.module.css";

export default function App() {
  return (
    <div className={styles["app-shell"]}>
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/system-map" element={<SystemMap />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
