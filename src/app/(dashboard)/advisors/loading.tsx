import styles from "./page.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.titleSkeleton} />
        <div className={styles.buttonSkeleton} />
      </div>

      <div className={styles.tableSkeleton}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={styles.rowSkeleton} />
        ))}
      </div>
    </div>
  );
}
