'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { chantsData } from '@/data/chants';
import { cn } from '@/lib/utils';
import { Play, Pause, Bell, Shield, Sparkles } from 'lucide-react';

export default function StotraPage() {
  const { t } = useLanguage();
  const stotras = chantsData.filter(c => c.category === 'stotra' || c.category === 'shloka' || c.category === 'sukta');
  const [selectedStotraId, setSelectedStotraId] = useState(stotras[0]?.id || 'shiva_tandava_stotra');
  const [isPlaying, setIsPlaying] = useState(false);

  const currentStotra = stotras.find(s => s.id === selectedStotraId) || stotras[0];

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-purple-50 to-amber-100 border-saffron-300">
        <div className="flex items-start gap-3">
          <span className="text-4xl">🔔</span>
          <div>
            <h1 className="font-heading text-2xl text-saffron-800 font-bold">
              {t('दिव्य स्तोत्र एवं मंत्र भंडार (20+ स्तोत्र)', 'Sacred Stotras & Mantras (20+ Stotras)')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'शिव तांडव, महिषासुर मर्दिनी, आदित्य हृदय, विष्णु सहस्रनाम, कनकधारा, कालभैरवाष्टकम् आदि सिद्ध स्तोत्र।',
                'Shiva Tandava, Mahishasura Mardini, Aditya Hridaya, Vishnu Sahasranama, and Kanakadhara Stotras.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Stotra Selector Pills */}
      <div>
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2 px-1">
          {t('स्तोत्र चुनें', 'Select Stotra')}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {stotras.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedStotraId(s.id);
                setIsPlaying(false);
              }}
              className={cn(
                'px-4 py-2 rounded-xl font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[44px]',
                selectedStotraId === s.id
                  ? 'bg-saffron-600 text-white shadow-sm'
                  : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
              )}
            >
              {t(s.name_hi, s.name_en)}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Stotra Details & Text */}
      {currentStotra && (
        <article className="card border-saffron-200 bg-white space-y-4 shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-2 pb-3 border-b border-cream-200">
            <div>
              <span className="text-xs font-bold bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full">
                🕉️ {currentStotra.deity_name} • {currentStotra.category.toUpperCase()}
              </span>
              <h2 className="font-heading text-2xl font-bold text-text-primary mt-1">
                {t(currentStotra.name_hi, currentStotra.name_en)}
              </h2>
              {currentStotra.source && (
                <p className="text-xs text-text-muted mt-0.5">
                  {t('स्रोत / रचयिता', 'Source/Composer')}: {currentStotra.source}
                </p>
              )}
            </div>

            {/* Audio Toggle */}
            {currentStotra.youtube_id && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={cn(
                  'px-4 py-2 rounded-xl font-hindi text-sm font-semibold flex items-center gap-2 transition-colors min-h-[44px]',
                  isPlaying
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-saffron-600 text-white shadow-sm'
                )}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                <span>{isPlaying ? t('रोकें', 'Pause') : t('स्तोत्र सुनें', 'Listen Audio')}</span>
              </button>
            )}
          </div>

          {/* YouTube Video if playing */}
          {isPlaying && currentStotra.youtube_id && (
            <div className="aspect-video rounded-xl overflow-hidden border border-cream-300">
              <iframe
                src={`https://www.youtube.com/embed/${currentStotra.youtube_id}?autoplay=1`}
                title={currentStotra.name_hi}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Recitation Benefit */}
          {currentStotra.benefit_hi && (
            <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-saffron-950 font-medium">
              ✨ <strong>{t('फलश्रुति एवं आध्यात्मिक लाभ', 'Spiritual Benefit')}:</strong> {currentStotra.benefit_hi}
            </div>
          )}

          {/* Full Sanskrit Text */}
          <div className="p-5 bg-cream-50 rounded-xl border border-cream-200">
            <pre className="font-sanskrit text-shloka text-text-primary whitespace-pre-wrap leading-loose font-medium text-center">
              {currentStotra.text_sanskrit}
            </pre>
          </div>

          {/* Transliteration */}
          {currentStotra.text_transliteration && (
            <div className="p-3 bg-cream-100/60 rounded-lg text-xs font-mono text-text-muted italic text-center">
              {currentStotra.text_transliteration}
            </div>
          )}

          {/* Meaning / English Summary */}
          <div className="p-4 bg-cream-100 rounded-lg text-body-hi text-text-secondary border border-cream-300">
            <strong className="text-saffron-800">📖 {t('सरल हिंदी भावार्थ', 'Meaning')}: </strong>
            <p className="mt-1 leading-relaxed">
              {t(currentStotra.meaning_hi, currentStotra.meaning_en)}
            </p>
          </div>
        </article>
      )}
    </div>
  );
}
