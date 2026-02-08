import { useMemo } from "react";
import { ProjectWithCounts } from "@/types/project";

export function usePaginatedProjects(
  projects: ProjectWithCounts[],
  currentPage: number,
  pageSize: number,
) {
  return useMemo(() => {
    if (pageSize <= 0) {
      return { paginatedProjects: projects, totalPages: 1 };
    }

    const total = Math.ceil(projects.length / pageSize);
    const safePage = Math.min(Math.max(1, currentPage), total || 1);
    const startIndex = (safePage - 1) * pageSize;
    const paginated = projects.slice(startIndex, startIndex + pageSize);

    return { paginatedProjects: paginated, totalPages: total };
  }, [projects, currentPage, pageSize]);
}
