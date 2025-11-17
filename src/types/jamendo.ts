/**
 * Tipos TypeScript para Jamendo API
 * Documentación: https://developer.jamendo.com/v3.0/docs
 */

export interface JamendoTrack {
  id: string;
  name: string;
  duration: number; // segundos
  artist_id: string;
  artist_name: string;
  artist_idstr: string;
  album_name: string;
  album_id: string;
  album_image: string;
  position: number;
  releasedate: string;
  audio: string; // URL de streaming
  audiodownload: string; // URL de descarga directa
  audiodownload_allowed: boolean; // Permitido descargar/reproducir
  prourl: string;
  shorturl: string;
  shareurl: string;
  waveform: string;
  license_ccurl: string;
  image: string;
}

export interface JamendoAlbum {
  id: string;
  name: string;
  releasedate: string;
  artist_id: string;
  artist_name: string;
  artist_idstr: string;
  image: string;
  zip: string;
  shorturl: string;
  shareurl: string;
  zip_allowed: boolean;
}

export interface JamendoArtist {
  id: string;
  name: string;
  website: string;
  joindate: string;
  image: string;
  shorturl: string;
  shareurl: string;
}

export interface JamendoPlaylist {
  id: string;
  name: string;
  creationdate: string;
  user_id: string;
  user_name: string;
  zip: string;
  tracks?: JamendoTrack[];
}

export interface JamendoRadio {
  id: string;
  name: string;
  idstr: string;
  image: string;
  stream: string;
  streamurl: string;
}

export interface SimplifiedJamendoTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: number;
  previewUrl: string;
  imageUrl: string;
  externalUrl: string;
  license: string;
}

export interface MusicCategory {
  id: string;
  name: string;
  emoji: string;
  tags: string; // Tags de Jamendo para búsqueda
  description: string;
}

export interface JamendoSearchParams {
  query?: string;
  tags?: string;
  limit?: number;
  offset?: number;
  order?: 'popularity_total' | 'releasedate_desc' | 'name_asc';
  include?: string;
  audioformat?: 'mp31' | 'mp32' | 'ogg' | 'flac';
}

export interface JamendoApiResponse<T> {
  headers: {
    status: string;
    code: number;
    error_message: string;
    warnings: string;
    results_count: number;
  };
  results: T[];
}
