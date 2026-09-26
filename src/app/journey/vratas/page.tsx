'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { vratasData } from '@/data/vratas';
import { cn } from '@/lib/utils';
import { Calendar, Check, X, Info } from 'lucide-react';

export default function VratasPage() {
  const { t } = useLanguage();
  const [selectedVrataId, setSelectedVrataId] = useState(vratasData[0]?.id || 'ekadashi');

  const selectedVrata = vratasData.find(v => v.id === selectedVrataId) || vratasData[0];

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-blue-50 to-indigo-100 border-indigo-200">
        <div className="flex items-start gap-3">
          <span className="text-4xl">🗓️</span>
          <div>
            <h1 className="font-heading text-2xl text-indigo-900 font-bold">
              {t('सनातन व्रत कैलेंडर एवं पारण विधि', 'Vrata Calendar & Fasting Rules')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'एकादशी, प्रदोष, मासिक शिवरात्रि, नवरात्रि एवं पितृपक्ष श्राद्ध के नियम, ग्राह्य-अग्राह्य आहार एवं पारण समय।',
                'Comprehensive fasting guidelines, permitted foods, and parana rules for Ekadashi, Pradosha, and Navratri.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Vrata Selector Horizontal Pills */}
      <div>
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2 px-1">
          {t('व्रत का चयन करें', 'Select Vrata Observance')}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {vratasData.map(v => (
            <button
              key={v.id}
              onClick={() => setSelectedVrataId(v.id)}
              className={cn(
                'px-4 py-2 rounded-xl font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[44px]',
                selectedVrataId === v.id
                  ? 'bg-indigo-700 text-white shadow-sm'
                  : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
              )}
            >
              {t(v.name_hi, v.name_en)}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Vrata Card */}
      {selectedVrata && (
        <article className="card border-indigo-200 bg-white space-y-4 shadow-sm">
          <div>
            <span className="text-xs font-bold bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full">
              🕉️ {selectedVrata.deity_name} • {selectedVrata.frequency}
            </span>
            <h2 className="font-heading text-2xl font-bold text-text-primary mt-1">
              {t(selectedVrata.name_hi, selectedVrata.name_en)}
            </h2>
            {selectedVrata.tithi_info && (
              <p className="text-xs text-text-muted mt-0.5 font-hindi">
                📅 <strong>{t('तिथि', 'Tithi')}:</strong> {selectedVrata.tithi_info}
              </p>
            )}
          </div>

          {/* Significance */}
          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-200">
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">
              ✨ {t('व्रत का महत्व एवं फल', 'Significance & Spiritual Fruit')}
            </h3>
            <p className="text-body-hi text-text-secondary leading-relaxed">
              {selectedVrata.significance_hi}
            </p>
          </div>

          {/* Fasting Rules */}
          <div className="p-3 bg-cream-50 rounded-xl border border-cream-200 space-y-1">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
              📜 {t('उपवास विधि एवं नियम', 'Fasting Rules')}
            </h3>
            <p className="text-body-hi text-text-secondary leading-relaxed">
              {t(selectedVrata.fasting_rules_hi, selectedVrata.fasting_rules_en)}
            </p>
          </div>

          {/* Permitted vs Prohibited Foods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Permitted */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-2">
                <Check size={16} className="text-emerald-700" />
                <span>{t('ग्राह्य (खाने योग्य) फलाहार', 'Permitted Foods')}</span>
              </div>
              <ul className="space-y-1 text-xs text-emerald-950 font-medium">
                {selectedVrata.permitted_foods.map((food, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prohibited */}
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 mb-2">
                <X size={16} className="text-rose-700" />
                <span>{t('अग्राह्य (वर्जित) भोजन', 'Prohibited Foods')}</span>
              </div>
              <ul className="space-y-1 text-xs text-rose-950 font-medium">
                {selectedVrata.prohibited_foods.map((food, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Parana Guidelines */}
          {selectedVrata.parana_guidelines_hi && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950">
              ⏰ <strong>{t('पारण विधि (व्रत खोलना)', 'Parana Rules')}:</strong> {selectedVrata.parana_guidelines_hi}
            </div>
          )}
        </article>
      )}
    </div>
  );
}
