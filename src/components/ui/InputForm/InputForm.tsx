"use client";
import React from "react";
import styles from "./Input.module.css";
import { cn } from "@/utils";

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  label: string;
  name: string;
  value: string | number;
  onChange: (value: string) => void;

  error?: string;
}

export const Input = ({
  label,
  value,
  onChange,
  error,
  ...props
}: InputProps) => {
  return (
    <div className={styles.container}>
      <label
        className={cn(
          styles.label,
          props.required ? styles.labelRequired : undefined,
        )}
      >
        {label}
      </label>

      <input
        className={`${styles.input} ${error ? styles.error : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
