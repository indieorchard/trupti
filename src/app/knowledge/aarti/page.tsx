'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { chantsData } from '@/data/chants';
import { cn } from '@/lib/utils';
import { Play, Pause, Volume2, Sparkles } from 'lucide-react';

export default function AartiPage() {
  const { t } = useLanguage();
  const aartis = chantsData.filter(c => c.category === 'aarti');
  const [selectedAartiId, setSelectedAartiId] = useState(aartis[0]?.id || '');
  const [isPlaying, setIsPlaying] = useState(false);

  const currentAarti = aartis.find(a => a.id === selectedAartiId) || aartis[0];

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-amber-50 to-orange-100 border-saffron-300">
        <div className="flex items-start gap-3">
          <span className="text-4xl">🪔</span>
          <div>
            <h1 className="font-heading text-2xl text-saffron-800 font-bold">
              {t('महाआरती संग्रह (15+ आरतियां)', 'Sacred Aarti Collection (15+ Aartis)')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'भगवान श्री कृष्ण, शिवजी, हनुमान जी, माँ दुर्गा, महालक्ष्मी और गंगा जी की संपूर्ण दैनिक आरतियां।',
                'Complete traditional evening and morning Aartis of Krishna, Shiva, Hanuman, Durga, Lakshmi, and Ganga.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Aarti Selector Horizontal Pills */}
      <div>
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2 px-1">
          {t('आरती का चयन करें', 'Select Aarti')}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {aartis.map(a => (
            <button
              key={a.id}
              onClick={() => {
                setSelectedAartiId(a.id);
                setIsPlaying(false);
              }}
              className={cn(
                'px-4 py-2 rounded-xl font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[44px]',
                selectedAartiId === a.id
                  ? 'bg-saffron-600 text-white shadow-sm'
                  : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
              )}
            >
              {t(a.name_hi, a.name_en)}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Aarti Full Text & Player */}
      {currentAarti && (
        <article className="card border-saffron-200 bg-white space-y-4 shadow-sm">
          <div className="flex items-start justify-between flex-wrap gap-2 pb-3 border-b border-cream-200">
            <div>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                🕉️ {currentAarti.deity_name}
              </span>
              <h2 className="font-heading text-2xl font-bold text-text-primary mt-1">
                {t(currentAarti.name_hi, currentAarti.name_en)}
              </h2>
              {currentAarti.source && (
                <p className="text-xs text-text-muted mt-0.5">
                  {t('रचयिता / स्रोत', 'Author/Source')}: {currentAarti.source}
                </p>
              )}
            </div>

            {/* Audio Toggle */}
            {currentAarti.youtube_id && (
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
                <span>{isPlaying ? t('आरती रोकें', 'Pause Audio') : t('आरती सुनें', 'Play Aarti')}</span>
              </button>
            )}
          </div>

          {/* YouTube Audio Player if playing */}
          {isPlaying && currentAarti.youtube_id && (
            <div className="aspect-video rounded-xl overflow-hidden border border-cream-300">
              <iframe
                src={`https://www.youtube.com/embed/${currentAarti.youtube_id}?autoplay=1`}
                title={currentAarti.name_hi}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Full Aarti Devanagari Lyrics */}
          <div className="p-4 bg-cream-50 rounded-xl border border-cream-200">
            <pre className="font-sanskrit text-shloka text-text-primary whitespace-pre-wrap leading-loose font-medium text-center">
              {currentAarti.text_sanskrit}
            </pre>
          </div>

          {/* Meaning / Spiritual Significance */}
          <div className="p-3 bg-amber-50/50 rounded-lg text-body-hi text-text-secondary border border-amber-200">
            <strong className="text-saffron-800">🪷 {t('भावार्थ एवं लाभ', 'Essence & Benefit')}: </strong>
            {t(currentAarti.meaning_hi, currentAarti.meaning_en)}
          </div>
        </article>
      )}
    </div>
  );
}
