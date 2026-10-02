'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { chantsData } from '@/data/chants';
import { getChantImage } from '@/data/imageMap';
import SmartImage from '@/components/ui/SmartImage';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { cn } from '@/lib/utils';
import { Play, Pause, Bell, Shield, Sparkles } from 'lucide-react';

export default function StotraPage() {
  const { t } = useLanguage();
  const stotras = chantsData.filter(c => c.category === 'stotra' || c.category === 'shloka' || c.category === 'sukta');
  const [selectedStotraId, setSelectedStotraId] = useState(stotras[0]?.id || 'shiva_tandava_stotra');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const matchedItem = stotras.find(item => item.id === hash);
      if (matchedItem) {
        setSelectedStotraId(hash);
      }
    }
  }, [stotras]);

  const currentStotra = stotras.find(s => s.id === selectedStotraId) || stotras[0];
  const deityImg = currentStotra ? getChantImage(currentStotra.deity_id, currentStotra.category) : '';

  return (
    <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-purple-50 via-cream-50 to-amber-100 border-saffron-300">
        <div className="flex items-start gap-3">
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
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {stotras.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedStotraId(s.id);
                setIsPlaying(false);
              }}
              className={cn(
                'px-4 py-2 rounded-full font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[48px]',
                selectedStotraId === s.id
                  ? 'bg-saffron-600 text-white shadow-xs'
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
        <article id={currentStotra.id} className="card border-saffron-200 bg-white space-y-4 shadow-sm p-4">
          {/* Header with Visual Deity Image, Title & Favorite Button */}
          <div className="flex items-start gap-3 pb-3 border-b border-cream-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-xs border border-cream-200">
              <SmartImage
                src={deityImg}
                alt={currentStotra.deity_name || currentStotra.name_hi}
                aspectRatio="square"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block text-[11px] font-bold bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full mb-1">
                    🕉️ {currentStotra.deity_name}
                  </span>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary leading-tight">
                    {t(currentStotra.name_hi, currentStotra.name_en)}
                  </h2>
                  {currentStotra.source && (
                    <p className="text-xs text-text-muted mt-0.5 truncate">
                      {t('स्रोत', 'Source')}: {currentStotra.source}
                    </p>
                  )}
                </div>

                <FavoriteButton
                  item={{
                    id: currentStotra.id,
                    type: currentStotra.category === 'sukta' ? 'sukta' : 'stotra',
                    title_hi: currentStotra.name_hi,
                    title_en: currentStotra.name_en,
                    subtitle_hi: currentStotra.deity_name || 'स्तोत्र भंडार',
                    subtitle_en: currentStotra.deity_name || 'Stotra Library',
                    url: `/knowledge/stotra#${currentStotra.id}`,
                    image_url: deityImg,
                    badge: '🔔 स्तोत्र व मंत्र'
                  }}
                  className="p-1.5 flex-shrink-0"
                />
              </div>

              {/* Audio Play Button */}
              {currentStotra.youtube_id && (
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
                    <span>{isPlaying ? t('रोकें', 'Pause') : t('स्तोत्र सुनें', 'Listen Stotra')}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* YouTube Video if playing */}
          {isPlaying && currentStotra.youtube_id && (
            <div className="aspect-video rounded-xl overflow-hidden border border-cream-300">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentStotra.youtube_id}?autoplay=1`}
                title={currentStotra.name_hi}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Benefit Badge */}
          {currentStotra.benefit_hi && (
            <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 text-xs text-purple-900 font-medium">
              ✨ <strong>{t('आध्यात्मिक फल', 'Spiritual Benefit')}:</strong> {currentStotra.benefit_hi}
            </div>
          )}

          {/* Full Stotra Text */}
          <div className="p-4 sm:p-5 bg-cream-50 rounded-2xl border border-cream-200">
            <pre className="font-sanskrit text-shloka text-text-primary whitespace-pre-wrap leading-loose font-medium text-center">
              {currentStotra.text_sanskrit}
            </pre>
          </div>

          {/* Meaning / English Summary */}
          <div className="p-3 bg-cream-100 rounded-xl text-body-hi text-text-secondary border border-cream-300">
            <strong className="text-saffron-800">📖 {t('भावार्थ', 'Meaning')}: </strong>
            {t(currentStotra.meaning_hi, currentStotra.meaning_en)}
          </div>
        </article>
      )}
    </div>
  );
}
