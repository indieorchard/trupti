'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { chantsData } from '@/data/chants';
import { getChantImage } from '@/data/imageMap';
import SmartImage from '@/components/ui/SmartImage';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { cn } from '@/lib/utils';
import { Play, Pause, Volume2, Sparkles } from 'lucide-react';

export default function AartiPage() {
  const { t } = useLanguage();
  const aartis = chantsData.filter(c => c.category === 'aarti');
  const [selectedAartiId, setSelectedAartiId] = useState(aartis[0]?.id || '');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const matchedItem = aartis.find(item => item.id === hash);
      if (matchedItem) {
        setSelectedAartiId(hash);
      }
    }
  }, [aartis]);

  const currentAarti = aartis.find(a => a.id === selectedAartiId) || aartis[0];
  const deityImg = currentAarti ? getChantImage(currentAarti.deity_id, 'aarti') : '';

  return (
    <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-amber-50 via-cream-50 to-orange-100 border-saffron-300">
        <div className="flex items-start gap-3">
          <div>
            <h1 className="font-heading text-2xl text-saffron-800 font-bold">
              {t('महाआरती संग्रह (15+ आरतियां)', 'Sacred Aarti Collection (15+ Aartis)')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'भगवान श्री कृष्ण, शिवजी, हनुमान जी, माँ दुर्गा, महालक्ष्मी और गंगा जी की संपूर्ण दैनिक आरतियां।',
                'Complete traditional daily Aartis of Krishna, Shiva, Hanuman, Durga, Lakshmi, and Ganga.'
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
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {aartis.map(a => (
            <button
              key={a.id}
              onClick={() => {
                setSelectedAartiId(a.id);
                setIsPlaying(false);
              }}
              className={cn(
                'px-4 py-2 rounded-full font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[48px]',
                selectedAartiId === a.id
                  ? 'bg-saffron-600 text-white shadow-xs'
                  : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
              )}
            >
              {t(a.name_hi, a.name_en)}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Aarti Full Text & Deity Visual */}
      {currentAarti && (
        <article id={currentAarti.id} className="card border-saffron-200 bg-white space-y-4 shadow-sm p-4">
          {/* Visual Deity Header with Title, Favorite Button and Audio Toggle */}
          <div className="flex items-start gap-3.5 pb-3 border-b border-cream-200">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-xs border border-cream-200">
              <SmartImage
                src={deityImg}
                alt={currentAarti.deity_name || currentAarti.name_hi}
                aspectRatio="square"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <div>
                  <span className="inline-block text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full mb-1">
                    🕉️ {currentAarti.deity_name}
                  </span>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary leading-tight">
                    {t(currentAarti.name_hi, currentAarti.name_en)}
                  </h2>
                  {currentAarti.source && (
                    <p className="text-xs text-text-muted mt-0.5 truncate">
                      {t('स्रोत', 'Source')}: {currentAarti.source}
                    </p>
                  )}
                </div>

                <FavoriteButton
                  item={{
                    id: currentAarti.id,
                    type: 'aarti',
                    title_hi: currentAarti.name_hi,
                    title_en: currentAarti.name_en,
                    subtitle_hi: currentAarti.deity_name || 'आरती संग्रह',
                    subtitle_en: currentAarti.deity_name || 'Aarti Collection',
                    url: `/knowledge/aarti#${currentAarti.id}`,
                    image_url: deityImg,
                    badge: '🪔 पावन आरती'
                  }}
                  className="p-1.5"
                />
              </div>

              {/* Audio Play Button */}
              {currentAarti.youtube_id && (
                <div className="mt-2.5">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-xl font-hindi text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors',
                      isPlaying
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-saffron-600 text-white shadow-xs'
                    )}
                  >
                    {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                    <span>{isPlaying ? t('आरती रोकें', 'Pause Audio') : t('आरती सुनें', 'Play Aarti')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* YouTube Audio Player if playing */}
          {isPlaying && currentAarti.youtube_id && (
            <div className="aspect-video rounded-xl overflow-hidden border border-cream-300">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentAarti.youtube_id}?autoplay=1`}
                title={currentAarti.name_hi}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Full Aarti Devanagari Lyrics */}
          <div className="p-4 bg-cream-50 rounded-2xl border border-cream-200">
            <pre className="font-sanskrit text-shloka text-text-primary whitespace-pre-wrap leading-loose font-medium text-center">
              {currentAarti.text_sanskrit}
            </pre>
          </div>

          {/* Meaning / Spiritual Significance */}
          <div className="p-3 bg-amber-50/50 rounded-xl text-body-hi text-text-secondary border border-amber-200">
            <strong className="text-saffron-800">🪷 {t('भावार्थ एवं लाभ', 'Essence & Benefit')}: </strong>
            {t(currentAarti.meaning_hi, currentAarti.meaning_en)}
          </div>
        </article>
      )}
    </div>
  );
}
