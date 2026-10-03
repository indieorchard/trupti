'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

const quickGridItems = [
  { href: '/knowledge/japa', emoji: '📿', label_hi: 'जप माला', label_en: 'Japa Mala', color: 'from-amber-50 to-orange-50 border-amber-200' },
  { href: '/journey/temples', emoji: '🛕', label_hi: 'तीर्थ व मंदिर', label_en: 'Temples', color: 'from-orange-50 to-amber-50 border-orange-200' },
  { href: '/knowledge/gita', emoji: '📖', label_hi: 'गीता भंडार', label_en: 'Gita Library', color: 'from-amber-50 to-yellow-50 border-amber-200' },
  { href: '/knowledge/deities', emoji: '🕉️', label_hi: 'देवी-देवता', label_en: 'Deities', color: 'from-yellow-50 to-orange-50 border-yellow-200' },
  { href: '/knowledge/vedas-puranas', emoji: '📜', label_hi: 'वेद-पुराण', label_en: 'Vedas', color: 'from-orange-50 to-red-50 border-orange-200' },
  { href: '/knowledge/aarti', emoji: '🪔', label_hi: 'आरती संग्रह', label_en: 'Aarti Sangrah', color: 'from-red-50 to-amber-50 border-red-200' },
  { href: '/knowledge/vrat-sangrah', emoji: '🗓️', label_hi: 'व्रत संग्रह', label_en: 'Vrat Sangrah', color: 'from-blue-50 to-indigo-50 border-blue-200' },
  { href: '/search', emoji: '🔍', label_hi: 'खोजें (सर्च)', label_en: 'Search All', color: 'from-saffron-50 to-cream-100 border-saffron-300' },
];

export default function QuickAccess() {
  const { t } = useLanguage();

  return (
    <section aria-label={t('शीघ्र पहुँच — 8 प्रमुख द्वार', 'Quick Access — 8 Gateways')} className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-hindi text-base font-bold text-saffron-800 flex items-center gap-1.5">
          <span>⚡</span>
          <span>{t('शीघ्र पहुँच (8 मुख्य साधन)', 'Quick Access (8 Core Hubs)')}</span>
        </h3>
        <span className="text-sm text-text-muted font-hindi">
          {t('एक स्पर्श में दर्शन', '1-Tap Access')}
        </span>
      </div>

      {/* 4x2 Compact Grid (8 Cards in One Fold) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickGridItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center p-2 rounded-xl border bg-gradient-to-b',
              'hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all text-center',
              'min-h-[74px] select-none group',
              item.color
            )}
          >
            <span className="text-lg sm:text-3xl mb-1 filter drop-shadow-xs transform group-hover:scale-110 transition-transform">
              {item.emoji}
            </span>
            <span className="font-hindi text-sm sm:text-xs font-bold text-text-primary leading-tight line-clamp-2 w-full px-0.5">
              {t(item.label_hi, item.label_en)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
