/**
 * Componente de tarjeta para reproducir tracks de Jamendo
 * Incluye reproductor de audio completo (no preview de 30s)
 */

import { useRef, useState } from "react";
import { Button } from "../ui/Button";
import { Play, Pause, Plus, AlertTriangle } from "lucide-react";
import type { SimplifiedJamendoTrack } from "@/types/jamendo";

/**
 * Formatea duración en segundos a mm:ss
 */
function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

interface JamendoTrackCardProps {
  track: SimplifiedJamendoTrack;
  onAddToPlaylist?: (track: SimplifiedJamendoTrack) => void;
  selectedPlaylistId?: string | null;
}

/**
 * Tarjeta de track de Jamendo con reproductor completo
 */
export function JamendoTrackCard({
  track,
  onAddToPlaylist,
  selectedPlaylistId,
}: JamendoTrackCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Pausar otros audios antes de reproducir
      const allAudios = document.querySelectorAll("audio");
      allAudios.forEach((audio) => {
        if (audio !== audioRef.current) {
          audio.pause();
        }
      });

      audioRef.current.play().catch((error) => {
        console.error("Error reproduciendo audio:", error);
        setHasError(true);
        setIsPlaying(false);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleError = () => {
    console.error("Error cargando audio de Jamendo");
    setHasError(true);
    setIsPlaying(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = Number(e.target.value);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleAddToPlaylist = () => {
    if (onAddToPlaylist) {
      onAddToPlaylist(track);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="group flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
      {/* Play Button & Album Cover */}
      <div className="relative flex-shrink-0">
        <button
          onClick={togglePlay}
          disabled={hasError}
          className={`relative h-12 w-12 rounded-md overflow-hidden transition-all ${
            hasError
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105 active:scale-95"
          }`}
        >
          <img
            src={track.imageUrl}
            alt={track.album}
            className="h-full w-full object-cover"
          />
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
              isPlaying || hasError
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {hasError ? (
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            ) : isPlaying ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white" />
            )}
          </div>
        </button>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{track.name}</div>
        <div className="text-xs opacity-60 truncate">
          {track.artist} · {track.album}
        </div>

        {/* Progress Bar */}
        {!hasError && (
          <div className="mt-1.5">
            <input
              type="range"
              min="0"
              max={duration || track.duration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-zinc-700 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-900 dark:[&::-webkit-slider-thumb]:bg-zinc-100 [&::-moz-range-thumb]:h-2.5 [&::-moz-range-thumb]:w-2.5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-zinc-900 dark:[&::-moz-range-thumb]:bg-zinc-100"
              style={{
                background: `linear-gradient(to right, currentColor 0%, currentColor ${progress}%, transparent ${progress}%, transparent 100%)`,
              }}
            />
          </div>
        )}

        {/* Duration & License */}
        <div className="mt-1 flex items-center gap-2 text-xs opacity-60">
          <span>{formatDuration(duration || track.duration)}</span>
          <span>·</span>
          {hasError ? (
            <span className="text-yellow-600 dark:text-yellow-500">
              ⚠️ Audio no disponible
            </span>
          ) : (
            <a
              href={track.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              🆓 CC en Jamendo
            </a>
          )}
        </div>
      </div>

      {/* Add Button */}
      {onAddToPlaylist && selectedPlaylistId && (
        <Button
          onClick={handleAddToPlaylist}
          variant="ghost"
          size="sm"
          className="flex-shrink-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={track.previewUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={handleError}
      />
    </div>
  );
}
