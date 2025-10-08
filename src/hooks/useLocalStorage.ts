import { useState, useEffect } from 'react';

/**
 * Hook para sincronizar estado con localStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T)
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item) as T;
      }
      return typeof initialValue === 'function'
        ? (initialValue as () => T)()
        : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return typeof initialValue === 'function'
        ? (initialValue as () => T)()
        : initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
