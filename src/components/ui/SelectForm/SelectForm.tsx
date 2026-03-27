"use client";
import React from "react";
import styles from "./SelectForm.module.css";

type Option = {
  label: string;
  value: string | number;
};

interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
> {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  options: Option[];
}

export const Select = ({
  label,
  value,
  onChange,
  options,
  error,
  ...props
}: SelectProps) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>

      <select
        className={`${styles.select} ${error ? styles.error : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      >
        <option value="">Select option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
