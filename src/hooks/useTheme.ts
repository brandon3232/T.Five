import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { LS_KEYS } from '../lib/constants';
import type { Theme } from '../types';

/**
 * Hook para manejar el tema de la aplicación
 */
export function useTheme() {
  const prefersDark =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [theme, setTheme] = useLocalStorage<Theme>(
    LS_KEYS.THEME,
    prefersDark ? 'dark' : 'light'
  );

  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'system') {
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, prefersDark]);

  return { theme, setTheme };
}
