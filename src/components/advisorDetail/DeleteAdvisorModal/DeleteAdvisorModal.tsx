"use client";
import React, { Fragment } from "react";
import { Button } from "@/components/ui/Button/Button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal/Modal";
import { Advisor } from "@/types/advisor";
import { useRouter } from "next/navigation";
import TrashIcon from "@/components/icons/TrashIcon";
import styles from "./DeleteAdvisorModal.module.css";
import { deleteAdvisor } from "@/lib/advisor";

type Props = {
  advisor: Advisor;
};

function DeleteAdvisorModal({ advisor }: Props) {
  const router = useRouter();

  const [isOpen, setIsOpen] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleOpenModal = () => setIsOpen(true);

  const handleClose = () => {
    if (saving) return;
    setIsOpen(false);
    setError(null);
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError(null);

      await deleteAdvisor(advisor.id);

      setIsOpen(false);
      router.refresh();
      router.push("/");
    } catch (err) {
      setError("Failed to delete advisor. Please try again.");
      setSaving(false);
    }
  };

  return (
    <Fragment>
      <Button
        leftIcon={<TrashIcon />}
        colorScheme="danger"
        onClick={handleOpenModal}
      >
        Delete
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalHeader>Delete Advisor</ModalHeader>

        <ModalBody>
          <div className={styles.container}>
            <p className={styles.warning}>
              Are you sure you want to delete this advisor?
            </p>

            <div className={styles.advisorInfo}>
              <strong>{advisor.name}</strong>
              <span>{advisor.email}</span>
            </div>

            <p className={styles.description}>This action cannot be undone.</p>

            {error && <span className={styles.errorText}>{error}</span>}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            colorScheme="primary"
            onClick={handleClose}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            variant="solid"
            colorScheme="danger"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? "Deleting..." : "Delete Advisor"}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}

export default DeleteAdvisorModal;
