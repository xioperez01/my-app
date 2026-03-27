import Link from "next/link";
import styles from "./page.module.css";
import { Button } from "@/components/ui/Button/Button";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <h1>Advisor not found</h1>
      <p>The advisor you are looking for does not exist or was removed.</p>

      <Link href="/advisors">
        <Button>Go back to advisors</Button>
      </Link>
    </div>
  );
}
