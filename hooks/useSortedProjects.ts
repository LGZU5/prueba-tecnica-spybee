import { useMemo } from "react";
import { ProjectWithCounts } from "@/types/project";
import { SortFilter } from "@/store/projectsStore";

export function useSortedProjects(
  projects: ProjectWithCounts[],
  sortFilter: SortFilter,
) {
  return useMemo(() => {
    return [...projects].sort((a, b) => {
      switch (sortFilter) {
        case "INCIDENTS":
          return b.incidentsCount - a.incidentsCount;
        case "RFI":
          return b.rfiCount - a.rfiCount;
        case "TASKS":
          return b.taskCount - a.taskCount;
        case "ALPHA":
        default:
          return a.title.localeCompare(b.title, "es", {
            numeric: true,
            sensitivity: "base",
          });
      }
    });
  }, [projects, sortFilter]);
}
