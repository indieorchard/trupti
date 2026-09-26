'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { deitiesData } from '@/data/deities';
import { cn } from '@/lib/utils';
import { Sparkles, Search, Compass, Shield } from 'lucide-react';

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
    <div className="px-4 py-4 space-y-4">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-saffron-50 to-cream-100 border-saffron-200">
        <div className="flex items-start gap-3">
          <span className="text-4xl">🕉️</span>
          <div>
            <h1 className="font-heading text-2xl text-saffron-700 font-bold">
              {t('भारत के 35+ प्रमुख देवी-देवता', '35+ Sacred Deities of India')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'शैव, वैष्णव, शाक्त, सौर एवं समस्त सनातन परंपराओं के अधिष्ठाता देव, उनके मंत्र और पावन तीर्थ।',
                'Presiding deities across Shaiva, Vaishnava, Shakta, and Vedic traditions with mantras and holy shrines.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('देवता या देवी का नाम खोजें...', 'Search deity by name...')}
          className="w-full pl-12 pr-4 py-3 bg-white border border-cream-300 rounded-xl font-hindi text-body-hi focus:outline-none focus:ring-2 focus:ring-saffron-500 shadow-sm"
        />
      </div>

      {/* Aspect Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {aspects.map(a => (
          <button
            key={a.id}
            onClick={() => setSelectedAspect(a.id)}
            className={cn(
              'px-4 py-2 rounded-full font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[44px]',
              selectedAspect === a.id
                ? 'bg-saffron-600 text-white shadow-sm'
                : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
            )}
          >
            {t(a.label_hi, a.label_en)}
          </button>
        ))}
      </div>

      {/* Deities Grid */}
      <div className="space-y-3">
        {filteredDeities.map((deity) => (
          <article
            key={deity.id}
            className="card hover:shadow-md transition-shadow border-cream-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-saffron-100 text-saffron-800 uppercase tracking-wider mb-1">
                  {deity.primary_aspect}
                </span>
                <h2 className="font-heading text-xl font-bold text-text-primary">
                  {deity.hindi_name}
                </h2>
                <p className="text-sm font-sanskrit text-saffron-700">
                  {deity.sanskrit_name} • {deity.canonical_name}
                </p>
              </div>
            </div>

            <p className="text-body-hi text-text-secondary mt-2.5 leading-relaxed">
              {t(deity.description_hi, deity.description_en)}
            </p>

            {/* Mool Mantra Highlight */}
            {deity.mool_mantra && (
              <div className="mt-3 p-3 bg-cream-100 rounded-lg border-l-4 border-saffron-600">
                <span className="text-xs font-semibold text-text-muted block mb-0.5">
                  📿 {t('मूल मंत्र', 'Mool Mantra')}:
                </span>
                <p className="font-sanskrit text-base text-saffron-900 font-medium">
                  {deity.mool_mantra}
                </p>
              </div>
            )}

            {/* Iconography */}
            <div className="mt-2.5 text-xs text-text-secondary">
              <strong>{t('दिव्य स्वरूप', 'Iconography')}:</strong> {deity.iconography_hi}
            </div>

            {/* Attributes & Vahana */}
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-text-muted">
              {deity.consort && <span>🌸 {t('शक्ति / अर्धांगिनी', 'Consort')}: {deity.consort}</span>}
              {deity.vahana && <span>🐾 {t('वाहन', 'Vahana')}: {deity.vahana}</span>}
            </div>

            {/* Key Temples */}
            {deity.key_temples.length > 0 && (
              <div className="mt-3 pt-3 border-t border-cream-200 text-xs text-text-secondary">
                <span className="font-semibold text-saffron-700">🛕 {t('प्रमुख तीर्थ', 'Prime Shrines')}: </span>
                {deity.key_temples.join(', ')}
              </div>
            )}
          </article>
        ))}

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
