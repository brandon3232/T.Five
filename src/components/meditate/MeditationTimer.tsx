import { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { useTimer } from "../../hooks/useTimer";
import {
  playNotificationSound,
  showNotification,
  requestNotificationPermission,
} from "../../lib/utils";
import { uid } from "../../lib/utils";
import type { Meditation, MeditationSession } from "../../types";

interface MeditationTimerProps {
  meditation: Meditation | null;
  onFinish: (session: MeditationSession) => void;
}

/**
 * Temporizador de meditación con guía
 */
export function MeditationTimer({
  meditation,
  onFinish,
}: MeditationTimerProps) {
  const [hasRequestedPermission, setHasRequestedPermission] = useState(false);

  const handleComplete = () => {
    playNotificationSound();
    showNotification(
      "Meditación completada",
      "Has terminado tu sesión de meditación."
    );

    const session: MeditationSession = {
      id: uid("sess"),
      type: "meditation",
      minutes: meditation?.duration || minutes,
      endedAt: new Date().toISOString(),
      note: meditation
        ? `${meditation.title} completada`
        : "Sesión libre completada",
      meditationType: meditation?.category,
    };

    onFinish(session);
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
    initialMinutes: meditation?.duration || 5,
    onComplete: handleComplete,
  });

  // Actualizar minutos cuando cambia la meditación seleccionada
  useState(() => {
    if (meditation) {
      setMinutes(meditation.duration);
    }
  });

  const handleStart = async () => {
    if (!hasRequestedPermission) {
      await requestNotificationPermission();
      setHasRequestedPermission(true);
    }
    start();
  };

  return (
    <Card title={meditation ? meditation.title : "Temporizador libre"}>
      <div className="space-y-6">
        {meditation?.guide && !isRunning && (
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-sm">
            <p className="italic opacity-90">{meditation.guide}</p>
          </div>
        )}

        {!meditation && !isRunning && (
          <div className="space-y-3">
            <label className="block text-sm font-medium">
              Duración (minutos): {minutes}
            </label>
            <input
              type="range"
              min={1}
              max={30}
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
              className="w-full"
              aria-label="Duración en minutos"
            />
          </div>
        )}

        <div
          className="text-6xl font-mono tracking-tight text-center select-none py-8"
          aria-live="polite"
          aria-atomic="true"
        >
          {displayMinutes}:{displaySeconds.toString().padStart(2, "0")}
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          {!isRunning ? (
            <>
              <Button onClick={handleStart} size="lg">
                Iniciar
              </Button>
              {displayMinutes !== minutes || displaySeconds !== 0 ? (
                <Button onClick={reset} variant="secondary">
                  Reiniciar
                </Button>
              ) : null}
            </>
          ) : (
            <>
              <Button onClick={pause} variant="secondary" size="lg">
                Pausar
              </Button>
              <Button onClick={reset} variant="ghost">
                Reiniciar
              </Button>
            </>
          )}
        </div>

        {isRunning && (
          <p className="text-center text-sm opacity-70 animate-pulse">
            Respira conscientemente... Observa sin juzgar...
          </p>
        )}

        {!isRunning && (
          <details className="text-sm opacity-80">
            <summary className="cursor-pointer hover:opacity-100 transition-opacity">
              💡 Sugerencia para la práctica
            </summary>
            <p className="mt-2 pl-4">
              Wu-Wei: Si surgen pensamientos, no los rechaces ni te aferres a
              ellos. Déjalos pasar como nubes en el cielo. Regresa suavemente a
              tu respiración.
            </p>
          </details>
        )}
      </div>
    </Card>
  );
}
