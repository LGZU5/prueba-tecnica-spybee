import { create } from "zustand";
import { ProjectWithCounts } from "@/types/project";

export type SortFilter = "ALPHA" | "INCIDENTS" | "RFI" | "TASKS";
export type ViewMode = "list" | "grid" | "map";

interface ProjectsState {
  projects: ProjectWithCounts[];
  selectedProject: ProjectWithCounts | null;

  search: string;
  statusFilter: string;
  planFilter: string;
  sortFilter: SortFilter;

  currentPage: number;
  pageSize: number;

  viewMode: ViewMode;
  sidebarOpen: boolean;

  setProjects: (projects: ProjectWithCounts[]) => void;
  setSearch: (value: string) => void;
  setStatusFilter: (value: string) => void;
  setPlanFilter: (value: string) => void;
  setSortFilter: (value: SortFilter) => void;
  setCurrentPage: (page: number) => void;
  setSelectedProject: (project: ProjectWithCounts | null) => void;
  setViewMode: (mode: ViewMode) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  selectedProject: null,

  search: "",
  statusFilter: "ALL",
  planFilter: "ALL",
  sortFilter: "ALPHA",

  currentPage: 1,
  pageSize: 10,

  viewMode: "list",
  sidebarOpen: false,

  setProjects: (projects) => set({ projects }),
  setSearch: (value) => set({ search: value, currentPage: 1 }),
  setStatusFilter: (value) => set({ statusFilter: value, currentPage: 1 }),
  setPlanFilter: (value) => set({ planFilter: value, currentPage: 1 }),
  setSortFilter: (value) => set({ sortFilter: value, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedProject: (project) =>
    set({ selectedProject: project, viewMode: "map" }),
  setViewMode: (viewMode) => set({ viewMode }),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
