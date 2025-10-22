/**
 * Componente para mostrar un track de Spotify
 * Incluye portada, info, preview de audio y botón para agregar
 */

import { useState, useRef, useEffect } from "react";
import type { SimplifiedTrack } from "@/types/spotify";
import { Button } from "@/components/ui/Button";

interface SpotifyTrackCardProps {
  track: SimplifiedTrack;
  onAdd: (track: SimplifiedTrack) => void;
  isAdded?: boolean;
}

export function SpotifyTrackCard({
  track,
  onAdd,
  isAdded = false,
}: SpotifyTrackCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Formatear duración de ms a mm:ss
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Actualizar estado cuando el audio termine o pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const hasPreview = Boolean(track.previewUrl);

  return (
    <div className="group flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:bg-zinc-50 dark:hover:bg-zinc-800/70 transition-colors">
      {/* Portada del álbum */}
      <div className="relative shrink-0">
        <img
          src={track.imageUrl}
          alt={`Portada de ${track.album}`}
          className="w-16 h-16 rounded-lg object-cover"
          loading="lazy"
        />
        {hasPreview && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
            aria-label={isPlaying ? "Pausar preview" : "Reproducir preview"}
          >
            {isPlaying ? (
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Información del track */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{track.title}</h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 truncate">
          {track.artist}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-zinc-500">
            {formatDuration(track.durationMs)}
          </span>
          {!hasPreview && (
            <span
              className="text-xs text-amber-600 dark:text-amber-500"
              title="Sin preview disponible"
            >
              ⚠️ Sin preview
            </span>
          )}
        </div>
      </div>

      {/* Botón para agregar */}
      <div className="shrink-0">
        <Button
          size="sm"
          variant={isAdded ? "secondary" : "primary"}
          onClick={() => onAdd(track)}
          disabled={isAdded}
        >
          {isAdded ? "✓ Agregado" : "+ Agregar"}
        </Button>
      </div>

      {/* Audio element (oculto) */}
      {hasPreview && (
        <audio ref={audioRef} src={track.previewUrl!} preload="none" />
      )}
    </div>
  );
}

// Componente para mostrar estado de carga
export function SpotifyTrackSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 animate-pulse">
      <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
      </div>
      <div className="w-20 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg shrink-0" />
    </div>
  );
}
