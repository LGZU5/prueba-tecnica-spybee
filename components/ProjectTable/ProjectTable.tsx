"use client";

import { useProjectsStore } from "@/store/projectsStore";
import { ProjectRow } from "./ProjectRow/ProjectRow";
import { Pagination } from "./Pagination/Pagination";
import { useFilteredProjects } from "@/hooks/useFilteredProjects";
import { useSortedProjects } from "@/hooks/useSortedProjects";
import { usePaginatedProjects } from "@/hooks/usePaginatedProjects";
import styles from "./ProjectTable.module.css";

export function ProjectTable() {
  const projects = useProjectsStore((state) => state.projects);
  const search = useProjectsStore((state) => state.search);
  const statusFilter = useProjectsStore((state) => state.statusFilter);
  const planFilter = useProjectsStore((state) => state.planFilter);
  const sortFilter = useProjectsStore((state) => state.sortFilter);
  const currentPage = useProjectsStore((state) => state.currentPage);
  const pageSize = useProjectsStore((state) => state.pageSize);
  const setCurrentPage = useProjectsStore((state) => state.setCurrentPage);

  const filteredProjects = useFilteredProjects(projects, {
    search,
    statusFilter,
    planFilter,
  });

  const sortedProjects = useSortedProjects(filteredProjects, sortFilter);

  const { paginatedProjects, totalPages } = usePaginatedProjects(
    sortedProjects,
    currentPage,
    pageSize,
  );

  return (
    <>
      <div className={styles.scrollHint}>← Desliza para ver más →</div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Proyecto</th>
              <th>Plan</th>
              <th>Estado</th>
              <th>Equipo</th>
              <th colSpan={3}>Ítems por vencer</th>
            </tr>
          </thead>

          <tbody>
            {paginatedProjects.map((project) => (
              <ProjectRow key={project._id} project={project} />
            ))}

            {paginatedProjects.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.emptyState}>
                  No hay proyectos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
