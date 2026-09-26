'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { vedasPuranasData } from '@/data/vedas_puranas';
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

  const filteredItems = vedasPuranasData.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-amber-50 to-orange-100 border-saffron-300">
        <div className="flex items-start gap-3">
          <span className="text-4xl">📜</span>
          <div>
            <h1 className="font-heading text-2xl text-saffron-800 font-bold">
              {t('वेद, पुराण, उपनिषद एवं इतिहास', 'Vedas, Puranas, Upanishads & Epics')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'सनातन धर्म के अनादि मूल ग्रंथ — चारों वेद, 18 महापुराणों के मुख्य अंश, दशोपनिषद एवं आदिकाव्य रामायण व महाभारत।',
                'The eternal source texts of Sanatana Dharma: 4 Vedas, Mahapuranas, Mukhya Upanishads, and the Great Epics.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={cn(
              'px-4 py-2 rounded-xl font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[44px]',
              selectedCategory === c.id
                ? 'bg-saffron-600 text-white shadow-sm'
                : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
            )}
          >
            {t(c.label_hi, c.label_en)}
          </button>
        ))}
      </div>

      {/* Scriptures List */}
      <div className="space-y-4">
        {filteredItems.map(item => (
          <article
            key={item.id}
            className="card hover:shadow-md transition-shadow border-cream-200 space-y-3"
          >
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-saffron-100 text-saffron-800">
                  {item.category.toUpperCase()} • {item.classification || ''}
                </span>
                <h2 className="font-heading text-2xl font-bold text-text-primary mt-1">
                  {t(item.name_hi, item.name_en)}
                </h2>
                <p className="font-sanskrit text-saffron-700 text-sm">
                  {item.sanskrit_name}
                </p>
              </div>

              {item.archive_url && (
                <a
                  href={item.archive_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-cream-100 text-saffron-800 hover:bg-cream-200 font-hindi text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[40px]"
                >
                  <BookOpen size={15} />
                  <span>{t('मूल पाठ / PDF', 'Read Text / PDF')}</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Quick Metadata */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-cream-50 p-2.5 rounded-lg text-text-secondary">
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
            <p className="text-body-hi text-text-secondary leading-relaxed">
              {t(item.overview_hi, item.overview_en)}
            </p>

            {/* Mahavakya Highlight (if Upanishad) */}
            {item.mahavakya && (
              <div className="p-3 bg-gradient-to-r from-amber-100/60 to-cream-100 rounded-lg border-l-4 border-sacred-gold">
                <span className="text-xs font-bold text-saffron-800 uppercase block mb-0.5">
                  ✨ {t('महावाक्य', 'Great Upanishadic Statement')}:
                </span>
                <p className="font-sanskrit text-lg font-bold text-saffron-950">
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
                    <div key={i} className="p-2.5 bg-cream-50 rounded-lg border border-cream-200">
                      <h4 className="font-hindi text-base font-bold text-saffron-800">
                        {t(sec.title_hi, sec.title_en)}
                      </h4>
                      <p className="text-body-hi text-text-secondary mt-1">
                        {t(sec.desc_hi, sec.desc_en)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
