/**
 * Hook personalizado para interactuar con Spotify API
 * Maneja estados de loading, error y resultados
 */

import { useState, useCallback } from "react";
import {
  searchTracks,
  searchByCategory,
  getRecommendations,
  hasSpotifyCredentials,
} from "@/lib/spotify";
import type { SimplifiedTrack, MusicCategory } from "@/types/spotify";

interface UseSpotifyReturn {
  tracks: SimplifiedTrack[];
  loading: boolean;
  error: string | null;
  hasCredentials: boolean;
  search: (query: string) => Promise<void>;
  searchCategory: (category: string) => Promise<void>;
  getRelated: (trackId: string) => Promise<void>;
  clearResults: () => void;
  clearError: () => void;
}

export function useSpotify(): UseSpotifyReturn {
  const [tracks, setTracks] = useState<SimplifiedTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasCredentials = hasSpotifyCredentials();

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setTracks([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchTracks(query, 20);
      setTracks(results);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al buscar música";
      setError(message);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchCategory = useCallback(async (category: string) => {
    setLoading(true);
    setError(null);

    try {
      const results = await searchByCategory(category, 20);
      setTracks(results);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al buscar categoría";
      setError(message);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRelated = useCallback(async (trackId: string) => {
    setLoading(true);
    setError(null);

    try {
      const results = await getRecommendations(trackId, 15);
      setTracks(results);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al obtener recomendaciones";
      setError(message);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setTracks([]);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    tracks,
    loading,
    error,
    hasCredentials,
    search,
    searchCategory,
    getRelated,
    clearResults,
    clearError,
  };
}

// Categorías predefinidas para meditación y relajación
export const MEDITATION_CATEGORIES: MusicCategory[] = [
  {
    id: "meditation",
    name: "Meditación",
    query: "meditation",
    description: "Música suave para meditar",
    emoji: "🧘",
  },
  {
    id: "ambient",
    name: "Ambiente",
    query: "ambient",
    description: "Paisajes sonoros atmosféricos",
    emoji: "🌌",
  },
  {
    id: "piano",
    name: "Piano",
    query: "piano",
    description: "Piano suave e instrumental",
    emoji: "🎹",
  },
  {
    id: "nature",
    name: "Naturaleza",
    query: "nature",
    description: "Sonidos de la naturaleza",
    emoji: "🌿",
  },
  {
    id: "sleep",
    name: "Dormir",
    query: "sleep",
    description: "Música para descansar",
    emoji: "😴",
  },
  {
    id: "yoga",
    name: "Yoga",
    query: "yoga",
    description: "Música para práctica de yoga",
    emoji: "🕉️",
  },
  {
    id: "classical",
    name: "Clásica",
    query: "classical",
    description: "Música clásica relajante",
    emoji: "🎻",
  },
  {
    id: "lofi",
    name: "Lo-Fi",
    query: "lofi",
    description: "Beats relajados instrumentales",
    emoji: "🎧",
  },
];
