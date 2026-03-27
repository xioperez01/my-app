import styles from "./page.module.css";

export default function Loading() {
  return (
    <div className={styles.root}>
      <div className={styles.topContainer}>
        <div className={styles.avatarSkeleton} />

        <div className={styles.actionsContainer}>
          <div className={styles.buttonSkeleton} />
          <div className={styles.buttonSkeleton} />
        </div>
      </div>

      <div className={styles.primaryInfoContainer}>
        <div className={styles.titleSkeleton} />

        <div className={styles.rowSkeleton} />
        <div className={styles.rowSkeleton} />
      </div>

      <hr />

      <div className={styles.dataContainer}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.dataRowSkeleton} />
        ))}
      </div>
    </div>
  );
}
