'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Language } from '@/types';

interface LanguageContextType {
  lang: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (hi: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('hi');

  const toggleLanguage = useCallback(() => {
    setLang(prev => prev === 'hi' ? 'en' : 'hi');
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLang(newLang);
  }, []);

  const t = useCallback((hi: string, en: string) => {
    return lang === 'hi' ? hi : en;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
