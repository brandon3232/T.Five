import { formatDateTime } from "../../lib/utils";
import type { JournalEntry } from "../../types";

interface JournalEntryCardProps {
  entry: JournalEntry;
}

/**
 * Tarjeta de entrada de diario individual
 */
export function JournalEntryCard({ entry }: JournalEntryCardProps) {
  return (
    <article className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
      <div className="text-xs opacity-60 mb-2">
        {formatDateTime(entry.createdAt)}
      </div>
      {entry.prompt && (
        <blockquote className="text-xs mb-3 opacity-70 italic border-l-2 pl-2">
          {entry.prompt}
        </blockquote>
      )}
      <p className="whitespace-pre-wrap text-sm leading-relaxed">
        {entry.text}
      </p>
    </article>
  );
}
