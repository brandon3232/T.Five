import type { ReactNode } from "react";
import { clsx } from "../../lib/utils";

interface CardProps {
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

/**
 * Componente Card para contenedores de contenido
 */
export function Card({ title, children, actions, className }: CardProps) {
  return (
    <section
      className={clsx(
        "rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800",
        "bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm",
        className
      )}
    >
      {title && (
        <header className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-4">
          <h2 className="font-medium tracking-tight text-lg">{title}</h2>
          {actions && <div className="flex gap-2 flex-wrap">{actions}</div>}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}
