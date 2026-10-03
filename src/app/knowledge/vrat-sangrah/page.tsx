'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useFavorites } from '@/hooks/useFavorites';
import { getDeityImage } from '@/data/imageMap';
import SmartImage from '@/components/ui/SmartImage';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { cn } from '@/lib/utils';
import { Check, X, AlertCircle, Clock, Calendar, Sparkles, Heart } from 'lucide-react';

import { vratasData } from '@/data/vratas';

export default function VratSangrahPage() {
  const { t } = useLanguage();
  
  const detailedVratSangrah = vratasData.filter(v => v.diet_rules);
  const [selectedVratId, setSelectedVratId] = useState(detailedVratSangrah[0]?.id);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const matchedItem = detailedVratSangrah.find(item => item.id === hash);
      if (matchedItem) {
        setSelectedVratId(hash);
      }
    }
  }, [detailedVratSangrah]);

  const activeVrat = detailedVratSangrah.find(v => v.id === selectedVratId) || detailedVratSangrah[0];
  const deityImg = activeVrat?.image_url || getDeityImage(activeVrat?.deity_id || '');

  return (
    <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-blue-50 via-cream-50 to-indigo-100 border-indigo-200">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h1 className="font-hindi text-lg text-indigo-950 font-bold">
              {t('व्रत संग्रह एवं आहार परामर्श', 'Vrat Sangrah & Diet Considerations')}
            </h1>
            <p className="text-base text-text-secondary mt-1">
              {t(
                'सनातन धर्म के प्रमुख व्रत, पूजा विधि, ग्राह्य-वर्जित फलाहार एवं वरिष्ठ नागरिकों (60+) हेतु स्वास्थ्य-रक्षा नियम।',
                'Major Hindu fasts, puja rituals, permitted/prohibited diets, and senior-friendly fasting exemptions.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Vrat Selector */}
      <div>
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2 px-1">
          {t('व्रत का चयन करें', 'Select Vrat')}
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {detailedVratSangrah.map(v => (
            <button
              key={v.id}
              onClick={() => setSelectedVratId(v.id)}
              className={cn(
                'px-4 py-2 rounded-full font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[48px]',
                selectedVratId === v.id
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
              )}
            >
              {t(v.name_hi, v.name_en)}
            </button>
          ))}
        </div>
      </div>

      {/* Active Vrat Detailed Card with Visual Deity Image */}
      {activeVrat && activeVrat.diet_rules && (
        <article id={activeVrat.id} className="card border-indigo-200 bg-white space-y-4 shadow-sm p-4">
          {/* Header with Visual Deity Image, Title & Favorite Button */}
          <div className="flex items-start gap-3 pb-3 border-b border-cream-200">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-xs border border-cream-200">
              <SmartImage
                src={deityImg}
                alt={activeVrat.deity_name || activeVrat.name_hi}
                aspectRatio="square"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block text-sm font-bold bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full mb-1">
                    🕉️ {activeVrat.deity_name} • {activeVrat.frequency}
                  </span>
                  <h2 className="font-hindi text-lg sm:text-lg font-bold text-text-primary leading-tight">
                    {t(activeVrat.name_hi, activeVrat.name_en)}
                  </h2>
                  <p className="text-xs text-text-muted mt-0.5 font-hindi truncate">
                    📅 <strong>{t('तिथि', 'Tithi')}:</strong> {activeVrat.tithi_info}
                  </p>
                </div>

                <FavoriteButton
                  item={{
                    id: activeVrat.id,
                    title_hi: activeVrat.name_hi,
                    title_en: activeVrat.name_en,
                    subtitle_hi: activeVrat.deity_name,
                    subtitle_en: activeVrat.deity_name,
                    type: 'vrat',
                    url: `/knowledge/vrat-sangrah#${activeVrat.id}`,
                    image_url: deityImg,
                    badge: '🗓️ व्रत संग्रह'
                  }}
                  className="p-1.5 flex-shrink-0"
                />
              </div>
            </div>
          </div>

          {/* Spiritual Significance */}
          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-200">
            <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">
              ✨ {t('व्रत का महत्व एवं फलश्रुति', 'Spiritual Significance')}
            </h3>
            <p className="text-base text-text-secondary leading-relaxed">
              {t(activeVrat.significance_hi, activeVrat.significance_hi)}
            </p>
          </div>

          {/* SECTION: RECOMMENDED DIET CONSIDERATIONS (आहार परामर्श) */}
          <section className="space-y-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">🥗</span>
              <h3 className="font-hindi text-lg font-bold text-indigo-950">
                {t('आहार परामर्श एवं उपवास नियम', 'Dietary Guidelines & Rules')}
              </h3>
            </div>

            {/* Permitted & Prohibited Foods Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Permitted Foods (ग्राह्य / अनुमत आहार) */}
              <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm font-hindi">
                  <Check size={18} className="text-emerald-700 stroke-[2.5]" />
                  <span>{t('क्या खाएं (ग्राह्य फलाहार)', 'Permitted Foods')}</span>
                </div>
                <ul className="space-y-1 text-xs sm:text-sm text-text-secondary font-hindi pl-2">
                  {activeVrat.diet_rules.permitted_hi.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prohibited Foods (वर्जित आहार) */}
              <div className="p-3.5 bg-rose-50/70 rounded-xl border border-rose-200 space-y-2">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-sm font-hindi">
                  <X size={18} className="text-rose-700 stroke-[2.5]" />
                  <span>{t('क्या न खाएं (पूर्ण वर्जित)', 'Strictly Prohibited')}</span>
                </div>
                <ul className="space-y-1 text-xs sm:text-sm text-text-secondary font-hindi pl-2">
                  {activeVrat.diet_rules.prohibited_hi.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Water / Hydration Guideline */}
            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 flex items-start gap-2.5">
              <span className="text-lg">💧</span>
              <div className="text-xs sm:text-sm text-text-secondary">
                <strong className="text-blue-900 font-hindi">{t('जल एवं पेय नियम', 'Hydration Rule')}: </strong>
                <span>{activeVrat.diet_rules.water_rule_hi}</span>
              </div>
            </div>

            {/* CRITICAL FOR 60+: Elderly & Medical Health Consideration */}
            <div className="p-3.5 bg-amber-50 rounded-xl border-2 border-amber-300 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm font-hindi">
                <Heart size={18} className="text-amber-700 fill-amber-700" />
                <span>{t('वरिष्ठ नागरिकों (60+) एवं रोगियों हेतु विशेष छूट ("असमर्थे अनुकल्पः")', 'Senior & Health Considerations ("Asamarthe Anukalpah")')}</span>
              </div>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-hindi">
                {activeVrat.diet_rules.elderly_guideline_hi}
              </p>
              <div className="p-2 bg-white/70 rounded-lg text-sm text-amber-900/90 italic font-hindi">
                📖 <em>{t('स्मृति वचन: "शरीरमाद्यं खलु धर्मसाधनम्" — शरीर की रक्षा धर्म का प्रथम साधन है। अस्वस्थता में प्राण रक्षा सर्वोपरि है।', 'Scriptural principle: The physical body is the foremost instrument of Dharma. Health preservation takes precedence.')}</em>
              </div>
            </div>

            {/* Parana Timing & Method */}
            <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 flex items-start gap-2.5">
              <Clock size={18} className="text-indigo-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-text-secondary">
                <strong className="text-indigo-950 font-hindi">{t('पारण मुहूर्त एवं विधि', 'Parana (Breaking Fast)')}: </strong>
                <span>{activeVrat.diet_rules.parana_timing_hi}</span>
              </div>
            </div>
          </section>
        </article>
      )}
    </div>
  );
}
