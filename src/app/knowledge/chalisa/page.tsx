'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { chantsData } from '@/data/chants';
import { getChantImage } from '@/data/imageMap';
import SmartImage from '@/components/ui/SmartImage';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { cn } from '@/lib/utils';
import { Play, Pause, Volume2, Shield } from 'lucide-react';

export default function ChalisaPage() {
  const { t } = useLanguage();
  const chalisas = chantsData.filter(c => c.category === 'chalisa' || c.id === 'bajrang_baan');
  const [selectedChalisaId, setSelectedChalisaId] = useState(chalisas[0]?.id || 'hanuman_chalisa');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const matchedItem = chalisas.find(item => item.id === hash);
      if (matchedItem) {
        setSelectedChalisaId(hash);
      }
    }
  }, [chalisas]);

  const currentChalisa = chalisas.find(c => c.id === selectedChalisaId) || chalisas[0];
  const deityImg = currentChalisa ? getChantImage(currentChalisa.deity_id, 'chalisa') : '';

  return (
    <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-orange-50 via-cream-50 to-amber-100 border-saffron-300">
        <div className="flex items-start gap-3">
          <div>
            <h1 className="font-heading text-2xl text-saffron-800 font-bold">
              {t('चालीसा संग्रह (श्री हनुमान चालीसा आदि)', 'Chalisa Collection')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'श्री हनुमान चालीसा (संपूर्ण दोहा व 40 चौपाई), शिव, दुर्गा, गणेश, कृष्ण, राम, लक्ष्मी, सरस्वती एवं शनि चालीसा।',
                'Complete 40-verse Chalisas of Hanuman, Shiva, Durga, Ganesha, Krishna, Rama, Lakshmi, Saraswati, and Shani.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Chalisa Selector Pills */}
      <div>
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2 px-1">
          {t('चालीसा चुनें', 'Select Chalisa')}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {chalisas.map(c => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedChalisaId(c.id);
                setIsPlaying(false);
              }}
              className={cn(
                'px-4 py-2 rounded-full font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[48px]',
                selectedChalisaId === c.id
                  ? 'bg-saffron-600 text-white shadow-xs'
                  : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
              )}
            >
              {t(c.name_hi, c.name_en)}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Chalisa Details & Text */}
      {currentChalisa && (
        <article id={currentChalisa.id} className="card border-saffron-200 bg-white space-y-4 shadow-sm p-4">
          {/* Header with Visual Deity Image, Title & Favorite Button */}
          <div className="flex items-start gap-3.5 pb-3 border-b border-cream-200">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-xs border border-cream-200">
              <SmartImage
                src={deityImg}
                alt={currentChalisa.deity_name || currentChalisa.name_hi}
                aspectRatio="square"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-1">
                <div>
                  <span className="inline-block text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full mb-1">
                    🕉️ {currentChalisa.deity_name}
                  </span>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary leading-tight">
                    {t(currentChalisa.name_hi, currentChalisa.name_en)}
                  </h2>
                  {currentChalisa.source && (
                    <p className="text-xs text-text-muted mt-0.5 truncate">
                      {t('परंपरा', 'Tradition')}: {currentChalisa.source}
                    </p>
                  )}
                </div>

                <FavoriteButton
                  item={{
                    id: currentChalisa.id,
                    type: 'chalisa',
                    title_hi: currentChalisa.name_hi,
                    title_en: currentChalisa.name_en,
                    subtitle_hi: currentChalisa.deity_name || 'चालीसा संग्रह',
                    subtitle_en: currentChalisa.deity_name || 'Chalisa Collection',
                    url: `/knowledge/chalisa#${currentChalisa.id}`,
                    image_url: deityImg,
                    badge: '🙏 चालीसा'
                  }}
                  className="p-1.5"
                />
              </div>

              {/* Audio Play Button */}
              {currentChalisa.youtube_id && (
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
                    <span>{isPlaying ? t('रोकें', 'Pause') : t('चालीसा सुनें', 'Listen Audio')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* YouTube Video if playing */}
          {isPlaying && currentChalisa.youtube_id && (
            <div className="aspect-video rounded-xl overflow-hidden border border-cream-300">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentChalisa.youtube_id}?autoplay=1`}
                title={currentChalisa.name_hi}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Recitation Benefit */}
          {currentChalisa.benefit_hi && (
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs text-saffron-900 font-medium">
              ✨ <strong>{t('पाठ का फल एवं अनुष्ठान', 'Benefits')}:</strong> {currentChalisa.benefit_hi}
            </div>
          )}

          {/* Full Chalisa Text */}
          <div className="p-4 sm:p-5 bg-cream-50 rounded-2xl border border-cream-200">
            <pre className="font-sanskrit text-shloka text-text-primary whitespace-pre-wrap leading-loose font-medium">
              {currentChalisa.text_sanskrit}
            </pre>
          </div>

          {/* Meaning / English Summary */}
          <div className="p-3 bg-cream-100 rounded-xl text-body-hi text-text-secondary border border-cream-300">
            <strong className="text-saffron-800">📖 {t('सार', 'Essence')}: </strong>
            {t(currentChalisa.meaning_hi, currentChalisa.meaning_en)}
          </div>
        </article>
      )}
    </div>
  );
}
