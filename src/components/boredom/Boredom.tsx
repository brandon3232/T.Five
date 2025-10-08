import { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Textarea } from "../ui/Textarea";
import { useTimer } from "../../hooks/useTimer";
import { playNotificationSound, showNotification } from "../../lib/utils";
import { uid } from "../../lib/utils";
import type { JournalEntry } from "../../types";

interface BoredomProps {
  onSaveNote: (entry: JournalEntry) => void;
}

/**
 * Componente de Aburrimiento Consciente
 */
export function Boredom({ onSaveNote }: BoredomProps) {
  const [note, setNote] = useState("");
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleComplete = () => {
    playNotificationSound();
    showNotification(
      "Tiempo completado",
      "¿Qué surgió en el silencio? Puedes escribir tus reflexiones."
    );
    setHasCompleted(true);
  };

  const {
    minutes,
    setMinutes,
    isRunning,
    start,
    pause,
    reset,
    displayMinutes,
    displaySeconds,
  } = useTimer({
    initialMinutes: 3,
    onComplete: handleComplete,
  });

  const handleSaveNote = () => {
    if (!note.trim()) return;

    const entry: JournalEntry = {
      id: uid("jr"),
      type: "journal",
      createdAt: new Date().toISOString(),
      prompt: "Aburrimiento consciente – Reflexiones",
      text: note.trim(),
    };

    onSaveNote(entry);
    setNote("");
    setHasCompleted(false);
  };

  const handleReset = () => {
    reset();
    setHasCompleted(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Temporizador minimalista">
        <div className="space-y-6">
          <p className="text-sm opacity-70">
            Una pantalla intencionalmente simple. Sin estímulos, sin
            distracciones, sin métricas. Solo tiempo para estar contigo mismo.
          </p>

          {!isRunning && (
            <div className="space-y-3">
              <label className="block text-sm font-medium">
                Duración: {minutes} minutos
              </label>
              <input
                type="range"
                min={1}
                max={20}
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value))}
                className="w-full"
                aria-label="Duración en minutos"
              />
            </div>
          )}

          <div
            className="text-7xl font-mono tracking-tight text-center select-none py-12"
            aria-live="polite"
            aria-atomic="true"
          >
            {displayMinutes}:{displaySeconds.toString().padStart(2, "0")}
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            {!isRunning ? (
              <>
                <Button onClick={start} size="lg">
                  Comenzar
                </Button>
                {(displayMinutes !== minutes || displaySeconds !== 0) && (
                  <Button onClick={handleReset} variant="secondary">
                    Reiniciar
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button onClick={pause} variant="secondary" size="lg">
                  Pausar
                </Button>
                <Button onClick={handleReset} variant="ghost">
                  Reiniciar
                </Button>
              </>
            )}
          </div>

          {hasCompleted && (
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-center">
              <p className="text-sm">✨ Tiempo completado</p>
              <p className="text-xs opacity-70 mt-1">
                ¿Qué pensamientos, emociones o ideas surgieron?
              </p>
            </div>
          )}

          <details className="text-sm opacity-70">
            <summary className="cursor-pointer hover:opacity-100 transition-opacity">
              💡 Sobre el aburrimiento consciente
            </summary>
            <p className="mt-2 pl-4 leading-relaxed">
              El aburrimiento puede ser un catalizador para la creatividad. En
              el silencio, sin estímulos externos, la mente comienza a explorar,
              a imaginar, a conectar ideas. No es tiempo perdido, es tiempo de
              encuentro.
            </p>
          </details>
        </div>
      </Card>

      <Card title="¿Qué surgió en el silencio?">
        <div className="space-y-4">
          <p className="text-sm opacity-70">
            Después de tu tiempo de aburrimiento consciente, reflexiona sobre lo
            que experimentaste. No hay respuestas incorrectas.
          </p>

          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={12}
            placeholder="Ideas, emociones, incomodidades, inspiraciones, pensamientos random..."
          />

          <div className="flex gap-2 flex-wrap">
            <Button onClick={handleSaveNote} disabled={!note.trim()}>
              Guardar nota
            </Button>
            <Button onClick={() => setNote("")} variant="secondary">
              Limpiar
            </Button>
          </div>

          <p className="text-xs opacity-60">
            Estas notas se guardarán en tu diario para que puedas revisitarlas
            después.
          </p>
        </div>
      </Card>
    </div>
  );
}
