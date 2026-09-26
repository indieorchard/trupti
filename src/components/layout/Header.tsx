'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useFontScale } from '@/hooks/useFontScale';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title_hi?: string;
  title_en?: string;
  showBack?: boolean;
  showFontScaler?: boolean;
  onBack?: () => void;
}

export default function Header({
  title_hi = 'तृप्ति',
  title_en = 'Trupti',
  showBack = false,
  showFontScaler = false,
  onBack,
}: HeaderProps) {
  const { t, lang, toggleLanguage } = useLanguage();
  const { scales, scaleIndex, setScale } = useFontScale();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-cream-200">
      <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Back button or Logo */}
        <div className="flex items-center gap-2">
          {showBack ? (
            <button
              onClick={onBack || (() => window.history.back())}
              className={cn(
                'min-h-[48px] min-w-[48px] flex items-center gap-1',
                'text-saffron-600 font-hindi font-semibold text-body-hi',
                'rounded-lg active:bg-cream-200 transition-colors px-2'
              )}
              aria-label={t('पीछे जाएं', 'Go back')}
            >
              <span aria-hidden="true">←</span>
              <span className="hidden sm:inline">{t('पीछे', 'Back')}</span>
            </button>
          ) : (
            <h1 className="font-heading text-heading-hi text-saffron-600 font-bold">
              {t(title_hi, title_en)}
            </h1>
          )}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          {/* Font Scaler */}
          {showFontScaler && (
            <div
              className="flex items-center bg-cream-100 rounded-lg border border-cream-300"
              role="group"
              aria-label={t('फ़ॉन्ट आकार', 'Font size')}
            >
              {scales.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setScale(i)}
                  className={cn(
                    'min-w-[40px] min-h-[40px] flex items-center justify-center',
                    'font-hindi text-sm transition-colors',
                    i === scaleIndex
                      ? 'bg-saffron-600 text-white rounded-lg'
                      : 'text-text-secondary hover:bg-cream-200'
                  )}
                  aria-label={`Font size ${s.label}`}
                  aria-pressed={i === scaleIndex}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={cn(
              'min-h-[44px] min-w-[44px] px-3',
              'bg-cream-100 border border-cream-300 rounded-lg',
              'font-hindi text-sm font-semibold text-text-secondary',
              'active:bg-cream-200 transition-colors'
            )}
            aria-label={lang === 'hi' ? 'Switch to English' : 'हिन्दी में बदलें'}
          >
            {lang === 'hi' ? 'EN' : 'हि'}
          </button>
        </div>
      </div>
    </header>
  );
}
