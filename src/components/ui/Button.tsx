import { forwardRef, type ButtonHTMLAttributes } from "react";
import { clsx } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

/**
 * Componente Button reutilizable con variantes
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const baseStyles =
      "rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles = {
      primary:
        "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 focus:ring-zinc-900 dark:focus:ring-zinc-100",
      secondary:
        "border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 focus:ring-zinc-500",
      ghost: "hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:ring-zinc-500",
      danger:
        "border border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 focus:ring-red-500",
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
