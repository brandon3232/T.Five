import { forwardRef, type TextareaHTMLAttributes } from "react";
import { clsx } from "../../lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

/**
 * Componente Textarea reutilizable
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId =
      id || `textarea-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            "w-full px-3 py-2 rounded-xl border transition-colors resize-y",
            "bg-white dark:bg-zinc-900",
            "border-zinc-300 dark:border-zinc-700",
            "focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
