import Navbar from "@/components/Navbar/Navbar";
import styles from "./layout.module.css";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.root}>
      <Navbar />
      <div className={styles.container}>{children}</div>
    </main>
  );
}
