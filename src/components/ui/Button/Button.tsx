import { cn } from "@/utils";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  colorScheme?: "primary" | "danger";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = ({
  children,
  variant = "solid",
  colorScheme = "primary",
  leftIcon,
  rightIcon,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        styles.button,
        styles[variant],
        styles[colorScheme],
        className,
      )}
      {...props}
    >
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </button>
  );
};
