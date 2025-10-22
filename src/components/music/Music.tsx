import { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { PlaylistCard } from "./PlaylistCard";
import { AddTrackModal } from "./AddTrackModal";
import { SpotifySearch } from "./SpotifySearch";
import { uid } from "../../lib/utils";
import type { Playlist, Track } from "../../types";

interface MusicProps {
  playlists: Playlist[];
  setPlaylists: (
    playlists: Playlist[] | ((prev: Playlist[]) => Playlist[])
  ) => void;
}

/**
 * Componente principal de Música
 * Incluye integración con Spotify API para buscar canciones
 */
export function Music({ playlists, setPlaylists }: MusicProps) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null
  );
  const [isAddTrackModalOpen, setIsAddTrackModalOpen] = useState(false);
  const [showSpotifySearch, setShowSpotifySearch] = useState(false);

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;

    const newPlaylist: Playlist = {
      id: uid("pl"),
      name: newPlaylistName.trim(),
      description: "",
      tracks: [],
      createdAt: new Date().toISOString(),
    };

    setPlaylists((prev) => [...prev, newPlaylist]);
    setNewPlaylistName("");
  };

  const handleAddTrack = (playlistId: string, track: Track) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId ? { ...p, tracks: [...p.tracks, track] } : p
      )
    );
  };

  const handleRemoveTrack = (playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId
          ? { ...p, tracks: p.tracks.filter((t) => t.id !== trackId) }
          : p
      )
    );
  };

  const handleDeletePlaylist = (playlistId: string) => {
    if (confirm("¿Eliminar esta playlist?")) {
      setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Crear nueva playlist */}
      <Card title="Crear nueva playlist">
        <div className="flex gap-3 flex-col sm:flex-row">
          <Input
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="Nombre de tu refugio sonoro"
            onKeyDown={(e) => e.key === "Enter" && handleCreatePlaylist()}
            className="flex-1"
          />
          <Button onClick={handleCreatePlaylist}>Crear</Button>
        </div>
      </Card>

      {/* Búsqueda de Spotify */}
      <Card
        title="Buscar música en Spotify"
        actions={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSpotifySearch(!showSpotifySearch)}
          >
            {showSpotifySearch ? "Ocultar" : "Mostrar"}
          </Button>
        }
      >
        {showSpotifySearch ? (
          <SpotifySearch playlists={playlists} onAddTrack={handleAddTrack} />
        ) : (
          <p className="text-sm text-center text-zinc-600 dark:text-zinc-400 py-4">
            Busca canciones relajantes, música para meditar y más.
            <br />
            <button
              onClick={() => setShowSpotifySearch(true)}
              className="text-zinc-900 dark:text-zinc-100 underline mt-2"
            >
              Abrir buscador
            </button>
          </p>
        )}
      </Card>

      {/* Playlists */}
      <div className="grid md:grid-cols-2 gap-6">
        {playlists.length === 0 && (
          <Card>
            <p className="text-center text-sm opacity-70 py-8">
              Aún no tienes playlists.
              <br />
              Crea una arriba para comenzar tu colección.
            </p>
          </Card>
        )}
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            playlist={playlist}
            onAddTrack={() => {
              setSelectedPlaylistId(playlist.id);
              setIsAddTrackModalOpen(true);
            }}
            onRemoveTrack={(trackId: string) =>
              handleRemoveTrack(playlist.id, trackId)
            }
            onDelete={() => handleDeletePlaylist(playlist.id)}
          />
        ))}
      </div>

      {/* Modal para agregar tracks manualmente */}
      {isAddTrackModalOpen && selectedPlaylistId && (
        <AddTrackModal
          onClose={() => {
            setIsAddTrackModalOpen(false);
            setSelectedPlaylistId(null);
          }}
          onAdd={(track: Track) => {
            handleAddTrack(selectedPlaylistId, track);
            setIsAddTrackModalOpen(false);
            setSelectedPlaylistId(null);
          }}
        />
      )}
    </div>
  );
}
