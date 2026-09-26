'use client';

import { useState, useEffect, useCallback } from 'react';

export type FavoriteType = 
  | 'deity' 
  | 'temple' 
  | 'chant' 
  | 'gita' 
  | 'veda_purana' 
  | 'vrata'
  | 'aarti'
  | 'chalisa'
  | 'stotra'
  | 'sukta'
  | 'veda'
  | 'purana'
  | 'upanishad'
  | 'vrat';

export interface FavoriteItem {
  id: string;
  title_hi: string;
  title_en: string;
  subtitle?: string;
  subtitle_hi?: string;
  subtitle_en?: string;
  type: FavoriteType;
  url: string;
  emoji?: string;
  image_url?: string;
  badge?: string;
  addedAt: number;
}

const STORAGE_KEY = 'trupti_starred_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  const reloadFavorites = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        setFavorites([]);
      }
    } catch {
      setFavorites([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    reloadFavorites();

    const handleStorageChange = () => reloadFavorites();
    window.addEventListener('trupti-favorites-changed', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('trupti-favorites-changed', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [reloadFavorites]);

  const isFavorite = useCallback(
    (id: string) => favorites.some(item => item.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (item: Omit<FavoriteItem, 'addedAt'>) => {
      if (typeof window === 'undefined') return;
      try {
        const current = [...favorites];
        const index = current.findIndex(f => f.id === item.id);

        if (index >= 0) {
          current.splice(index, 1);
        } else {
          current.unshift({ ...item, addedAt: Date.now() });
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
        setFavorites(current);

        // Notify other components/tabs
        window.dispatchEvent(new Event('trupti-favorites-changed'));

        // Gentle haptic feedback if available on mobile devices
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(30);
        }
      } catch (e) {
        console.error('Failed to toggle favorite', e);
      }
    },
    [favorites]
  );

  const removeFavorite = useCallback(
    (id: string) => {
      if (typeof window === 'undefined') return;
      try {
        const updated = favorites.filter(f => f.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setFavorites(updated);
        window.dispatchEvent(new Event('trupti-favorites-changed'));
      } catch (e) {
        console.error('Failed to remove favorite', e);
      }
    },
    [favorites]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    favoritesCount: favorites.length,
    isLoaded,
  };
}
