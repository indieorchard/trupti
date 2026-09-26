'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { FontScale } from '@/types';

const FONT_SCALES: FontScale[] = [
  { label: 'अ-', value: 0.9 },
  { label: 'अ', value: 1.0 },
  { label: 'अ+', value: 1.15 },
  { label: 'अ++', value: 1.3 },
];

interface FontScaleContextType {
  scale: number;
  scaleIndex: number;
  scales: FontScale[];
  increaseFont: () => void;
  decreaseFont: () => void;
  setScale: (index: number) => void;
}

const FontScaleContext = createContext<FontScaleContextType | undefined>(undefined);

export function FontScaleProvider({ children }: { children: ReactNode }) {
  const [scaleIndex, setScaleIndex] = useState(1); // Default: 1.0

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--font-scale',
      FONT_SCALES[scaleIndex].value.toString()
    );
  }, [scaleIndex]);

  const increaseFont = useCallback(() => {
    setScaleIndex(prev => Math.min(prev + 1, FONT_SCALES.length - 1));
  }, []);

  const decreaseFont = useCallback(() => {
    setScaleIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const setScale = useCallback((index: number) => {
    setScaleIndex(Math.max(0, Math.min(index, FONT_SCALES.length - 1)));
  }, []);

  return (
    <FontScaleContext.Provider
      value={{
        scale: FONT_SCALES[scaleIndex].value,
        scaleIndex,
        scales: FONT_SCALES,
        increaseFont,
        decreaseFont,
        setScale,
      }}
    >
      {children}
    </FontScaleContext.Provider>
  );
}

export function useFontScale() {
  const context = useContext(FontScaleContext);
  if (context === undefined) {
    throw new Error('useFontScale must be used within a FontScaleProvider');
  }
  return context;
}
