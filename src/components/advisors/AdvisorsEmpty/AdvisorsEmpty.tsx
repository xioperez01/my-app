"use client";
import styles from "./AdvisorsEmpty.module.css";
import { Button } from "@/components/ui/Button/Button";
import { useRouter } from "next/navigation";
import typography from "@/styles/typography.module.css";
import { cn } from "@/utils";

function AdvisorsEmpty() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };
  return (
    <div className={styles.container}>
      <p className={cn(styles.message)}>
        No available Advisors based on the provided income. Please try a
        different income value.
      </p>
      <Button onClick={handleGoHome}>Try new income</Button>
    </div>
  );
}

export default AdvisorsEmpty;
