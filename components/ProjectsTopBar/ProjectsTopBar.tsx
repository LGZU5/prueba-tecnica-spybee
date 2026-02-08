"use client";

import { useState, useRef, useEffect } from "react";
import { useProjectsStore } from "@/store/projectsStore";
import type { SortFilter } from "@/store/projectsStore";
import styles from "./ProjectsTopBar.module.css";
import Image from "next/image";

export function ProjectsTopBar() {
  const search = useProjectsStore((state) => state.search);
  const viewMode = useProjectsStore((state) => state.viewMode);
  const projectsCount = useProjectsStore((state) => state.projects.length);

  const setSearch = useProjectsStore((state) => state.setSearch);
  const setSortFilter = useProjectsStore((state) => state.setSortFilter);
  const setViewMode = useProjectsStore((state) => state.setViewMode);

  const [open, setOpen] = useState(false);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  const handleSortChange = (value: SortFilter) => {
    setSortFilter(value);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        sortMenuRef.current &&
        !sortMenuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <section className={styles.topBar}>
      <div className={styles.left}>
        <h1 className={styles.title}>Mis proyectos</h1>
        <span className={styles.count}>{projectsCount} Proyectos</span>
      </div>

      <div className={styles.right}>
        <div className={styles.sortWrapper} ref={sortMenuRef}>
          <button
            className={styles.sortButton}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="true"
            aria-label="Ordenar proyectos"
          >
            <Image src="/menu-icon.svg" alt="Ordenar" width={16} height={16} />
          </button>

          {open && (
            <div className={styles.sortMenu} role="menu">
              <button onClick={() => handleSortChange("ALPHA")} role="menuitem">
                Orden alfabético
              </button>
              <button
                onClick={() => handleSortChange("INCIDENTS")}
                role="menuitem"
              >
                Numero de incidencias
              </button>
              <button onClick={() => handleSortChange("RFI")} role="menuitem">
                Numero de RFI
              </button>
              <button onClick={() => handleSortChange("TASKS")} role="menuitem">
                Numero de tareas
              </button>
            </div>
          )}
        </div>

        <input
          className={styles.search}
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar proyectos"
        />

        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewButton} ${viewMode === "list" ? styles.viewButtonActive : ""}`}
            onClick={() => setViewMode("list")}
            title="Vista de lista"
            aria-label="Vista de lista"
          >
            <Image src="/listIcon.svg" alt="" width={16} height={16} />
          </button>

          <button
            className={`${styles.viewButton} ${viewMode === "grid" ? styles.viewButtonActive : ""}`}
            onClick={() => setViewMode("grid")}
            title="Vista de cuadrícula"
            aria-label="Vista de cuadrícula"
            disabled
          >
            <Image src="/gridIcon.svg" alt="" width={16} height={16} />
          </button>

          <button
            className={`${styles.viewButton} ${viewMode === "map" ? styles.viewButtonActive : ""}`}
            onClick={() => setViewMode("map")}
            title="Vista de mapa"
            aria-label="Vista de mapa"
          >
            <Image src="/mapIcon.svg" alt="" width={16} height={16} />
          </button>
        </div>

        <button className={styles.createButton}>+ Crear proyecto</button>
      </div>
    </section>
  );
}
