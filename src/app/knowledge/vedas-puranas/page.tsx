'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { vedasPuranasData } from '@/data/vedas_puranas';
import { getScriptureImage } from '@/data/imageMap';
import SmartImage from '@/components/ui/SmartImage';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { cn } from '@/lib/utils';
import { BookOpen, ExternalLink, Bookmark, Sparkles } from 'lucide-react';

const categories = [
  { id: 'all', label_hi: 'सभी शास्त्र', label_en: 'All Scriptures' },
  { id: 'veda', label_hi: 'चार वेद (4)', label_en: 'Four Vedas (4)' },
  { id: 'purana', label_hi: 'महापुराण (7)', label_en: 'Mahapuranas (7)' },
  { id: 'upanishad', label_hi: 'उपनिषद (4)', label_en: 'Upanishads (4)' },
  { id: 'itihasa', label_hi: 'इतिहास (रामायण / महाभारत)', label_en: 'Itihasas (2)' },
];

export default function VedasPuranasPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, []);

  const filteredItems = vedasPuranasData.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-amber-50 via-cream-50 to-orange-100 border-saffron-300">
        <div className="flex items-start gap-3">
          <div>
            <h1 className="font-hindi text-lg text-saffron-800 font-bold">
              {t('वेद, पुराण, उपनिषद एवं इतिहास', 'Vedas, Puranas, Upanishads & Epics')}
            </h1>
            <p className="text-base text-text-secondary mt-1">
              {t(
                'सनातन धर्म के अनादि मूल ग्रंथ — चारों वेद, 18 महापुराणों के मुख्य अंश, दशोपनिषद एवं आदिकाव्य रामायण व महाभारत।',
                'The eternal source texts of Sanatana Dharma: 4 Vedas, Mahapuranas, Mukhya Upanishads, and the Great Epics.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={cn(
              'px-4 py-2 rounded-full font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[48px]',
              selectedCategory === c.id
                ? 'bg-saffron-600 text-white shadow-xs'
                : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
            )}
          >
            {t(c.label_hi, c.label_en)}
          </button>
        ))}
      </div>

      {/* Scriptures List */}
      <div className="space-y-4">
        {filteredItems.map(item => {
          const imgUrl = getScriptureImage(item.id);
          const badgeText = item.category === 'veda' ? '📜 वेद' : item.category === 'purana' ? '📜 महापुराण' : item.category === 'upanishad' ? '📜 उपनिषद' : '📜 इतिहास';

          return (
            <article
              key={item.id}
              id={item.id}
              className="card hover:shadow-md transition-shadow border-cream-200 bg-white p-4 space-y-3.5 shadow-sm"
            >
              {/* Header with Visual Image, Title & Favorite Button */}
              <div className="flex items-start gap-3 pb-2 border-b border-cream-200">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-xs border border-cream-200">
                  <SmartImage
                    src={imgUrl}
                    alt={item.name_hi}
                    aspectRatio="square"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-sm font-bold uppercase tracking-wider bg-saffron-100 text-saffron-800 mb-1">
                        {item.category.toUpperCase()} • {item.classification || ''}
                      </span>
                      <h2 className="font-hindi text-lg sm:text-lg font-bold text-text-primary leading-tight">
                        {t(item.name_hi, item.name_en)}
                      </h2>
                      <p className="font-hindi text-saffron-700 text-xs sm:text-sm truncate">
                        {item.sanskrit_name}
                      </p>
                    </div>

                    <FavoriteButton
                      item={{
                        id: item.id,
                        type: item.category as any,
                        title_hi: item.name_hi,
                        title_en: item.name_en,
                        subtitle_hi: item.classification || item.category,
                        subtitle_en: item.classification || item.category,
                        url: `/knowledge/vedas-puranas#${item.id}`,
                        image_url: imgUrl,
                        badge: badgeText
                      }}
                      className="p-1.5 flex-shrink-0"
                    />
                  </div>

                  {item.archive_url && (
                    <div className="mt-2">
                      <a
                        href={item.archive_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cream-100 hover:bg-cream-200 text-saffron-800 font-hindi text-xs font-semibold transition-colors border border-cream-300"
                      >
                        <BookOpen size={14} />
                        <span>{t('मूल पाठ / PDF', 'Read Text / PDF')}</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-cream-50 p-2.5 rounded-xl border border-cream-200 text-text-secondary">
                {item.traditional_author && (
                  <div>
                    <strong>{t('दृष्टा ऋषि / रचयिता', 'Author/Rishi')}:</strong> {item.traditional_author}
                  </div>
                )}
                {item.total_verses_or_suktas && (
                  <div>
                    <strong>{t('विस्तार / श्लोक', 'Structure')}:</strong> {item.total_verses_or_suktas}
                  </div>
                )}
                {item.deity && (
                  <div>
                    <strong>{t('प्रधान देवता', 'Presiding Deity')}:</strong> {item.deity}
                  </div>
                )}
              </div>

              {/* Overview */}
              <p className="text-base text-text-secondary leading-relaxed">
                {t(item.overview_hi, item.overview_en)}
              </p>

              {/* Mahavakya Highlight (if Upanishad) */}
              {item.mahavakya && (
                <div className="p-3 bg-gradient-to-r from-amber-100/60 to-cream-100 rounded-xl border-l-4 border-sacred-gold">
                  <span className="text-xs font-bold text-saffron-800 uppercase block mb-0.5">
                    ✨ {t('महावाक्य', 'Great Upanishadic Statement')}:
                  </span>
                  <p className="font-hindi text-lg font-bold text-saffron-950">
                    {item.mahavakya}
                  </p>
                </div>
              )}

              {/* Key Sections & Suktas */}
              {item.key_sections.length > 0 && (
                <div className="pt-2 border-t border-cream-200 space-y-2">
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    📖 {t('प्रमुख सूक्त एवं अध्याय', 'Key Hymns & Sections')}
                  </h3>
                  <div className="space-y-2">
                    {item.key_sections.map((sec, i) => (
                      <div key={i} className="p-2.5 bg-cream-50/70 rounded-xl border border-cream-200">
                        <h4 className="font-hindi text-base font-bold text-saffron-800">
                          {t(sec.title_hi, sec.title_en)}
                        </h4>
                        <p className="text-base text-text-secondary mt-1">
                          {t(sec.desc_hi, sec.desc_en)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
