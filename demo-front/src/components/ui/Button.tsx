import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", className, ...props },
  ref
) {
  const variantClass = variant === "secondary" ? styles.secondary : styles.primary;
  return (
    <button
      ref={ref}
      className={[styles.button, variantClass, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
});

export default Button;
