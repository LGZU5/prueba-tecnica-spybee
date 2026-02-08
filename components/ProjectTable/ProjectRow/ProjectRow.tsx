import { memo } from "react";
import { ProjectWithCounts } from "@/types/project";
import { useProjectsStore } from "@/store/projectsStore";
import styles from "./ProjectRow.module.css";
import Image from "next/image";

interface Props {
  project: ProjectWithCounts;
}

function ProjectRowComponent({ project }: Props) {
  const selectedProjectId = useProjectsStore(
    (state) => state.selectedProject?._id,
  );
  const setSelectedProject = useProjectsStore(
    (state) => state.setSelectedProject,
  );

  const visibleUsers = project.users.slice(0, 2);
  const extraUsers = project.users.length - visibleUsers.length;

  const hasImage = project.img && project.img !== "xxx";
  const isSelected = selectedProjectId === project._id;

  const handleRowClick = () => {
    setSelectedProject(project);
  };

  const getPlanLabel = (plan: string) => {
    return plan === "small" ? "Pequeño" : "Avanzado";
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      active: "Activo",
      inactive: "Inactivo",
      pending_payment: "Pago Pendiente",
    };
    return statusMap[status] || status;
  };

  const getHexagonColor = (index: number) => {
    const colors = ["#FFF5D7", "#F4E1A5"];
    return colors[index] || colors[colors.length - 1];
  };

  return (
    <tr
      className={`${styles.row} ${isSelected ? styles.rowSelected : ""}`}
      onClick={handleRowClick}
    >
      <td>
        <div className={styles.projectCell}>
          {hasImage ? (
            <Image
              src={project.img}
              alt={project.title}
              width={40}
              height={40}
              className={styles.projectImage}
            />
          ) : (
            <div className={styles.projectImageFallback} />
          )}

          <div className={styles.projectInfo}>
            <strong>{project.title}</strong>
            <span className={styles.projectDates}>
              {new Date(project.lastVisit).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </td>

      <td>
        <span
          className={`${styles.planBadge} ${styles[`plan-${project.projectPlanData.plan}`]}`}
        >
          {getPlanLabel(project.projectPlanData.plan)}
        </span>
      </td>

      <td>
        <span
          className={`${styles.statusBadge} ${styles[`status-${project.status}`]}`}
        >
          {getStatusLabel(project.status)}
        </span>
      </td>

      <td>
        <div className={styles.team}>
          {visibleUsers.map((user, index) => (
            <div
              key={`${user.name}-${user.lastName}-${index}`}
              className={styles.avatar}
              style={
                {
                  zIndex: visibleUsers.length - index + 1,
                  "--hex-color": getHexagonColor(index),
                } as React.CSSProperties
              }
            >
              <span>
                {user.name.charAt(0)}
                {user.lastName.charAt(0)}
              </span>
            </div>
          ))}

          {extraUsers > 0 && (
            <div
              className={styles.avatarExtra}
              style={
                {
                  zIndex: 0,
                  "--hex-color": "#EBB400",
                } as React.CSSProperties
              }
            >
              <span>{extraUsers}+</span>
            </div>
          )}
        </div>
      </td>

      <td className={styles.count}>
        <div className={styles.countWrapper}>
          <span className={styles.countNumber}>{project.incidentsCount}</span>
          <span className={styles.countLabel}>Incidencias</span>
        </div>
      </td>
      <td className={styles.count}>
        <div className={styles.countWrapper}>
          <span className={styles.countNumber}>{project.rfiCount}</span>
          <span className={styles.countLabel}>RFI</span>
        </div>
      </td>
      <td className={styles.count}>
        <div className={styles.countWrapper}>
          <span className={styles.countNumber}>{project.taskCount}</span>
          <span className={styles.countLabel}>Tareas</span>
        </div>
      </td>
    </tr>
  );
}

export const ProjectRow = memo(ProjectRowComponent);
