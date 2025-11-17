/**
 * Servicio de integración con Jamendo API
 * Jamendo ofrece música libre de derechos perfecta para aplicaciones de meditación
 * 
 * Documentación oficial: https://developer.jamendo.com/v3.0/docs
 * Límite gratuito: 35,000 requests/mes
 * 
 * Características:
 * - Streaming completo (no solo previews de 30s como Spotify)
 * - Música Creative Commons
 * - Ideal para meditación, relajación, naturaleza
 * - Solo requiere Client ID (no OAuth)
 */

import type {
  JamendoTrack,
  JamendoRadio,
  SimplifiedJamendoTrack,
  JamendoApiResponse,
} from "@/types/jamendo";

const BASE_URL = "https://api.jamendo.com/v3.0";
const CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID;

if (!CLIENT_ID) {
  console.warn(
    "⚠️ VITE_JAMENDO_CLIENT_ID no está configurado. La API de Jamendo no funcionará."
  );
}

/**
 * Obtiene el Client ID configurado
 */
function getClientId(): string {
  if (!CLIENT_ID) {
    throw new Error("Jamendo Client ID no configurado. Obtén uno en https://devportal.jamendo.com/");
  }
  return CLIENT_ID;
}

/**
 * Busca tracks por nombre en Jamendo
 */
export async function searchTracks(
  query: string,
  limit: number = 20
): Promise<SimplifiedJamendoTrack[]> {
  console.log('🎵 Jamendo API: Buscando tracks...');
  
  const searchParams = new URLSearchParams({
    client_id: getClientId(),
    format: 'json',
    limit: String(limit),
    namesearch: query,
    vocalinstrumental: 'instrumental',
    include: 'musicinfo',
    audioformat: 'mp32',
    audiodlformat: 'mp32',
    imagesize: '300',
  });

  const url = `${BASE_URL}/tracks?${searchParams}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error en Jamendo API: ${response.statusText}`);
  }

  const data = await response.json() as JamendoApiResponse<JamendoTrack>;
  
  if (data.headers.status !== 'success') {
    throw new Error(`Jamendo API Error: ${data.headers.error_message}`);
  }

  const tracksWithAudio = data.results.filter(track => 
    track.audiodownload && 
    track.audiodownload.trim() !== '' &&
    track.audiodownload_allowed !== false
  );
  
  console.log(`🎧 ${tracksWithAudio.length} tracks con audio disponible de ${data.results.length} totales`);
  
  return tracksWithAudio.map(simplifyTrack);
}

/**
 * Busca tracks por categoría/tags
 */
export async function searchByCategory(
  tags: string,
  limit: number = 20
): Promise<SimplifiedJamendoTrack[]> {
  const searchParams = new URLSearchParams({
    client_id: getClientId(),
    format: 'json',
    limit: String(limit),
    fuzzytags: tags,
    vocalinstrumental: 'instrumental',
    include: 'musicinfo',
    audioformat: 'mp32',
    audiodlformat: 'mp32',
    imagesize: '300',
    order: 'popularity_month',
  });

  const url = `${BASE_URL}/tracks?${searchParams}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error en Jamendo API: ${response.statusText}`);
  }

  const data = await response.json() as JamendoApiResponse<JamendoTrack>;
  
  if (data.headers.status !== 'success') {
    throw new Error(`Jamendo API Error: ${data.headers.error_message}`);
  }

  const tracksWithAudio = data.results.filter(track => 
    track.audiodownload && 
    track.audiodownload.trim() !== '' &&
    track.audiodownload_allowed !== false
  );

  console.log(`🎧 ${tracksWithAudio.length} tracks encontrados para "${tags}"`);

  return tracksWithAudio.map(simplifyTrack);
}

/**
 * Obtiene un track por ID
 */
export async function getTrackById(trackId: string): Promise<SimplifiedJamendoTrack | null> {
  const searchParams = new URLSearchParams({
    client_id: getClientId(),
    format: 'json',
    id: trackId,
    include: 'musicinfo',
    audioformat: 'mp32',
    audiodlformat: 'mp32',
    imagesize: '300',
  });

  const url = `${BASE_URL}/tracks?${searchParams}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error en Jamendo API: ${response.statusText}`);
  }

  const data = await response.json() as JamendoApiResponse<JamendoTrack>;
  
  if (data.headers.status !== 'success' || data.results.length === 0) {
    return null;
  }

  return simplifyTrack(data.results[0]);
}

/**
 * Obtiene tracks de un álbum
 */
export async function getAlbumTracks(albumId: string): Promise<SimplifiedJamendoTrack[]> {
  const searchParams = new URLSearchParams({
    client_id: getClientId(),
    format: 'json',
    album_id: albumId,
    include: 'musicinfo',
    audioformat: 'mp32',
    audiodlformat: 'mp32',
    imagesize: '300',
  });

  const url = `${BASE_URL}/tracks?${searchParams}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error en Jamendo API: ${response.statusText}`);
  }

  const data = await response.json() as JamendoApiResponse<JamendoTrack>;
  
  if (data.headers.status !== 'success') {
    throw new Error(`Jamendo API Error: ${data.headers.error_message}`);
  }

  const tracksWithAudio = data.results.filter(track => 
    track.audiodownload && 
    track.audiodownload.trim() !== '' &&
    track.audiodownload_allowed !== false
  );

  return tracksWithAudio.map(simplifyTrack);
}

/**
 * Obtiene radios temáticas de Jamendo
 */
export async function getRadios(): Promise<JamendoRadio[]> {
  const searchParams = new URLSearchParams({
    client_id: getClientId(),
    format: 'json',
    limit: '20',
  });

  const url = `${BASE_URL}/radios?${searchParams}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error en Jamendo API: ${response.statusText}`);
  }

  const data = await response.json() as JamendoApiResponse<JamendoRadio>;
  
  if (data.headers.status !== 'success') {
    throw new Error(`Jamendo API Error: ${data.headers.error_message}`);
  }

  return data.results;
}

/**
 * Convierte un JamendoTrack completo a SimplifiedJamendoTrack
 */
function simplifyTrack(track: JamendoTrack): SimplifiedJamendoTrack {
  return {
    id: String(track.id),
    name: track.name,
    artist: track.artist_name,
    album: track.album_name || 'Single',
    duration: track.duration,
    previewUrl: track.audiodownload || track.audio,
    imageUrl: track.image,
    externalUrl: track.shareurl,
    license: track.license_ccurl || 'https://creativecommons.org/licenses/',
  };
}
