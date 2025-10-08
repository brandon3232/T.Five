/**
 * Tipos centrales de T.Five
 */

export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  length: number; // en segundos
  genre?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  tracks: Track[];
  createdAt: string;
}

export interface JournalEntry {
  id: string;
  type: 'journal';
  createdAt: string;
  prompt?: string;
  text: string;
  tags?: string[];
}

export interface MeditationSession {
  id: string;
  type: 'meditation';
  minutes: number;
  endedAt: string;
  note: string;
  meditationType?: string;
}

export interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // en minutos
  category: 'respiracion' | 'bodyscan' | 'mindfulness' | 'wuwei' | 'loving-kindness';
  guide?: string;
}

export type TimelineItem = MeditationSession | JournalEntry;

export type Theme = 'light' | 'dark' | 'system';

export interface AppData {
  playlists: Playlist[];
  journal: JournalEntry[];
  sessions: MeditationSession[];
  theme: Theme;
}
