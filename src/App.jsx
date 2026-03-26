import { useState } from "react";
import "./styles/index.css";

import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/Home/Home";
import SystemMap from "./pages/SystemMap/SystemMap";
import Alerts from "./pages/Alerts/Alerts"; 
import styles from "./components/Navbar/Navbar.module.css";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className={styles["app-shell"]}>
      <Sidebar page={page} setPage={setPage} />

      {page === "home" && <Home />}
      {page === "systemMap" && <SystemMap />}
      {page === "alerts" && <Alerts />} 
    </div>
  );
}