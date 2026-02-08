export interface User {
  name: string;
  lastName: string;
}

export interface Position {
  lat: number;
  lng: number;
}

export type ItemType = string;

export interface ProjectItem {
  _id: string;
  item: ItemType;
  status: string;
  limitDate: string;
  description: string;
  owner: string;
  tag: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  status: string;
  lastVisit: string;
  img: string;

  projectPlanData: {
    plan: string;
  };

  users: User[];
  position: Position;
  incidents: ProjectItem[];
}

export interface ProjectWithCounts extends Project {
  incidentsCount: number;
  rfiCount: number;
  taskCount: number;
}
