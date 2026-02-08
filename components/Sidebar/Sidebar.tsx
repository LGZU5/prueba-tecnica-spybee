"use client";

import { useProjectsStore } from "@/store/projectsStore";
import { useSidebarData } from "@/hooks/useSidebarData";
import { StatsSection } from "./StatsSection/StatsSection";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  const sidebarOpen = useProjectsStore((state) => state.sidebarOpen);
  const toggleSidebar = useProjectsStore((state) => state.toggleSidebar);
  const { summaryData } = useSidebarData();

  return (
    <>
      {sidebarOpen && (
        <div className={styles.overlay} onClick={toggleSidebar} />
      )}

      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.sidebarHeader}>
          <h3 className={styles.sidebarTitle}>Resumen</h3>
          <button
            className={styles.closeButton}
            onClick={toggleSidebar}
            aria-label="Cerrar sidebar"
          >
            ✕
          </button>
        </div>
        <StatsSection summaryData={summaryData} />
      </aside>
    </>
  );
}
