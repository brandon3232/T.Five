import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  initialMinutes: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

/**
 * Hook reutilizable para temporizadores
 */
export function useTimer({ initialMinutes, onComplete, autoStart = false }: UseTimerOptions) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<number | null>(null);

  // Actualizar secondsLeft cuando cambian los minutos y no está corriendo
  useEffect(() => {
    if (!isRunning) {
      setSecondsLeft(minutes * 60);
    }
  }, [minutes, isRunning]);

  // Manejar el intervalo
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  // Detectar cuando se completa el temporizador
  useEffect(() => {
    if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      onComplete?.();
    }
  }, [secondsLeft, isRunning, onComplete]);

  const start = useCallback(() => {
    setSecondsLeft(minutes * 60);
    setIsRunning(true);
  }, [minutes]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsRunning(true);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setSecondsLeft(minutes * 60);
  }, [minutes]);

  const displayMinutes = Math.max(0, Math.floor(secondsLeft / 60));
  const displaySeconds = Math.max(0, secondsLeft % 60);

  return {
    minutes,
    setMinutes,
    secondsLeft,
    isRunning,
    start,
    pause,
    resume,
    reset,
    displayMinutes,
    displaySeconds,
  };
}
