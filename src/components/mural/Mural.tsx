import { useMemo } from "react";
import { Card } from "../ui/Card";
import { TimelineItem } from "./TimelineItem";
import type { MeditationSession, JournalEntry } from "../../types";

interface MuralProps {
  sessions: MeditationSession[];
  journal: JournalEntry[];
}

type CombinedItem = (MeditationSession | JournalEntry) & {
  when: string;
  sortKey: string;
};

/**
 * Componente principal del Mural (línea de tiempo)
 */
export function Mural({ sessions, journal }: MuralProps) {
  const items = useMemo(() => {
    const sessionItems: CombinedItem[] = sessions.map((s) => ({
      ...s,
      when: s.endedAt,
      sortKey: s.endedAt,
    }));

    const journalItems: CombinedItem[] = journal.map((j) => ({
      ...j,
      when: j.createdAt,
      sortKey: j.createdAt,
    }));

    return [...sessionItems, ...journalItems].sort(
      (a, b) => new Date(b.sortKey).getTime() - new Date(a.sortKey).getTime()
    );
  }, [sessions, journal]);

  return (
    <Card title="Mural narrativo · Línea de tiempo">
      <div className="space-y-6">
        <p className="text-sm opacity-70">
          Una vista cronológica de tu viaje. Sin métricas, sin juicios, solo un
          registro de tu presencia.
        </p>

        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

          <ul className="space-y-6 relative">
            {items.length === 0 && (
              <li className="text-sm opacity-70 text-center py-12">
                Aún no hay registros.
                <br />
                Comienza meditando o escribiendo en tu diario.
              </li>
            )}
            {items.map((item) => (
              <TimelineItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
