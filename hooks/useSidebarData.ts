import { useMemo } from "react";
import { useProjectsStore } from "@/store/projectsStore";

export interface SummaryData {
  totalIncidents: number;
  activeIncidents: number;
  totalRFI: number;
  activeRFI: number;
  totalTasks: number;
  activeTasks: number;
}

export interface UpcomingItem {
  projectTitle: string;
  projectId: string;
  item: string;
  limitDate: string;
  owner: string;
}

export function useSidebarData() {
  const projects = useProjectsStore((state) => state.projects);

  const summaryData: SummaryData = useMemo(() => {
    let totalIncidents = 0;
    let activeIncidents = 0;
    let totalRFI = 0;
    let activeRFI = 0;
    let totalTasks = 0;
    let activeTasks = 0;

    projects.forEach((project) => {
      project.incidents?.forEach((incident) => {
        if (incident.item === "incidents") {
          totalIncidents++;
          if (incident.status === "active") activeIncidents++;
        } else if (incident.item === "RFI") {
          totalRFI++;
          if (incident.status === "active") activeRFI++;
        } else if (incident.item === "task") {
          totalTasks++;
          if (incident.status === "active") activeTasks++;
        }
      });
    });

    return {
      totalIncidents,
      activeIncidents,
      totalRFI,
      activeRFI,
      totalTasks,
      activeTasks,
    };
  }, [projects]);

  const upcomingItems: UpcomingItem[] = useMemo(() => {
    const items: UpcomingItem[] = [];
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    projects.forEach((project) => {
      project.incidents?.forEach((incident) => {
        if (incident.status === "active") {
          const limitDate = new Date(incident.limitDate);
          if (limitDate >= now && limitDate <= sevenDaysFromNow) {
            items.push({
              projectTitle: project.title,
              projectId: project._id,
              item: incident.item,
              limitDate: incident.limitDate,
              owner: incident.owner,
            });
          }
        }
      });
    });

    return items
      .sort(
        (a, b) =>
          new Date(a.limitDate).getTime() - new Date(b.limitDate).getTime(),
      )
      .slice(0, 5);
  }, [projects]);

  return { summaryData, upcomingItems };
}
