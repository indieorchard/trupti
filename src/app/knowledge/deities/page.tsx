'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { deitiesData } from '@/data/deities';
import { getDeityImage } from '@/data/imageMap';
import SmartImage from '@/components/ui/SmartImage';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

const aspects = [
  { id: 'all', label_hi: 'सभी (35)', label_en: 'All (35)' },
  { id: 'vaishnava', label_hi: 'वैष्णव', label_en: 'Vaishnava' },
  { id: 'shaiva', label_hi: 'शैव', label_en: 'Shaiva' },
  { id: 'shakta', label_hi: 'शाक्त (देवी)', label_en: 'Shakta (Devi)' },
  { id: 'ganapatya', label_hi: 'गाणपत्य', label_en: 'Ganapatya' },
  { id: 'kaumara', label_hi: 'कौमार', label_en: 'Kaumara' },
  { id: 'saurya', label_hi: 'सौर', label_en: 'Saurya' },
  { id: 'smartha', label_hi: 'स्मार्त / अन्य', label_en: 'Smartha / Others' },
];

export default function DeitiesPage() {
  const { t } = useLanguage();
  const [selectedAspect, setSelectedAspect] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, []);

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
      {/* Page Title */}
      <div className="card bg-gradient-to-r from-saffron-50 to-orange-50 border-saffron-200">
        <h1 className="font-hindi text-lg font-bold text-saffron-800">
          {t('भारत के 35+ प्रमुख देवी-देवता', '35+ Sacred Deities of India')}
        </h1>
        <p className="font-hindi text-base text-text-secondary mt-1">
          {t(
            'शैव, वैष्णव, शाक्त एवं सनातन परंपराओं के अधिष्ठाता देव।',
            'Presiding deities across all Sanatana traditions.'
          )}
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-saffron-700" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('देवता का नाम खोजें...', 'Search deity...')}
          className="w-full pl-12 pr-4 py-3 bg-white border border-cream-300 rounded-2xl font-hindi text-base focus:outline-none focus:ring-2 focus:ring-saffron-500"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {aspects.map(a => (
          <button
            key={a.id}
            onClick={() => setSelectedAspect(a.id)}
            className={cn(
              'px-4 py-2 rounded-full font-hindi text-base font-semibold whitespace-nowrap min-h-[48px]',
              selectedAspect === a.id
                ? 'bg-saffron-600 text-white'
                : 'bg-white border border-cream-300 text-text-secondary'
            )}
          >
            {t(a.label_hi, a.label_en)}
          </button>
        ))}
      </div>

      {/* Deity Cards */}
      <div className="space-y-4">
        {filteredDeities.map((deity) => {
          const imgUrl = deity.image_url || getDeityImage(deity.id);

          return (
            <article
              key={deity.id}
              id={deity.id}
              className="card border-cream-200 bg-white p-4 space-y-3"
            >
              {/* Row: Image + Name + Star */}
              <div className="flex items-start gap-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 border border-cream-200">
                  <SmartImage
                    src={imgUrl}
                    alt={deity.hindi_name}
                    aspectRatio="square"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="font-hindi text-lg font-bold text-text-primary leading-snug">
                        {deity.hindi_name}
                      </h2>
                      <p className="font-hindi text-base text-text-muted">
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
                      className="p-1.5 flex-shrink-0"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="font-hindi text-base text-text-secondary leading-relaxed">
                {t(deity.description_hi, deity.description_en)}
              </p>

              {/* Mool Mantra */}
              {deity.mool_mantra && (
                <div className="p-3 bg-amber-50/70 rounded-xl border-l-4 border-saffron-600">
                  <span className="font-hindi text-base font-bold text-saffron-900 block mb-0.5">
                    📿 {t('मूल मंत्र', 'Mool Mantra')}:
                  </span>
                  <p className="font-hindi text-base text-saffron-900 font-medium">
                    {deity.mool_mantra}
                  </p>
                </div>
              )}

              {/* Iconography */}
              <p className="font-hindi text-base text-text-secondary">
                <strong>{t('दिव्य स्वरूप', 'Iconography')}:</strong> {deity.iconography_hi}
              </p>

              {/* Attributes */}
              <div className="flex flex-col gap-1 font-hindi text-base text-text-muted">
                {deity.consort && <span>🌸 {t('शक्ति / अर्धांगिनी', 'Consort')}: {deity.consort}</span>}
                {deity.vahana && <span>🐾 {t('वाहन', 'Vahana')}: {deity.vahana}</span>}
              </div>

              {/* Key Temples */}
              {deity.key_temples.length > 0 && (
                <div className="pt-2 border-t border-cream-200 font-hindi text-base text-text-secondary">
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
            <p className="font-hindi text-base">
              {t('कोई देवता नहीं मिला।', 'No deities found.')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
