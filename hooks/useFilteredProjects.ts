import { useMemo } from "react";
import { ProjectWithCounts } from "@/types/project";

interface Filters {
  search: string;
  statusFilter: string;
  planFilter: string;
}

export function useFilteredProjects(
  projects: ProjectWithCounts[],
  filters: Filters,
) {
  return useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = project.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.statusFilter === "ALL" ||
        project.status === filters.statusFilter;

      const matchesPlan =
        filters.planFilter === "ALL" ||
        project.projectPlanData.plan === filters.planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [projects, filters.search, filters.statusFilter, filters.planFilter]);
}
