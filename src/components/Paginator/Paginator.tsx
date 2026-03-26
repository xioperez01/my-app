import { Button } from "@/components/ui/Button/Button";
import styles from "./Paginator.module.css";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon";
import RightArrowIcon from "@/components/icons/RightArrowIcon";

interface PaginatorProps {
  currentPage: number;
  next: () => void;
  prev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  label?: string;
  dataName?: string;
}

function Paginator({
  currentPage,
  next,
  prev,
  hasNext,
  hasPrev,
  label,
  dataName,
}: PaginatorProps) {
  return (
    <div className={styles.container}>
      {label && (
        <p className={styles.label}>
          {label} {dataName && <span>{dataName}</span>}
        </p>
      )}
      <div className={styles.controls}>
        <Button
          variant="ghost"
          colorScheme="neutral"
          disabled={!hasPrev}
          onClick={prev}
        >
          <LeftArrowIcon />
        </Button>
        <div className={styles.pageIndicator}>
          <span>{currentPage}</span>
        </div>
        <Button
          variant="ghost"
          colorScheme="neutral"
          disabled={!hasNext}
          onClick={next}
        >
          <RightArrowIcon />
        </Button>
      </div>
    </div>
  );
}

export default Paginator;
