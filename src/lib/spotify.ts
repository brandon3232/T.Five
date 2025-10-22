/**
 * Spotify API Service
 * Implementa Client Credentials Flow para autenticación
 * Documentación: https://developer.spotify.com/documentation/web-api
 */

import type {
  SpotifyAuthResponse,
  SpotifySearchResponse,
  SpotifyTrack,
  SpotifyArtist,
  SimplifiedTrack,
} from "@/types/spotify";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const API_BASE = "https://api.spotify.com/v1";

// Cache del token en memoria
let cachedToken: string | null = null;
let tokenExpirationTime: number | null = null;

/**
 * Obtiene un access token usando Client Credentials Flow
 */
async function getAccessToken(): Promise<string> {
  // Retornar token en cache si aún es válido
  if (cachedToken && tokenExpirationTime && Date.now() < tokenExpirationTime) {
    return cachedToken;
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      "Credenciales de Spotify no configuradas. Verifica tu archivo .env"
    );
  }

  const auth = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error(`Error de autenticación: ${response.status}`);
    }

    const data: SpotifyAuthResponse = await response.json();
    
    cachedToken = data.access_token;
    // Renovar 1 minuto antes de que expire
    tokenExpirationTime = Date.now() + (data.expires_in - 60) * 1000;

    return data.access_token;
  } catch (error) {
    console.error("Error obteniendo token de Spotify:", error);
    throw new Error(
      "No se pudo conectar con Spotify. Verifica tus credenciales."
    );
  }
}

/**
 * Realiza una petición autenticada a la API de Spotify
 */
async function spotifyRequest<T>(endpoint: string): Promise<T> {
  const token = await getAccessToken();

  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Error de API: ${response.status}`
    );
  }

  return response.json();
}

/**
 * Convierte un SpotifyTrack a SimplifiedTrack
 */
function simplifyTrack(track: SpotifyTrack): SimplifiedTrack {
  return {
    id: track.id,
    title: track.name,
    artist: track.artists.map((a: SpotifyArtist) => a.name).join(", "),
    album: track.album.name,
    imageUrl: track.album.images[0]?.url || "",
    previewUrl: track.preview_url,
    spotifyUrl: track.external_urls.spotify,
    durationMs: track.duration_ms,
  };
}

/**
 * Busca tracks en Spotify
 * @param query - Término de búsqueda
 * @param limit - Número de resultados (max 50)
 */
export async function searchTracks(
  query: string,
  limit = 20
): Promise<SimplifiedTrack[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    const encodedQuery = encodeURIComponent(query);
    const data = await spotifyRequest<SpotifySearchResponse>(
      `/search?q=${encodedQuery}&type=track&limit=${limit}&market=US`
    );

    return data.tracks.items.map(simplifyTrack);
  } catch (error) {
    console.error("Error buscando tracks:", error);
    throw error;
  }
}

/**
 * Busca tracks por categoría con filtros adicionales
 * @param category - Categoría musical (meditation, ambient, etc.)
 * @param limit - Número de resultados
 */
export async function searchByCategory(
  category: string,
  limit = 20
): Promise<SimplifiedTrack[]> {
  // Añadir filtros para obtener música apropiada
  const queries: Record<string, string> = {
    meditation: "meditation ambient calm peaceful",
    ambient: "ambient instrumental atmospheric soundscape",
    piano: "piano solo peaceful instrumental",
    nature: "nature sounds rain forest ocean white noise",
    sleep: "sleep music relaxing deep rest",
    yoga: "yoga music meditation zen",
    classical: "classical music peaceful calm",
    lofi: "lofi chill beats instrumental",
  };

  const searchQuery = queries[category] || category;
  return searchTracks(searchQuery, limit);
}

/**
 * Obtiene tracks recomendados basados en un track semilla
 * @param trackId - ID del track
 * @param limit - Número de recomendaciones
 */
export async function getRecommendations(
  trackId: string,
  limit = 10
): Promise<SimplifiedTrack[]> {
  try {
    const data = await spotifyRequest<{ tracks: SpotifyTrack[] }>(
      `/recommendations?seed_tracks=${trackId}&limit=${limit}&target_valence=0.3&target_energy=0.3`
    );

    return data.tracks.map(simplifyTrack);
  } catch (error) {
    console.error("Error obteniendo recomendaciones:", error);
    throw error;
  }
}

/**
 * Obtiene información de un track específico
 */
export async function getTrack(trackId: string): Promise<SimplifiedTrack> {
  try {
    const data = await spotifyRequest<SpotifyTrack>(`/tracks/${trackId}`);
    return simplifyTrack(data);
  } catch (error) {
    console.error("Error obteniendo track:", error);
    throw error;
  }
}

/**
 * Valida que las credenciales estén configuradas
 */
export function hasSpotifyCredentials(): boolean {
  return Boolean(CLIENT_ID && CLIENT_SECRET);
}
