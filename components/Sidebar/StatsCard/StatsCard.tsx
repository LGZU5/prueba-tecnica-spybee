import styles from "./StatsCard.module.css";

interface Props {
  label: string;
  total: number;
  active: number;
}

export function StatsCard({ label, total, active }: Props) {
  const getPercentage = (active: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((active / total) * 100);
  };

  const percentage = getPercentage(active, total);

  return (
    <div className={styles.statCard}>
      <div className={styles.statHeader}>
        <span className={styles.statLabel}>{label}</span>
        <span className={styles.statCount}>{total}</span>
      </div>
      <span className={styles.statSubtext}>Total Abiertas</span>
      <div className={styles.progressCircle}>
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" className={styles.circleBackground} />
          <circle
            cx="50"
            cy="50"
            r="40"
            className={styles.circleProgress}
            strokeDasharray={`${percentage * 2.51} 251`}
          />
        </svg>
        <span className={styles.circleText}>{active}</span>
      </div>
    </div>
  );
}
