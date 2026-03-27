"use client";
import React, { Fragment, useEffect } from "react";
import { Button } from "@/components/ui/Button/Button";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/Modal/Modal";
import { Select } from "@/components/ui/SelectForm/SelectForm";
import { Input } from "@/components/ui/InputForm/InputForm";
import { Advisor, CreateAdvisorDTO } from "@/types/advisor";
import styles from "./EditAdvisorModal.module.css";
import Image from "next/image";
import { validateAdvisor } from "@/utils/advisor";
import typography from "@/styles/typography.module.css";
import { useRouter } from "next/navigation";
import UploadIcon from "@/components/icons/UploadIcon";
import EditIcon from "@/components/icons/EditIcon";
import { createAdvisor, updateAdvisor } from "@/lib/advisor";
import PlusIcon from "@/components/icons/PlusIcon";

type Props = {
  advisor?: Advisor;
};

const dataToDisplay: {
  key: keyof CreateAdvisorDTO;
  label: string;
  required?: boolean;
}[] = [
  { key: "firstName", label: "First Name", required: true },
  { key: "lastName", label: "Last Name", required: true },
  { key: "idNumber", label: "ID Number" },
  { key: "email", label: "Email", required: true },
  { key: "income", label: "Income", required: true },
  { key: "education", label: "Education" },
  { key: "title", label: "Title" },
];

export default function AdvisorModal({ advisor }: Props) {
  const router = useRouter();
  const isEditMode = !!advisor;

  const [isOpen, setIsOpen] = React.useState(false);

  const [form, setForm] = React.useState<
    Partial<CreateAdvisorDTO> & {
      avatarFile?: File | null;
      avatarPreview?: string | null;
      removeAvatar?: boolean;
    }
  >({});

  const [saving, setSaving] = React.useState(false);
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof CreateAdvisorDTO | "general", string>>
  >({});

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleOpenModal = () => setIsOpen(true);

  const handleClose = () => {
    if (saving) return;
    setIsOpen(false);
    setErrors({});
  };

  useEffect(() => {
    if (isOpen) {
      if (advisor) {
        const [firstName, ...rest] = advisor.name.split(" ");

        setForm({
          ...advisor,
          firstName,
          lastName: rest.join(" "),
          avatarPreview: null,
          avatarFile: null,
          removeAvatar: false,
        });
      } else {
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          income: undefined,
        });
      }
    }
  }, [isOpen, advisor]);

  useEffect(() => {
    return () => {
      if (form.avatarPreview) {
        URL.revokeObjectURL(form.avatarPreview);
      }
    };
  }, [form.avatarPreview]);

  const handleChange = (key: keyof CreateAdvisorDTO, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  const handleImageUpload = (file: File) => {
    const preview = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      avatarFile: file,
      avatarPreview: preview,
      removeAvatar: false,
    }));
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({
      ...prev,
      avatarFile: null,
      avatarPreview: null,
      removeAvatar: true,
    }));
  };

  const handleValidate = () => {
    const validationErrors = validateAdvisor(form, dataToDisplay);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!handleValidate()) return;

    try {
      setSaving(true);
      setErrors({});

      const result = isEditMode
        ? await updateAdvisor(advisor!.id, form)
        : await createAdvisor(form);

      router.refresh();

      setIsOpen(false);

      if (!isEditMode) {
        router.push(`/advisors/${result.id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: "Something went wrong." });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Fragment>
      <Button
        leftIcon={isEditMode ? <EditIcon /> : <PlusIcon />}
        variant={isEditMode ? "outline" : "solid"}
        colorScheme="primary"
        onClick={handleOpenModal}
      >
        {isEditMode ? "Edit Advisor" : "Add Advisor"}
      </Button>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalHeader>
          {isEditMode ? "Edit Advisor" : "Create Advisor"}
        </ModalHeader>

        <ModalBody>
          <div className={styles.container}>
            <div className={styles.topContainer}>
              {form.avatarPreview ? (
                <img
                  src={form.avatarPreview}
                  className={styles.avatar}
                  alt="preview"
                />
              ) : advisor?.avatar && !form.removeAvatar ? (
                <Image
                  src={advisor.avatar}
                  alt={advisor.name}
                  width={112}
                  height={112}
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.avatarFallback}>
                  <span className={typography.text2Xl}>
                    {form.firstName?.[0] || "N A"}
                  </span>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    handleImageUpload(e.target.files[0]);
                  }
                }}
              />

              <div className={styles.actionsContainer}>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  leftIcon={<UploadIcon />}
                >
                  Upload Image
                </Button>

                <Button
                  variant="ghost"
                  colorScheme="danger"
                  onClick={handleRemoveImage}
                >
                  Remove
                </Button>
              </div>
            </div>

            <div className={styles.inputsContainer}>
              {dataToDisplay.map(({ key, label, required }) => (
                <Input
                  key={key}
                  name={key}
                  label={label}
                  value={form[key] ?? ""}
                  onChange={(val) =>
                    handleChange(key, key === "income" ? Number(val) : val)
                  }
                  error={errors[key]}
                  disabled={saving}
                  required={required}
                  type={key === "income" ? "number" : "text"}
                />
              ))}
            </div>

            <Select
              label="Years of Experience"
              title="experienceYears"
              value={form.experienceYears ?? ""}
              onChange={(val) => handleChange("experienceYears", val)}
              options={[
                { label: "0-1 years", value: "0-1" },
                { label: "2-5 years", value: "2-5" },
                { label: "6-10 years", value: "6-10" },
                { label: "10+ years", value: "10+" },
              ]}
              error={errors.experienceYears}
              disabled={saving}
            />

            {errors.general && (
              <span className={styles.errorText}>{errors.general}</span>
            )}
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
            colorScheme="primary"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving
              ? isEditMode
                ? "Saving..."
                : "Creating..."
              : isEditMode
                ? "Save Changes"
                : "Create Advisor"}
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
}
