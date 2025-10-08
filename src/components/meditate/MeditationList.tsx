import { clsx } from "../../lib/utils";
import type { Meditation } from "../../types";

interface MeditationListProps {
  meditations: Meditation[];
  onSelect: (meditation: Meditation) => void;
  selected: Meditation | null;
}

const categoryLabels: Record<string, string> = {
  respiracion: "Respiración",
  bodyscan: "Escaneo corporal",
  mindfulness: "Mindfulness",
  wuwei: "Wu-Wei",
  "loving-kindness": "Amor compasivo",
};

/**
 * Lista de meditaciones guiadas disponibles
 */
export function MeditationList({
  meditations,
  onSelect,
  selected,
}: MeditationListProps) {
  return (
    <div className="grid gap-3">
      {meditations.map((meditation) => (
        <button
          key={meditation.id}
          onClick={() => onSelect(meditation)}
          className={clsx(
            "text-left p-4 rounded-xl border transition-all",
            "hover:shadow-md hover:scale-[1.01]",
            selected?.id === meditation.id
              ? "border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800"
              : "border-zinc-200 dark:border-zinc-800"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium mb-1">{meditation.title}</h3>
              <p className="text-sm opacity-70 mb-2">
                {meditation.description}
              </p>
              <div className="flex items-center gap-3 text-xs opacity-60">
                <span>{categoryLabels[meditation.category]}</span>
                <span>•</span>
                <span>{meditation.duration} min</span>
              </div>
            </div>
            {selected?.id === meditation.id && (
              <div className="text-2xl shrink-0" aria-label="Seleccionado">
                ✓
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
