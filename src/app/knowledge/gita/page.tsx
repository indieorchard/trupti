'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { gitasData } from '@/data/gitas';
import { getScriptureImage } from '@/data/imageMap';
import SmartImage from '@/components/ui/SmartImage';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { cn } from '@/lib/utils';
import { BookOpen, ExternalLink, ChevronRight, CheckCircle2, Bookmark } from 'lucide-react';

export default function GitaPage() {
  const { t } = useLanguage();
  const [selectedGitaId, setSelectedGitaId] = useState('bhagavad_gita');
  const [selectedChapterNumber, setSelectedChapterNumber] = useState(1);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const matchedItem = gitasData.find(item => item.id === hash);
      if (matchedItem) {
        setSelectedGitaId(hash);
        setSelectedChapterNumber(1);
      }
    }
  }, []);

  const selectedGita = gitasData.find(g => g.id === selectedGitaId) || gitasData[0];
  const bhagavadGita = gitasData.find(g => g.id === 'bhagavad_gita')!;
  const currentChapter = selectedGita.chapters?.find(c => c.chapter_number === selectedChapterNumber) || selectedGita.chapters?.[0];
  const gitaImg = getScriptureImage(selectedGita.id);

  return (
    <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-amber-50 via-cream-50 to-saffron-100 border-saffron-300">
        <div className="flex items-start gap-3">
          <div>
            <h1 className="font-heading text-2xl text-saffron-800 font-bold">
              {t('गीता महाभंडार — 14+ पवित्र गीताएं', 'Gita Treasury — 14+ Sacred Gitas')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'श्रीमद्भगवद्गीता के समस्त 18 अध्यायों के सार व प्रमुख श्लोकों सहित अष्टावक्र, अवधूत, उद्धव, ऋभु, गुरु गीता आदि का संपूर्ण अध्ययन।',
                'Complete 18-chapter Bhagavad Gita study alongside Ashtavakra, Avadhuta, Uddhava, Ribhu, and Guru Gitas.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Gita Selector Pills */}
      <div>
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2 px-1">
          {t('गीता चयन करें', 'Select Gita Scripture')}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {gitasData.map(g => (
            <button
              key={g.id}
              onClick={() => {
                setSelectedGitaId(g.id);
                setSelectedChapterNumber(1);
              }}
              className={cn(
                'px-4 py-2 rounded-full font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[48px]',
                selectedGitaId === g.id
                  ? 'bg-saffron-600 text-white shadow-xs'
                  : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
              )}
            >
              {t(g.name_hi, g.name_en)}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Gita Details Card with Visual Image */}
      <article id={selectedGita.id} className="card border-saffron-200 bg-white p-4 space-y-3.5 shadow-sm">
        <div className="flex items-start gap-3 pb-2 border-b border-cream-200">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-xs border border-cream-200">
            <SmartImage
              src={gitaImg}
              alt={selectedGita.name_hi}
              aspectRatio="square"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 mb-1">
                  {selectedGita.tradition}
                </span>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-text-primary leading-tight">
                  {t(selectedGita.name_hi, selectedGita.name_en)}
                </h2>
                <p className="font-sanskrit text-saffron-700 text-xs sm:text-sm truncate">
                  {selectedGita.sanskrit_name}
                </p>
              </div>

              <FavoriteButton
                item={{
                  id: selectedGita.id,
                  type: 'gita',
                  title_hi: selectedGita.name_hi,
                  title_en: selectedGita.name_en,
                  subtitle_hi: selectedGita.tradition,
                  subtitle_en: selectedGita.tradition,
                  url: `/knowledge/gita#${selectedGita.id}`,
                  image_url: gitaImg,
                  badge: '📖 गीता शास्त्र'
                }}
                className="p-1.5 flex-shrink-0"
              />
            </div>

            {selectedGita.pdf_url && (
              <div className="mt-2">
                <a
                  href={selectedGita.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cream-100 hover:bg-cream-200 text-saffron-800 font-hindi text-xs font-semibold transition-colors border border-cream-300"
                >
                  <BookOpen size={14} />
                  <span>{t('मूल PDF पढ़ें', 'Read PDF')}</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Origin / Dialogue Context */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-cream-50 p-2.5 rounded-xl border border-cream-200 text-text-secondary">
          <div>
            <strong>{t('मूल स्रोत', 'Source')}:</strong> {selectedGita.source_text}
          </div>
          <div>
            <strong>{t('संवाद', 'Dialogue')}:</strong> {selectedGita.narrator} → {selectedGita.listener}
          </div>
          <div>
            <strong>{t('अध्याय संख्या', 'Chapters')}:</strong> {selectedGita.chapters_count}
            {selectedGita.total_verses ? ` (${selectedGita.total_verses} श्लोक)` : ''}
          </div>
        </div>

        {/* Core Philosophy */}
        <div>
          <h3 className="text-sm font-bold text-saffron-800">
            🪷 {t('मूल दर्शन एवं सार', 'Core Philosophy & Essence')}
          </h3>
          <p className="text-body-hi text-text-secondary mt-1 leading-relaxed">
            {t(selectedGita.core_philosophy_hi, selectedGita.core_philosophy_en)}
          </p>
        </div>

        {/* Key Teachings */}
        {selectedGita.key_teachings_hi.length > 0 && (
          <div className="pt-2.5 border-t border-cream-200">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
              ✨ {t('प्रमुख दिव्य शिक्षाएं', 'Key Divine Teachings')}
            </h3>
            <ul className="space-y-1.5 text-body-hi text-text-secondary">
              {selectedGita.key_teachings_hi.map((teaching, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-saffron-600 font-bold">•</span>
                  <span>{teaching}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>

      {/* Chapters Explorer for Bhagavad Gita */}
      {selectedGita.chapters && selectedGita.chapters.length > 0 && (
        <section className="card space-y-3 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-saffron-800">
              📜 {t('अध्याय वार अध्ययन', 'Chapter-wise Study')}
            </h3>
            <span className="text-xs text-text-muted font-hindi">
              {t(`कुल ${selectedGita.chapters.length} अध्याय`, `Total ${selectedGita.chapters.length} Chapters`)}
            </span>
          </div>

          {/* Chapter Selector Dropdown / Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {selectedGita.chapters.map((ch) => (
              <button
                key={ch.chapter_number}
                onClick={() => setSelectedChapterNumber(ch.chapter_number)}
                className={cn(
                  'min-w-[48px] h-[48px] rounded-xl flex items-center justify-center font-hindi text-sm font-bold transition-colors',
                  selectedChapterNumber === ch.chapter_number
                    ? 'bg-saffron-600 text-white shadow-xs'
                    : 'bg-cream-100 text-text-secondary hover:bg-cream-200 border border-cream-300'
                )}
                aria-label={`अध्याय ${ch.chapter_number}`}
              >
                {ch.chapter_number}
              </button>
            ))}
          </div>

          {/* Selected Chapter View */}
          {currentChapter && (
            <div className="p-4 bg-cream-50/70 rounded-2xl border border-cream-200 space-y-3">
              <div>
                <span className="text-xs font-bold text-saffron-700 uppercase tracking-wider font-hindi">
                  {t(`अध्याय ${currentChapter.chapter_number}`, `Chapter ${currentChapter.chapter_number}`)}
                  {` • ${currentChapter.shlokas_count} ${t('श्लोक', 'Shlokas')}`}
                </span>
                <h4 className="font-heading text-xl font-bold text-text-primary mt-0.5">
                  {t(currentChapter.title_hi, currentChapter.title_en)}
                </h4>
                <p className="font-sanskrit text-saffron-800 text-xs sm:text-sm">
                  {currentChapter.title_sanskrit}
                </p>
              </div>

              <p className="text-body-hi text-text-secondary leading-relaxed">
                {t(currentChapter.summary_hi, currentChapter.summary_en)}
              </p>

              {/* Key Shloka of the Chapter */}
              {currentChapter.key_shloka && (
                <div className="p-3.5 bg-white rounded-xl border-l-4 border-saffron-600 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-saffron-800">
                    <span>🌟 {t('अध्याय का महाश्लोक', 'Key Shloka')}</span>
                    <span>{currentChapter.key_shloka.shloka_number}</span>
                  </div>
                  <pre className="font-sanskrit text-shloka text-center text-text-primary whitespace-pre-wrap leading-relaxed font-medium">
                    {currentChapter.key_shloka.sanskrit}
                  </pre>
                  <p className="text-xs font-hindi text-text-secondary italic text-center">
                    {currentChapter.key_shloka.transliteration}
                  </p>
                  <div className="pt-2 border-t border-cream-200 text-body-hi text-text-secondary">
                    <strong className="text-saffron-800">{t('हिंदी अर्थ', 'Meaning')}: </strong>
                    {t(currentChapter.key_shloka.meaning_hi, currentChapter.key_shloka.meaning_en)}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
