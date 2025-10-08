import { formatDateTime } from "../../lib/utils";
import type { MeditationSession, JournalEntry } from "../../types";

interface TimelineItemProps {
  item: MeditationSession | JournalEntry;
}

/**
 * Item individual en la línea de tiempo
 */
export function TimelineItem({ item }: TimelineItemProps) {
  const isMeditation = item.type === "meditation";
  const when = isMeditation
    ? (item as MeditationSession).endedAt
    : (item as JournalEntry).createdAt;

  return (
    <li className="flex items-start gap-4 pl-10 relative">
      {/* Punto en la línea */}
      <div
        className="absolute left-2.5 top-2 h-3 w-3 rounded-full bg-zinc-900 dark:bg-zinc-100 ring-4 ring-white dark:ring-zinc-900"
        aria-hidden="true"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-medium text-sm">
              {isMeditation ? (
                <>🧘‍♂️ Meditación · {(item as MeditationSession).minutes} min</>
              ) : (
                <>📔 Entrada de diario</>
              )}
            </h3>
            <div className="text-xs opacity-60 mt-1">
              {formatDateTime(when)}
            </div>
          </div>
        </div>

        {isMeditation ? (
          <p className="text-sm opacity-80">
            {(item as MeditationSession).note}
          </p>
        ) : (
          <div className="space-y-2">
            {(item as JournalEntry).prompt && (
              <blockquote className="text-xs opacity-60 italic border-l-2 pl-2">
                {(item as JournalEntry).prompt}
              </blockquote>
            )}
            <p className="text-sm opacity-80 line-clamp-3">
              {(item as JournalEntry).text}
            </p>
          </div>
        )}
      </div>
    </li>
  );
}
