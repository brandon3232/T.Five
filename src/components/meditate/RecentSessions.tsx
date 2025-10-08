import { Card } from "../ui/Card";
import { formatDateTime } from "../../lib/utils";
import type { MeditationSession } from "../../types";

interface RecentSessionsProps {
  sessions: MeditationSession[];
}

/**
 * Lista de sesiones de meditación recientes
 */
export function RecentSessions({ sessions }: RecentSessionsProps) {
  return (
    <Card title="Sesiones recientes">
      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
        {sessions.length === 0 && (
          <p className="text-sm opacity-70 text-center py-8">
            Aún no hay sesiones registradas.
            <br />
            Comienza tu primera meditación arriba.
          </p>
        )}
        {sessions.map((session) => (
          <div
            key={session.id}
            className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm mb-1">
                  {session.minutes} minutos
                </div>
                <div className="text-xs opacity-60">
                  {formatDateTime(session.endedAt)}
                </div>
              </div>
              <div className="text-2xl shrink-0">🧘‍♂️</div>
            </div>
            {session.note && (
              <p className="text-sm opacity-80 mt-2">{session.note}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
