import { SummaryData } from "@/hooks/useSidebarData";
import { StatsCard } from "../StatsCard/StatsCard";
import styles from "./StatsSection.module.css";

interface Props {
  summaryData: SummaryData;
}

export function StatsSection({ summaryData }: Props) {
  return (
    <div className={styles.statsSection}>
      <h4 className={styles.sectionTitle}>Próximos a vencer</h4>
      <div className={styles.statsGrid}>
        <StatsCard
          label="Incidencias"
          total={summaryData.totalIncidents}
          active={summaryData.activeIncidents}
        />
        <StatsCard
          label="RFI"
          total={summaryData.totalRFI}
          active={summaryData.activeRFI}
        />
        <StatsCard
          label="Tareas"
          total={summaryData.totalTasks}
          active={summaryData.activeTasks}
        />
      </div>
    </div>
  );
}
