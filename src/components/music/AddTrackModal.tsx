import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { uid } from "../../lib/utils";
import { DUMMY_TRACKS } from "../../lib/constants";
import type { Track } from "../../types";

interface AddTrackModalProps {
  onClose: () => void;
  onAdd: (track: Track) => void;
}

/**
 * Modal para añadir pistas (dummy o desde biblioteca)
 */
export function AddTrackModal({ onClose, onAdd }: AddTrackModalProps) {
  const [mode, setMode] = useState<"library" | "custom">("library");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [minutes, setMinutes] = useState(3);

  const handleAddCustom = () => {
    if (!title.trim()) return;

    const track: Track = {
      id: uid("trk"),
      title: title.trim(),
      artist: artist.trim(),
      url: "",
      length: minutes * 60,
      genre: genre.trim() || undefined,
    };

    onAdd(track);
  };

  const handleAddFromLibrary = (track: Track) => {
    onAdd({ ...track, id: uid("trk") });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Añadir pista</h2>
            <Button onClick={onClose} variant="ghost" size="sm">
              ✕
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setMode("library")}
              variant={mode === "library" ? "primary" : "secondary"}
              size="sm"
            >
              Biblioteca
            </Button>
            <Button
              onClick={() => setMode("custom")}
              variant={mode === "custom" ? "primary" : "secondary"}
              size="sm"
            >
              Personalizada
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {mode === "library" ? (
            <div className="space-y-2">
              <p className="text-sm opacity-70 mb-4">
                Selecciona canciones de la biblioteca dummy:
              </p>
              {DUMMY_TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => handleAddFromLibrary(track)}
                  className="w-full text-left p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                >
                  <div className="font-medium text-sm">{track.title}</div>
                  <div className="text-xs opacity-60">
                    {track.artist}
                    {track.length
                      ? ` · ${Math.round(track.length / 60)} min`
                      : ""}
                    {track.genre && ` · ${track.genre}`}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm opacity-70">
                Crea una pista personalizada:
              </p>
              <Input
                label="Título *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nombre de la canción"
              />
              <Input
                label="Artista"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Nombre del artista"
              />
              <Input
                label="Género"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Ej: Jazz, Clásica, Ambient"
              />
              <div>
                <label className="block text-sm font-medium mb-2">
                  Duración: {minutes} min
                </label>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={minutes}
                  onChange={(e) => setMinutes(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <Button onClick={handleAddCustom} disabled={!title.trim()}>
                Añadir pista
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
