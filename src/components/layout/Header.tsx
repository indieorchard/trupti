'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { useFontScale } from '@/hooks/useFontScale';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';
import { ArrowLeft, Star, Search } from 'lucide-react';

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
  showBack,
  showFontScaler = false,
  onBack,
}: HeaderProps) {
  const { t, lang, toggleLanguage } = useLanguage();
  const { scales, scaleIndex, setScale } = useFontScale();
  const { favoritesCount } = useFavorites();
  const pathname = usePathname();
  const router = useRouter();

  // Automatically show back button on any nested route
  const shouldShowBack = showBack !== undefined ? showBack : pathname !== '/';

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    // Determine sensible parent route
    if (pathname.startsWith('/knowledge/') && pathname !== '/knowledge') {
      router.push('/knowledge');
    } else if (pathname.startsWith('/journey/') && pathname !== '/journey') {
      router.push('/journey');
    } else if (pathname === '/favorites' || pathname === '/search' || pathname === '/knowledge' || pathname === '/journey' || pathname === '/settings') {
      router.push('/');
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-cream-200 shadow-sm">
      <div className="max-w-lg mx-auto flex items-center justify-between px-3.5 py-2.5">
        {/* Left: Back button or Logo */}
        <div className="flex items-center gap-2">
          {shouldShowBack ? (
            <button
              onClick={handleBack}
              className={cn(
                'min-h-[48px] min-w-[48px] flex items-center gap-1.5',
                'text-saffron-700 font-hindi font-bold text-body-hi',
                'rounded-xl active:bg-cream-200 hover:bg-cream-100 transition-colors px-2.5 py-1'
              )}
              aria-label={t('पीछे जाएं', 'Go back')}
            >
              <ArrowLeft size={22} className="stroke-[2.5]" />
              <span className="text-base">{t('पीछे', 'Back')}</span>
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-1.5 group">
              <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                🪷
              </span>
              <h1 className="font-heading text-2xl text-saffron-700 font-bold tracking-tight">
                {t(title_hi, title_en)}
              </h1>
            </Link>
          )}
        </div>

        {/* Right: Controls (Search, Favorites, Font Scaler, Language) */}
        <div className="flex items-center gap-1.5">
          {/* Search Button */}
          <Link
            href="/search"
            className={cn(
              'min-h-[48px] min-w-[48px] p-2 rounded-xl flex items-center justify-center transition-colors',
              pathname === '/search'
                ? 'bg-saffron-600 text-white shadow-sm'
                : 'bg-cream-100 text-text-secondary hover:bg-cream-200 border border-cream-300'
            )}
            title={t('खोजें', 'Search')}
            aria-label={t('खोजें', 'Search')}
          >
            <Search size={18} />
          </Link>

          {/* Starred Favorites Button with live badge */}
          <Link
            href="/favorites"
            className={cn(
              'relative min-h-[48px] min-w-[48px] p-2 rounded-xl flex items-center justify-center transition-colors',
              pathname === '/favorites'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-cream-100 text-amber-700 hover:bg-cream-200 border border-cream-300'
            )}
            title={t('पसंदीदा (Starred)', 'Favorites')}
            aria-label={t('पसंदीदा (Starred)', 'Favorites')}
          >
            <Star
              size={18}
              className={favoritesCount > 0 ? 'fill-amber-500 text-amber-600' : ''}
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-saffron-600 text-white text-[10px] font-bold rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center shadow-sm">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Font Scaler */}
          {showFontScaler && (
            <>
              {/* Mobile font toggle — single cycle button */}
              <button
                className="sm:hidden min-h-[48px] min-w-[48px] flex items-center justify-center bg-cream-100 border border-cream-300 rounded-xl font-hindi text-xs font-bold transition-colors active:bg-cream-200"
                onClick={() => setScale((scaleIndex + 1) % scales.length)}
                aria-label={t('फ़ॉन्ट आकार बदलें', 'Change font size')}
              >
                {scales[scaleIndex].label}
              </button>

              <div
                className="hidden sm:flex items-center bg-cream-100 rounded-lg border border-cream-300 p-0.5"
                role="group"
                aria-label={t('फ़ॉन्ट आकार', 'Font size')}
              >
                {scales.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setScale(i)}
                    className={cn(
                      'min-w-[48px] min-h-[48px] flex items-center justify-center',
                      'font-hindi text-xs font-bold transition-all rounded-md',
                      i === scaleIndex
                        ? 'bg-saffron-600 text-white shadow-xs'
                        : 'text-text-secondary hover:bg-cream-200'
                    )}
                    aria-label={`Font size ${s.label}`}
                    aria-pressed={i === scaleIndex}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className={cn(
              'min-h-[48px] min-w-[48px] px-2.5',
              'bg-cream-100 border border-cream-300 rounded-xl',
              'font-hindi text-xs font-bold text-text-primary',
              'active:bg-cream-200 hover:bg-cream-200 transition-colors'
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
