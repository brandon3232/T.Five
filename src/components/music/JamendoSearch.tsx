/**
 * Componente de búsqueda de música en Jamendo
 * Permite buscar por texto y explorar categorías de meditación
 */

import { useState } from "react";
import { Search } from "lucide-react";
import { useJamendo, MEDITATION_CATEGORIES } from "@/hooks/useJamendo";
import { JamendoTrackCard } from "./JamendoTrackCard";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import type { SimplifiedJamendoTrack } from "@/types/jamendo";
import type { Track } from "@/types";

interface JamendoSearchProps {
  selectedPlaylistId: string | null;
  onAddTrack: (track: Track) => void;
}

export function JamendoSearch({
  selectedPlaylistId,
  onAddTrack,
}: JamendoSearchProps) {
  const [query, setQuery] = useState("");
  const { tracks, loading, error, search, searchCategory, clearResults } =
    useJamendo();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      search(query.trim());
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    clearResults();
    searchCategory(categoryId);
  };

  const handleAddToPlaylist = (jamendoTrack: SimplifiedJamendoTrack) => {
    if (!selectedPlaylistId) return;

    // Convertir SimplifiedJamendoTrack a Track
    const track: Track = {
      id: jamendoTrack.id,
      title: jamendoTrack.name,
      artist: jamendoTrack.artist,
      addedAt: new Date().toISOString(),
    };

    onAddTrack(track);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar música de meditación..."
            className="pl-10"
          />
        </div>
        <Button type="submit" disabled={loading || !query.trim()}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </form>

      {/* Categories */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-700">
          Explorar por categoría
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {MEDITATION_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              variant="secondary"
              className="justify-start text-left"
              disabled={loading}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Info Text */}
      {selectedPlaylistId && (
        <p className="text-sm opacity-60">
          💡 Haz clic en el botón <span className="font-semibold">+</span> para
          agregar una canción a tu playlist
        </p>
      )}

      {!selectedPlaylistId && tracks.length > 0 && (
        <p className="rounded-lg border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 p-3 text-sm text-amber-900 dark:text-amber-200 opacity-90">
          ⚠️ Selecciona una playlist primero para poder agregar canciones
        </p>
      )}

      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/20 p-4 text-sm text-red-900 dark:text-red-200">
          <p className="font-semibold">Error:</p>
          <p className="opacity-80">{error}</p>
        </div>
      )}

      {/* Results */}
      {tracks.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            {tracks.length} canciones encontradas
          </h3>
          <div className="space-y-3">
            {tracks.map((track) => (
              <JamendoTrackCard
                key={track.id}
                track={track}
                onAddToPlaylist={handleAddToPlaylist}
                selectedPlaylistId={selectedPlaylistId}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && tracks.length === 0 && !error && (
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            Busca música de meditación
          </h3>
          <p className="text-sm text-gray-600">
            Usa el buscador o explora las categorías para encontrar música
            relajante
          </p>
        </div>
      )}
    </div>
  );
}
