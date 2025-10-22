/**
 * Componente de búsqueda de Spotify
 * Permite buscar canciones, explorar categorías y agregar tracks a playlists
 */

import { useState } from "react";
import { useSpotify, MEDITATION_CATEGORIES } from "@/hooks/useSpotify";
import { SpotifyTrackCard, SpotifyTrackSkeleton } from "./SpotifyTrackCard";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { uid } from "@/lib/utils";
import type { Playlist, Track } from "@/types";
import type { SimplifiedTrack } from "@/types/spotify";

interface SpotifySearchProps {
  playlists: Playlist[];
  onAddTrack: (playlistId: string, track: Track) => void;
}

export function SpotifySearch({ playlists, onAddTrack }: SpotifySearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>("");
  const [addedTrackIds, setAddedTrackIds] = useState<Set<string>>(new Set());

  const {
    tracks,
    loading,
    error,
    hasCredentials,
    search,
    searchCategory,
    clearResults,
    clearError,
  } = useSpotify();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      search(searchQuery);
    }
  };

  const handleCategoryClick = (category: string) => {
    searchCategory(category);
  };

  const handleAddTrack = (spotifyTrack: SimplifiedTrack) => {
    if (!selectedPlaylistId) {
      alert("Por favor selecciona una playlist primero");
      return;
    }

    // Convertir SimplifiedTrack a Track local
    const track: Track = {
      id: uid("trk"),
      title: spotifyTrack.title,
      artist: spotifyTrack.artist,
      url: spotifyTrack.previewUrl || spotifyTrack.spotifyUrl,
      length: Math.floor(spotifyTrack.durationMs / 1000),
    };

    onAddTrack(selectedPlaylistId, track);
    setAddedTrackIds((prev) => new Set(prev).add(spotifyTrack.id));
  };

  // Verificar si un track ya fue agregado
  const isTrackAdded = (trackId: string) => addedTrackIds.has(trackId);

  // No mostrar si no hay credenciales configuradas
  if (!hasCredentials) {
    return (
      <div className="text-center py-8 space-y-3">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          ⚠️ Para usar la búsqueda de Spotify, necesitas configurar tus
          credenciales.
        </p>
        <details className="text-xs text-left max-w-md mx-auto">
          <summary className="cursor-pointer text-zinc-900 dark:text-zinc-100 font-medium">
            ¿Cómo obtener credenciales?
          </summary>
          <ol className="list-decimal list-inside space-y-1 mt-2 text-zinc-600 dark:text-zinc-400">
            <li>
              Ve a{" "}
              <a
                href="https://developer.spotify.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Spotify Dashboard
              </a>
            </li>
            <li>Crea una aplicación</li>
            <li>Copia el Client ID y Client Secret</li>
            <li>
              Agrégalos al archivo{" "}
              <code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded">
                .env
              </code>
            </li>
            <li>Reinicia el servidor de desarrollo</li>
          </ol>
        </details>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Selector de playlist */}
      <div className="space-y-2">
        <label htmlFor="playlist-select" className="text-sm font-medium">
          Agregar canciones a:
        </label>
        <select
          id="playlist-select"
          value={selectedPlaylistId}
          onChange={(e) => setSelectedPlaylistId(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          <option value="">Selecciona una playlist</option>
          {playlists.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.tracks.length} canciones)
            </option>
          ))}
        </select>
      </div>

      {/* Barra de búsqueda */}
      <div className="flex gap-2">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar canciones..."
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
        {tracks.length > 0 && (
          <Button variant="ghost" onClick={clearResults}>
            Limpiar
          </Button>
        )}
      </div>

      {/* Categorías predefinidas */}
      {tracks.length === 0 && !loading && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Explorar categorías:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {MEDITATION_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.query)}
                className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/70 transition-colors text-left"
                title={cat.description}
              >
                <div className="text-2xl mb-1">{cat.emoji}</div>
                <div className="text-sm font-medium">{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            <button
              onClick={clearError}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
              aria-label="Cerrar error"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Estado de carga */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <SpotifyTrackSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Resultados */}
      {!loading && tracks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">
            {tracks.length} resultado{tracks.length !== 1 ? "s" : ""}
          </h3>
          {tracks.map((track) => (
            <SpotifyTrackCard
              key={track.id}
              track={track}
              onAdd={handleAddTrack}
              isAdded={isTrackAdded(track.id)}
            />
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {!loading && searchQuery && tracks.length === 0 && !error && (
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 py-8">
          No se encontraron resultados para "{searchQuery}"
        </p>
      )}
    </div>
  );
}
