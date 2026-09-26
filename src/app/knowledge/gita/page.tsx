'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { gitasData } from '@/data/gitas';
import { cn } from '@/lib/utils';
import { BookOpen, ExternalLink, ChevronRight, CheckCircle2, Bookmark } from 'lucide-react';

export default function GitaPage() {
  const { t } = useLanguage();
  const [selectedGitaId, setSelectedGitaId] = useState('bhagavad_gita');
  const [selectedChapterNumber, setSelectedChapterNumber] = useState(1);

  const selectedGita = gitasData.find(g => g.id === selectedGitaId) || gitasData[0];
  const bhagavadGita = gitasData.find(g => g.id === 'bhagavad_gita')!;
  const currentChapter = selectedGita.chapters?.find(c => c.chapter_number === selectedChapterNumber) || selectedGita.chapters?.[0];

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-amber-50 to-saffron-100 border-saffron-300">
        <div className="flex items-start gap-3">
          <span className="text-4xl">📖</span>
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
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {gitasData.map(g => (
            <button
              key={g.id}
              onClick={() => {
                setSelectedGitaId(g.id);
                setSelectedChapterNumber(1);
              }}
              className={cn(
                'px-4 py-2 rounded-xl font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[44px]',
                selectedGitaId === g.id
                  ? 'bg-saffron-600 text-white shadow-sm'
                  : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
              )}
            >
              {t(g.name_hi, g.name_en)}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Gita Details Card */}
      <article className="card border-saffron-200">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
              {selectedGita.tradition}
            </span>
            <h2 className="font-heading text-2xl font-bold text-text-primary mt-1">
              {t(selectedGita.name_hi, selectedGita.name_en)}
            </h2>
            <p className="font-sanskrit text-saffron-700 text-sm">
              {selectedGita.sanskrit_name}
            </p>
          </div>

          {selectedGita.pdf_url && (
            <a
              href={selectedGita.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-cream-200 text-saffron-800 hover:bg-cream-300 font-hindi text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[40px]"
            >
              <BookOpen size={15} />
              <span>{t('मूल ग्रंथ / PDF पढ़ें', 'Read Original PDF')}</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>

        {/* Origin / Dialogue Context */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-cream-100 p-2.5 rounded-lg text-text-secondary">
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
        <div className="mt-3">
          <h3 className="text-sm font-bold text-saffron-800">
            🪷 {t('मूल दर्शन एवं सार', 'Core Philosophy & Essence')}
          </h3>
          <p className="text-body-hi text-text-secondary mt-1 leading-relaxed">
            {t(selectedGita.core_philosophy_hi, selectedGita.core_philosophy_en)}
          </p>
        </div>

        {/* Key Teachings */}
        {selectedGita.key_teachings_hi.length > 0 && (
          <div className="mt-3 pt-3 border-t border-cream-200">
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

      {/* BHAGAVAD GITA CHAPTER-BY-CHAPTER INTERACTIVE READER */}
      {selectedGita.id === 'bhagavad_gita' && selectedGita.chapters && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-xl font-bold text-text-primary">
              📜 {t('भगवद्गीता 18 अध्याय अध्ययन', 'Bhagavad Gita 18 Chapters')}
            </h3>
            <span className="text-xs text-text-muted font-hindi">
              {t(`अध्याय ${selectedChapterNumber}/18`, `Chapter ${selectedChapterNumber}/18`)}
            </span>
          </div>

          {/* Chapter Quick Scroll Bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {selectedGita.chapters.map(ch => (
              <button
                key={ch.chapter_number}
                onClick={() => setSelectedChapterNumber(ch.chapter_number)}
                className={cn(
                  'w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm transition-all flex-shrink-0',
                  selectedChapterNumber === ch.chapter_number
                    ? 'bg-saffron-600 text-white shadow-md scale-105'
                    : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
                )}
                aria-label={`Chapter ${ch.chapter_number}`}
              >
                {ch.chapter_number}
              </button>
            ))}
          </div>

          {/* Active Chapter Details */}
          {currentChapter && (
            <article className="card border-saffron-200 bg-white shadow-sm space-y-3">
              <div>
                <span className="text-xs font-bold text-saffron-700 bg-saffron-100 px-2.5 py-0.5 rounded-full">
                  {t(`अध्याय ${currentChapter.chapter_number}`, `Chapter ${currentChapter.chapter_number}`)} • {currentChapter.shlokas_count} {t('श्लोक', 'Shlokas')}
                </span>
                <h4 className="font-heading text-2xl font-bold text-text-primary mt-1.5">
                  {t(currentChapter.title_hi, currentChapter.title_en)}
                </h4>
                <p className="font-sanskrit text-saffron-800 text-base">
                  {currentChapter.title_sanskrit}
                </p>
              </div>

              {/* Chapter Summary */}
              <div className="p-3 bg-cream-50 rounded-xl border border-cream-200">
                <span className="text-xs font-bold text-text-muted block mb-1">
                  📖 {t('अध्याय सार', 'Chapter Summary')}:
                </span>
                <p className="text-body-hi text-text-secondary leading-relaxed">
                  {t(currentChapter.summary_hi, currentChapter.summary_en)}
                </p>
              </div>

              {/* Key Shloka of the Chapter */}
              {currentChapter.key_shloka && (
                <div className="p-4 bg-gradient-to-br from-amber-50 to-cream-100 rounded-xl border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-saffron-800 bg-amber-200/60 px-2 py-0.5 rounded">
                      💎 {t('प्रमुख महाश्लोक', 'Pivotal Shloka')} ({currentChapter.key_shloka.shloka_number})
                    </span>
                  </div>

                  <p className="font-sanskrit text-shloka text-saffron-950 font-bold text-center py-2 leading-loose">
                    {currentChapter.key_shloka.sanskrit}
                  </p>

                  <p className="text-xs font-mono text-text-muted text-center italic">
                    {currentChapter.key_shloka.transliteration}
                  </p>

                  <div className="pt-2 border-t border-amber-200/80 text-body-hi text-text-primary">
                    <strong>{t('हिंदी अर्थ', 'Meaning')}:</strong> {t(currentChapter.key_shloka.meaning_hi, currentChapter.key_shloka.meaning_en)}
                  </div>
                </div>
              )}

              {/* Chapter Navigation Buttons */}
              <div className="flex justify-between pt-2">
                <button
                  disabled={selectedChapterNumber === 1}
                  onClick={() => setSelectedChapterNumber(p => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-xl bg-cream-100 text-text-secondary disabled:opacity-40 font-hindi font-medium min-h-[44px]"
                >
                  ← {t('पिछला अध्याय', 'Previous')}
                </button>
                <button
                  disabled={selectedChapterNumber === 18}
                  onClick={() => setSelectedChapterNumber(p => Math.min(18, p + 1))}
                  className="px-4 py-2 rounded-xl bg-saffron-600 text-white disabled:opacity-40 font-hindi font-medium min-h-[44px]"
                >
                  {t('अगला अध्याय', 'Next')} →
                </button>
              </div>
            </article>
          )}
        </section>
      )}
    </div>
  );
}
