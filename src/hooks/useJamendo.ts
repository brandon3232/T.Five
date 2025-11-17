/**
 * Custom Hook para gestionar búsqueda y reproducción de música de Jamendo
 */

import { useState } from "react";
import { searchTracks, searchByCategory } from "@/lib/jamendo";
import type { SimplifiedJamendoTrack, MusicCategory } from "@/types/jamendo";

/**
 * Categorías de música ideales para meditación y relajación
 * Usando tags oficiales de Jamendo
 */
export const MEDITATION_CATEGORIES: MusicCategory[] = [
  {
    id: "meditation",
    name: "Meditación",
    emoji: "🧘",
    tags: "meditation",
    description: "Música especial para meditación profunda",
  },
  {
    id: "relaxation",
    name: "Relajación",
    emoji: "😌",
    tags: "relaxation",
    description: "Sonidos relajantes para desconectar",
  },
  {
    id: "ambient",
    name: "Ambiental",
    emoji: "🌌",
    tags: "ambient",
    description: "Música ambiental y atmosférica",
  },
  {
    id: "nature",
    name: "Naturaleza",
    emoji: "🌿",
    tags: "nature",
    description: "Sonidos de la naturaleza",
  },
  {
    id: "yoga",
    name: "Yoga",
    emoji: "🕉️",
    tags: "yoga",
    description: "Música perfecta para practicar yoga",
  },
  {
    id: "sleep",
    name: "Dormir",
    emoji: "😴",
    tags: "sleep",
    description: "Ayuda a conciliar el sueño",
  },
  {
    id: "instrumental",
    name: "Instrumental",
    emoji: "🎹",
    tags: "instrumental",
    description: "Música instrumental sin voces",
  },
  {
    id: "piano",
    name: "Piano",
    emoji: "🎹",
    tags: "piano",
    description: "Melodías suaves de piano",
  },
];

export function useJamendo() {
  const [tracks, setTracks] = useState<SimplifiedJamendoTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca tracks por query
   */
  const search = async (query: string, limit: number = 20) => {
    if (!query.trim()) {
      setTracks([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchTracks(query.trim(), limit);
      setTracks(results);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error buscando música";
      setError(message);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Busca tracks por categoría
   */
  const searchCategory = async (categoryId: string, limit: number = 20) => {
    const category = MEDITATION_CATEGORIES.find((c) => c.id === categoryId);
    if (!category) {
      setError("Categoría no encontrada");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const results = await searchByCategory(category.tags, limit);
      setTracks(results);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Error buscando categoría";
      setError(message);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpia los resultados
   */
  const clearResults = () => {
    setTracks([]);
    setError(null);
  };

  return {
    tracks,
    loading,
    error,
    search,
    searchCategory,
    clearResults,
  };
}
