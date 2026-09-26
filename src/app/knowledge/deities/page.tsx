'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { deitiesData } from '@/data/deities';
import { getDeityImage } from '@/data/imageMap';
import SmartImage from '@/components/ui/SmartImage';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { cn } from '@/lib/utils';
import { ArrowLeft, Search, Sparkles, Shield, Compass } from 'lucide-react';

const aspects = [
  { id: 'all', label_hi: 'सभी (35)', label_en: 'All (35)' },
  { id: 'vaishnava', label_hi: 'वैष्णव', label_en: 'Vaishnava' },
  { id: 'shaiva', label_hi: 'शैव', label_en: 'Shaiva' },
  { id: 'shakta', label_hi: 'शाक्त (देवी)', label_en: 'Shakta (Devi)' },
  { id: 'ganapatya', label_hi: 'गाणपत्य', label_en: 'Ganapatya' },
  { id: 'kaumara', label_hi: 'कौमार (मुरुगन)', label_en: 'Kaumara' },
  { id: 'saurya', label_hi: 'सौर (सूर्य/शनि)', label_en: 'Saurya' },
  { id: 'smartha', label_hi: 'स्मार्त / अन्य', label_en: 'Smartha / Others' },
];

export default function DeitiesPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [selectedAspect, setSelectedAspect] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDeities = deitiesData.filter(d => {
    const matchesAspect = selectedAspect === 'all' || d.primary_aspect === selectedAspect;
    const matchesSearch = 
      d.hindi_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.canonical_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.sanskrit_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description_hi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAspect && matchesSearch;
  });

  return (
    <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
      {/* Header Banner with Explicit Back Button */}
      <div className="card bg-gradient-to-r from-saffron-50 via-cream-50 to-orange-100 border-saffron-200">
        <div className="flex items-start gap-3">
          <button
            onClick={() => router.push('/knowledge')}
            className="p-2 rounded-xl bg-white border border-saffron-200 text-saffron-700 hover:bg-cream-100 transition-colors shadow-2xs mt-0.5"
            aria-label={t('पीछे जाएं', 'Go back')}
          >
            <ArrowLeft size={20} className="stroke-[2.5]" />
          </button>
          <div>
            <h1 className="font-heading text-2xl text-saffron-800 font-bold">
              {t('भारत के 35+ प्रमुख देवी-देवता', '35+ Sacred Deities of India')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'शैव, वैष्णव, शाक्त, सौर एवं समस्त सनातन परंपराओं के अधिष्ठाता देव, उनके मंत्र और पावन स्वरूप।',
                'Presiding deities across Shaiva, Vaishnava, Shakta, and Vedic traditions with divine forms and mantras.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-saffron-700" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('देवता या देवी का नाम खोजें...', 'Search deity by name...')}
          className="w-full pl-12 pr-4 py-3 bg-white border border-cream-300 rounded-2xl font-hindi text-body-hi focus:outline-none focus:ring-2 focus:ring-saffron-500 shadow-xs"
        />
      </div>

      {/* Aspect Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {aspects.map(a => (
          <button
            key={a.id}
            onClick={() => setSelectedAspect(a.id)}
            className={cn(
              'px-4 py-2 rounded-full font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[44px]',
              selectedAspect === a.id
                ? 'bg-saffron-600 text-white shadow-xs'
                : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
            )}
          >
            {t(a.label_hi, a.label_en)}
          </button>
        ))}
      </div>

      {/* Deities Grid */}
      <div className="space-y-4">
        {filteredDeities.map((deity) => {
          const imgUrl = deity.image_url || getDeityImage(deity.id);

          return (
            <article
              key={deity.id}
              id={deity.id}
              className="card hover:shadow-md transition-shadow border-cream-200 bg-white overflow-hidden p-4 space-y-3"
            >
              {/* Header with Visual Image, Title & Favorite Button */}
              <div className="flex items-start gap-3.5">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-xs border border-cream-200">
                  <SmartImage
                    src={imgUrl}
                    alt={deity.hindi_name}
                    aspectRatio="square"
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-saffron-100 text-saffron-800 uppercase tracking-wider mb-1 font-hindi">
                        {deity.primary_aspect}
                      </span>
                      <h2 className="font-heading text-xl font-bold text-text-primary leading-tight">
                        {deity.hindi_name}
                      </h2>
                      <p className="text-xs font-sanskrit text-saffron-700 mt-0.5 truncate">
                        {deity.sanskrit_name} • {deity.canonical_name}
                      </p>
                    </div>

                    <FavoriteButton
                      item={{
                        id: deity.id,
                        type: 'deity',
                        title_hi: deity.hindi_name,
                        title_en: deity.canonical_name,
                        subtitle_hi: deity.primary_aspect,
                        subtitle_en: deity.primary_aspect,
                        url: `/knowledge/deities#${deity.id}`,
                        image_url: imgUrl,
                        badge: '🕉️ देवता'
                      }}
                      className="p-1.5"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-body-hi text-text-secondary leading-relaxed">
                {t(deity.description_hi, deity.description_en)}
              </p>

              {/* Mool Mantra Highlight */}
              {deity.mool_mantra && (
                <div className="p-3 bg-amber-50/70 rounded-xl border-l-4 border-saffron-600">
                  <span className="text-xs font-bold text-saffron-900 block mb-0.5">
                    📿 {t('मूल मंत्र', 'Mool Mantra')}:
                  </span>
                  <p className="font-sanskrit text-base text-saffron-900 font-medium">
                    {deity.mool_mantra}
                  </p>
                </div>
              )}

              {/* Iconography */}
              <div className="text-xs text-text-secondary">
                <strong>{t('दिव्य स्वरूप', 'Iconography')}:</strong> {deity.iconography_hi}
              </div>

              {/* Attributes & Vahana */}
              <div className="flex flex-wrap gap-2 text-xs text-text-muted">
                {deity.consort && <span>🌸 {t('शक्ति / अर्धांगिनी', 'Consort')}: {deity.consort}</span>}
                {deity.vahana && <span>🐾 {t('वाहन', 'Vahana')}: {deity.vahana}</span>}
              </div>

              {/* Key Temples */}
              {deity.key_temples.length > 0 && (
                <div className="pt-2.5 border-t border-cream-200 text-xs text-text-secondary">
                  <span className="font-semibold text-saffron-700">🛕 {t('प्रमुख तीर्थ', 'Prime Shrines')}: </span>
                  {deity.key_temples.join(', ')}
                </div>
              )}
            </article>
          );
        })}

        {filteredDeities.length === 0 && (
          <div className="text-center py-12 card text-text-muted">
            <p className="text-3xl mb-2">🔍</p>
            <p className="text-body-hi">
              {t('कोई देवता नहीं मिला। कृपया अन्य शब्द खोजें।', 'No deities found matching your query.')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
