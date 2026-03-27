"use client";

import { useEffect } from "react";
import styles from "./Modal.module.css";
import { cn } from "@/utils";

type ModalSize = "sm" | "md" | "lg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  children: React.ReactNode;
}

export const Modal = ({
  isOpen,
  onClose,
  size = "md",
  children,
}: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={cn(styles.modal, styles[size])}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export const ModalHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.modalHeader}>{children}</div>;
};

export const ModalBody = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.modalBody}>{children}</div>;
};

export const ModalFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.modalFooter}>{children}</div>;
};
