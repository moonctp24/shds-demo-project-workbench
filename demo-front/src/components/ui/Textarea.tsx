import { TextareaHTMLAttributes, forwardRef, useId } from "react";
import styles from "./Textarea.module.css";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, error, className, id, ...props },
  ref
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={textareaId}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        className={[styles.textarea, error && styles.textareaError, className]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
});

export default Textarea;
