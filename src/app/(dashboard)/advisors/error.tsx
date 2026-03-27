"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button/Button";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <h1>Something went wrong</h1>
      <p>We couldn’t load the advisors. Please try again.</p>

      <div className={styles.errorActions}>
        <Button onClick={() => reset()}>Retry</Button>

        <Button variant="outline" onClick={() => router.back()}>
          Go to Home
        </Button>
      </div>
    </div>
  );
}
