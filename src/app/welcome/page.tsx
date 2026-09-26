'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import type { PillarInfo, Pillar } from '@/types';

const pillars: PillarInfo[] = [
  {
    id: 'self',
    emoji: '🪷',
    title_hi: 'स्वयं के लिए',
    title_en: 'For Self',
    subtitle_hi: 'वानप्रस्थ / मोक्ष साधना — जीवन के अंतिम चरण में आध्यात्मिक तैयारी',
    subtitle_en: 'Vanaprastha / Moksha Sadhana — Spiritual preparation in the twilight years',
    color: 'border-l-saffron-600',
  },
  {
    id: 'lost',
    emoji: '🕯️',
    title_hi: 'जो खो दिया उनके लिए',
    title_en: 'For Someone You Lost',
    subtitle_hi: 'श्राद्ध, पितृ कर्म, तर्पण — पूर्वजों को श्रद्धांजलि',
    subtitle_en: 'Shraddha, Pitru Karma, Tarpana — Honoring ancestors',
    color: 'border-l-purple-600',
  },
  {
    id: 'mental_peace',
    emoji: '🧘',
    title_hi: 'मानसिक शांति',
    title_en: 'Mental Peace',
    subtitle_hi: 'वैदिक मनोविज्ञान, ध्यान, प्राणायाम और मंत्र चिकित्सा',
    subtitle_en: 'Vedic psychology, meditation, pranayama & mantra healing',
    color: 'border-l-emerald-600',
  },
  {
    id: 'kundali_dosh',
    emoji: '🪐',
    title_hi: 'कुंडली दोष',
    title_en: 'Kundali Dosh',
    subtitle_hi: 'साढ़ेसाती, मांगलिक, काल सर्प — सात्विक उपचार',
    subtitle_en: 'Sade Sati, Manglik, Kaal Sarp — Sattvic remedies',
    color: 'border-l-blue-600',
  },
  {
    id: 'vidhis',
    emoji: '📿',
    title_hi: 'विधियाँ',
    title_en: 'Vidhis (Ceremonies)',
    subtitle_hi: 'सत्यनारायण पूजा, रुद्राभिषेक, नवग्रह शांति आदि',
    subtitle_en: 'Satyanarayan Puja, Rudra Abhishek, Navagraha Shanti, etc.',
    color: 'border-l-sacred-vermillion',
  },
];

export default function WelcomePage() {
  const { t, lang, toggleLanguage } = useLanguage();
  const router = useRouter();
  const [selected, setSelected] = useState<Set<Pillar>>(new Set());

  const togglePillar = (id: Pillar) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleContinue = () => {
    // Store selected pillars in localStorage for personalization
    if (typeof window !== 'undefined') {
      localStorage.setItem('trupti_pillars', JSON.stringify([...selected]));
    }
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-cream-50 px-4 py-8 flex flex-col">
      {/* Language toggle at top */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 bg-cream-100 border border-cream-300 rounded-lg text-sm font-semibold"
        >
          {lang === 'hi' ? 'English' : 'हिन्दी'}
        </button>
      </div>

      {/* Logo & Title */}
      <div className="text-center mb-8">
        <h1 className="font-heading text-4xl text-saffron-600 font-bold mb-2">
          तृप्ति
        </h1>
        <p className="text-body-hi text-text-secondary">
          {t('आत्मा की संतुष्टि का द्वार', 'Gateway to Soul-Contentment')}
        </p>
      </div>

      {/* Question */}
      <h2 className="font-heading text-heading-hi text-text-primary font-bold text-center mb-6">
        {t('तृप्ति आपके लिए क्यों?', 'Why do you need Trupti?')}
      </h2>
      <p className="text-body-hi text-text-secondary text-center mb-6">
        {t('एक या अधिक चुनें', 'Select one or more')}
      </p>

      {/* Pillar Cards */}
      <div className="space-y-3 flex-1">
        {pillars.map((pillar) => {
          const isSelected = selected.has(pillar.id);
          return (
            <button
              key={pillar.id}
              onClick={() => togglePillar(pillar.id)}
              className={cn(
                'w-full pillar-card flex-row items-start gap-4 p-5',
                'border-l-4 text-left',
                pillar.color,
                isSelected && 'ring-2 ring-saffron-400 bg-saffron-50/50'
              )}
            >
              <span className="text-3xl flex-shrink-0">{pillar.emoji}</span>
              <div className="flex-1">
                <h3 className="font-heading text-heading-hi text-text-primary font-bold">
                  {t(pillar.title_hi, pillar.title_en)}
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  {t(pillar.subtitle_hi, pillar.subtitle_en)}
                </p>
              </div>
              {/* Selection indicator */}
              <div
                className={cn(
                  'w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1',
                  isSelected
                    ? 'bg-saffron-600 border-saffron-600 text-white'
                    : 'border-cream-300'
                )}
              >
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 space-y-3">
        <button
          onClick={handleContinue}
          className="btn-primary w-full"
          disabled={selected.size === 0}
        >
          {selected.size > 0
            ? t('आगे बढ़ें →', 'Continue →')
            : t('कम से कम एक चुनें', 'Select at least one')}
        </button>
        <button
          onClick={() => router.push('/')}
          className="btn-secondary w-full"
        >
          {t('बाद में चुनूंगा — सीधे शुरू करें', 'Skip — Start exploring')}
        </button>
      </div>
    </div>
  );
}
