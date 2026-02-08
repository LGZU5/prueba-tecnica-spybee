"use client";

import { useEffect } from "react";
import mockData from "@/data/mock_data.json";
import { useProjectsStore } from "@/store/projectsStore";
import { ProjectWithCounts } from "@/types/project";
import { MapView } from "@/components/Map/MapView";
import { ProjectsTopBar } from "@/components/ProjectsTopBar/ProjectsTopBar";
import { ProjectTable } from "@/components/ProjectTable/ProjectTable";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import Image from "next/image";
import styles from "./page.module.css";

export default function HomePage() {
  const setProjects = useProjectsStore((state) => state.setProjects);
  const selectedProject = useProjectsStore((state) => state.selectedProject);
  const viewMode = useProjectsStore((state) => state.viewMode);
  const sidebarOpen = useProjectsStore((state) => state.sidebarOpen);
  const toggleSidebar = useProjectsStore((state) => state.toggleSidebar);

  useEffect(() => {
    const projectsWithCounts: ProjectWithCounts[] = mockData.map((project) => {
      const activeIncidents = (project.incidents ?? []).filter(
        (i) => i.status === "active",
      );

      return {
        ...project,
        incidentsCount: activeIncidents.filter((i) => i.item === "incidents")
          .length,
        rfiCount: activeIncidents.filter((i) => i.item === "RFI").length,
        taskCount: activeIncidents.filter((i) => i.item === "task").length,
      };
    });

    setProjects(projectsWithCounts);
  }, [setProjects]);

  return (
    <main className={styles.main}>
      <ProjectsTopBar />

      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          {viewMode === "list" && (
            <div className={styles.tableOnlyContainer}>
              <div className={styles.scrollWrapper}>
                <ProjectTable />
              </div>
            </div>
          )}

          {viewMode === "map" && (
            <section className={styles.mapViewSection}>
              <div className={styles.mapWrapper}>
                <MapView project={selectedProject} />
              </div>

              <div className={styles.tableContainer}>
                <ProjectTable />
              </div>
            </section>
          )}
        </div>

        <Sidebar />
      </div>

      <button
        className={styles.sidebarToggle}
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? "Cerrar panel" : "Abrir panel"}
        title={sidebarOpen ? "Cerrar panel" : "Abrir panel"}
      >
        <Image
          src={sidebarOpen ? "/left-arrow.svg" : "/right-arrow.svg"}
          alt=""
          width={20}
          height={20}
        />
      </button>
    </main>
  );
}
