import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { useLocalStorage } from "./hooks/useLocalStorage";
import {
  LS_KEYS,
  TABS,
  MEDITATION_PROMPTS,
  DEFAULT_PLAYLISTS,
} from "./lib/constants";
import { clsx } from "./lib/utils";

// Componentes
import { Meditate } from "./components/meditate/Meditate";
import { Music } from "./components/music/Music";
import { Journal } from "./components/journal/Journal";
import { Mural } from "./components/mural/Mural";
import { Boredom } from "./components/boredom/Boredom";
import { Settings } from "./components/settings/Settings";

// Types
import type { Playlist, JournalEntry, MeditationSession } from "./types";

type TabId =
  | "meditar"
  | "musica"
  | "diario"
  | "mural"
  | "aburrimiento"
  | "ajustes";

/**
 * T.Five – Aplicación principal
 * Una aplicación para el descanso mental y emocional
 */
export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("meditar");
  const { theme, setTheme } = useTheme();

  // Estados persistidos en localStorage
  const [playlists, setPlaylists] = useLocalStorage<Playlist[]>(
    LS_KEYS.PLAYLISTS,
    DEFAULT_PLAYLISTS
  );
  const [journal, setJournal] = useLocalStorage<JournalEntry[]>(
    LS_KEYS.JOURNAL,
    []
  );
  const [sessions, setSessions] = useLocalStorage<MeditationSession[]>(
    LS_KEYS.SESSIONS,
    []
  );

  const handleResetAll = () => {
    if (
      confirm("¿Estás seguro de que quieres borrar todos los datos locales?")
    ) {
      localStorage.removeItem(LS_KEYS.PLAYLISTS);
      localStorage.removeItem(LS_KEYS.JOURNAL);
      localStorage.removeItem(LS_KEYS.SESSIONS);
      localStorage.removeItem(LS_KEYS.THEME);
      window.location.reload();
    }
  };

  const handleAddSession = (session: MeditationSession) => {
    setSessions((prev) => [session, ...prev]);
  };

  const handleAddJournalEntry = (entry: JournalEntry) => {
    setJournal((prev) => [entry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">T.Five</h1>
              <p className="text-sm opacity-70">Tómate cinco minutos</p>
            </div>

            <nav aria-label="Navegación principal">
              <ul className="flex gap-2 flex-wrap">
                {TABS.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id as TabId)}
                      className={clsx(
                        "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                        "focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-2",
                        activeTab === tab.id
                          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md"
                          : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      )}
                      aria-current={activeTab === tab.id ? "page" : undefined}
                    >
                      <span className="mr-1" aria-hidden="true">
                        {tab.icon}
                      </span>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === "meditar" && (
          <Meditate onFinish={handleAddSession} recent={sessions.slice(0, 5)} />
        )}
        {activeTab === "musica" && (
          <Music playlists={playlists} setPlaylists={setPlaylists} />
        )}
        {activeTab === "diario" && (
          <Journal
            prompts={MEDITATION_PROMPTS}
            journal={journal}
            setJournal={setJournal}
          />
        )}
        {activeTab === "mural" && (
          <Mural sessions={sessions} journal={journal} />
        )}
        {activeTab === "aburrimiento" && (
          <Boredom onSaveNote={handleAddJournalEntry} />
        )}
        {activeTab === "ajustes" && (
          <Settings
            theme={theme}
            setTheme={setTheme}
            onReset={handleResetAll}
            data={{ playlists, journal, sessions }}
            setData={({ playlists: p, journal: j, sessions: s, theme: t }) => {
              if (p) setPlaylists(p);
              if (j) setJournal(j);
              if (s) setSessions(s);
              if (t) setTheme(t);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 pb-12 pt-6 text-center">
        <p className="text-xs opacity-60">
          Demo académico · Sin fines comerciales · Inspirado en música,
          meditación e introspección
        </p>
        <p className="text-xs opacity-50 mt-2">
          "Detente sin culpa, escucha sin propósito, descansa sin necesidad de
          justificarlo"
        </p>
      </footer>
    </div>
  );
}
