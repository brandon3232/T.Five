import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { formatDuration } from "../../lib/utils";
import type { Playlist } from "../../types";

interface PlaylistCardProps {
  playlist: Playlist;
  onAddTrack: () => void;
  onRemoveTrack: (trackId: string) => void;
  onDelete: () => void;
}

/**
 * Tarjeta de playlist individual
 */
export function PlaylistCard({
  playlist,
  onAddTrack,
  onRemoveTrack,
  onDelete,
}: PlaylistCardProps) {
  const totalDuration = playlist.tracks.reduce(
    (acc, track) => acc + (track.length || 0),
    0
  );

  return (
    <Card
      title={playlist.name}
      actions={
        <>
          <Button onClick={onAddTrack} variant="ghost" size="sm">
            + Añadir
          </Button>
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="text-red-600"
          >
            Eliminar
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {playlist.description && (
          <p className="text-sm opacity-70">{playlist.description}</p>
        )}

        <div className="text-xs opacity-60">
          {playlist.tracks.length}{" "}
          {playlist.tracks.length === 1 ? "pista" : "pistas"} ·{" "}
          {formatDuration(totalDuration)}
        </div>

        <ul className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {playlist.tracks.length === 0 && (
            <li className="text-sm opacity-70 text-center py-8">
              Playlist vacía. Añade pistas para comenzar.
            </li>
          )}
          {playlist.tracks.map((track, index) => (
            <li
              key={track.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <div className="text-sm opacity-60 w-6 text-right">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">
                  {track.title}
                </div>
                <div className="text-xs opacity-60 truncate">
                  {track.artist || "Artista desconocido"} ·{" "}
                  {track.length !== undefined
                    ? formatDuration(track.length)
                    : "---"}
                  {track.genre && ` · ${track.genre}`}
                </div>
              </div>
              <Button
                onClick={() => onRemoveTrack(track.id)}
                variant="ghost"
                size="sm"
                className="shrink-0"
              >
                ✕
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
