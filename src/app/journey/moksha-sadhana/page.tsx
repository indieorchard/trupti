'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { Compass, CheckCircle2, Circle, Calendar, ChevronRight, Award } from 'lucide-react';

const phases = [
  {
    phase: 1,
    name_hi: 'प्रथम चरण: शुद्धि (दिन 1–30)',
    name_en: 'Phase 1: Shuddhi (Days 1–30)',
    focus_hi: 'इंद्रिय संयम, सात्विक आहार, प्रातः ब्रह्ममुहूर्त जागरण एवं क्षमा प्रार्थना।',
    focus_en: 'Physical & mental purification, sattvic diet, early awakening, and seeking forgiveness.',
    color: 'border-l-amber-600',
  },
  {
    phase: 2,
    name_hi: 'द्वितीय चरण: समर्पण (दिन 31–60)',
    name_en: 'Phase 2: Samarpan (Days 31–60)',
    focus_hi: 'भगवद्गीता स्वाध्याय, विष्णु सहस्रनाम जप, तीर्थ चिंतन एवं अनासक्ति योग।',
    focus_en: 'Daily Gita study, Vishnu Sahasranama chanting, pilgrimage contemplation, and non-attachment.',
    color: 'border-l-saffron-600',
  },
  {
    phase: 3,
    name_hi: 'तृतीय चरण: मोक्ष (दिन 61–90)',
    name_en: 'Phase 3: Moksha (Days 61–90)',
    focus_hi: 'आत्मसमर्पण, दस महादान संकल्प, शांति पाठ एवं अभय आत्मबोध।',
    focus_en: 'Total surrender (Sharanagati), Dasa Daan resolution, cosmic peace prayer, and fearless soul-awareness.',
    color: 'border-l-sacred-gold',
  },
];

const sampleDays = [
  {
    day: 1,
    phase: 1,
    title_hi: 'संकल्प एवं क्षमापना',
    title_en: 'Resolution & Universal Forgiveness',
    theme_hi: 'मैं इस 90-दिवसीय साधना के माध्यम से अपनी आत्मा को शुद्ध करने का पावन संकल्प लेता हूँ।',
    kriyas_hi: [
      'प्रातः 5 बजे उठकर करदर्शनम् एवं पृथ्वी वंदना',
      'गायत्री मंत्र का 1 माला (108 बार) जप',
      'अपने जीवनकाल के सभी ज्ञात-अज्ञात व्यक्तियों से क्षमा याचना'
    ],
    reading_hi: 'भगवद्गीता अध्याय 2 (श्लोक 11–25: आत्मा की अमरता)',
    reflection_hi: 'आज मैंने किससे क्षमा मांगी और किसे बिना शर्त क्षमा किया?'
  },
  {
    day: 2,
    phase: 1,
    title_hi: 'सात्विक आहार एवं मौन',
    title_en: 'Sattvic Nourishment & Silence',
    theme_hi: 'जैसा अन्न, वैसा मन। भोजन को औषधि और भगवत्प्रसाद मानकर ग्रहण करें।',
    kriyas_hi: [
      'भोजन से पूर्व 15वें अध्याय के श्लोकों का स्मरण',
      'दोपहर में 30 मिनट का मौन व्रत',
      'सायंकाल तुलसी जी के पास दीपक प्रज्वलन'
    ],
    reading_hi: 'भगवद्गीता अध्याय 17 (सात्विक, राजसिक, तामसिक आहार)',
    reflection_hi: 'क्या मेरा आहार आज मेरे मन को शांत रखने में सहायक रहा?'
  },
  {
    day: 31,
    phase: 2,
    title_hi: 'अनासक्ति एवं निष्काम कर्म',
    title_en: 'Detachment & Selfless Devotion',
    theme_hi: 'संसार में जो कुछ भी मेरे पास है, वह मुझे ईश्वर द्वारा सेवा हेतु सौंपी गई धरोहर है।',
    kriyas_hi: [
      'विष्णु सहस्रनाम का शांत पाठ',
      'किसी एक वृद्ध अथवा पशु को अन्न दान',
      'अपने किसी प्रिय भौतिक वस्तु के प्रति मोह का त्याग'
    ],
    reading_hi: 'ईशावास्योपनिषद (तेन त्यक्तेन भुञ्जीथा)',
    reflection_hi: 'आज मैंने किस वस्तु अथवा विचार से अपना स्वामित्व हटाया?'
  },
  {
    day: 61,
    phase: 3,
    title_hi: 'अभय एवं आत्मसमर्पण',
    title_en: 'Fearlessness & Surrender',
    theme_hi: 'शरीर नश्वर है, मैं शाश्वत चैतन्य हूँ। मृत्यु केवल एक वस्त्र बदलना है।',
    kriyas_hi: [
      'महामृत्युंजय मंत्र का 3 माला (324 बार) जप',
      'अंतःकरण में परमात्मा को संपूर्ण भार सौंपने का ध्यान',
      'वैदिक शांति पाठ का 11 बार सस्वर गान'
    ],
    reading_hi: 'कठोपनिषद (नचिकेता-यमराज संवाद) व गीता अध्याय 18.66',
    reflection_hi: 'क्या मेरे मन में मृत्यु का कोई भय शेष है?'
  }
];

export default function MokshaSadhanaPage() {
  const { t } = useLanguage();
  const [currentDay, setCurrentDay] = useState(1);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('trupti_sadhana_completed');
      if (saved) setCompletedDays(JSON.parse(saved));
      const savedDay = localStorage.getItem('trupti_sadhana_current_day');
      if (savedDay) setCurrentDay(parseInt(savedDay, 10));
    }
  }, []);

  const toggleDayCompletion = (day: number) => {
    const next = completedDays.includes(day)
      ? completedDays.filter(d => d !== day)
      : [...completedDays, day];
    setCompletedDays(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('trupti_sadhana_completed', JSON.stringify(next));
    }
  };

  const activeDayData = sampleDays.find(d => d.day === currentDay) || sampleDays[0];
  const progressPercent = Math.round((completedDays.length / 90) * 100);

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-orange-50 to-amber-100 border-saffron-300">
        <div className="flex items-start gap-3">
          <span className="text-4xl">🪷</span>
          <div>
            <h1 className="font-heading text-2xl text-saffron-800 font-bold">
              {t('90-दिवसीय मोक्ष साधना', '90-Day Moksha Sadhana')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'जीवन के अंतिम पड़ाव में वानप्रस्थ एवं आत्म-कल्याण हेतु 3 चरणों का अनुक्रमिक शास्त्रोक्त मार्ग।',
                'A 3-phase scriptural blueprint for senior life-enrichment, peace, and spiritual completion.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="card border-saffron-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-saffron-800 uppercase tracking-wider">
            🏆 {t('साधना प्रगति', 'Sadhana Progress')}
          </span>
          <span className="text-sm font-bold text-text-primary">
            {completedDays.length} / 90 {t('दिन पूर्ण', 'Days Done')} ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-3 bg-cream-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-saffron-500 to-sacred-gold rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Three Phases Overview */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider px-1">
          {t('साधना के तीन सोपान', 'Three Progressive Phases')}
        </h2>
        {phases.map(p => (
          <div
            key={p.phase}
            className={cn('card border-l-4 p-3.5', p.color)}
          >
            <h3 className="font-heading text-lg font-bold text-text-primary">
              {t(p.name_hi, p.name_en)}
            </h3>
            <p className="text-xs text-text-secondary mt-1 leading-normal">
              {t(p.focus_hi, p.focus_en)}
            </p>
          </div>
        ))}
      </div>

      {/* Day Selector Quick Nav */}
      <div className="card space-y-3 border-cream-200">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-saffron-800">
            📅 {t(`दिन ${currentDay} की साधना`, `Day ${currentDay} Sadhana`)}
          </h3>
          <button
            onClick={() => toggleDayCompletion(currentDay)}
            className={cn(
              'px-3.5 py-1.5 rounded-xl font-hindi text-xs font-bold flex items-center gap-1.5 transition-colors min-h-[40px]',
              completedDays.includes(currentDay)
                ? 'bg-emerald-600 text-white'
                : 'bg-cream-200 text-text-secondary hover:bg-cream-300'
            )}
          >
            {completedDays.includes(currentDay) ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            <span>{completedDays.includes(currentDay) ? t('दिन पूर्ण ✅', 'Completed') : t('पूर्ण चिह्नित करें', 'Mark Done')}</span>
          </button>
        </div>

        {/* Day Theme */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
          <span className="text-xs font-bold text-saffron-800 uppercase block mb-1">
            🌟 {t('आज का दिव्य सूत्र', 'Today\'s Core Theme')}:
          </span>
          <p className="font-heading text-lg font-bold text-saffron-950">
            {activeDayData.title_hi}
          </p>
          <p className="text-body-hi text-text-secondary mt-1">
            {activeDayData.theme_hi}
          </p>
        </div>

        {/* Prescribed Kriyas */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-text-muted uppercase block">
            ✅ {t('आज की क्रियाएं', 'Prescribed Daily Kriyas')}:
          </span>
          <ul className="space-y-1 text-body-hi text-text-secondary">
            {activeDayData.kriyas_hi.map((k, i) => (
              <li key={i} className="flex items-start gap-2 p-2 bg-cream-50 rounded-lg">
                <span className="text-saffron-600 font-bold">{i + 1}.</span>
                <span>{k}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Daily Reading */}
        <div className="p-2.5 bg-cream-100 rounded-lg text-xs text-text-secondary">
          <strong>📖 {t('स्वाध्याय पाठ', 'Scripture Reading')}:</strong> {activeDayData.reading_hi}
        </div>

        {/* Evening Contemplation */}
        <div className="p-2.5 bg-purple-50 rounded-lg border border-purple-200 text-xs text-purple-950">
          <strong>🌙 {t('सायं आत्मचिंतन', 'Evening Reflection')}:</strong> {activeDayData.reflection_hi}
        </div>

        {/* Day Selector Buttons */}
        <div className="flex gap-2 pt-2 overflow-x-auto pb-1 scrollbar-none">
          {[1, 2, 3, 5, 10, 15, 21, 30, 31, 45, 60, 61, 75, 90].map(d => (
            <button
              key={d}
              onClick={() => setCurrentDay(d)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-bold font-hindi flex-shrink-0 min-h-[40px]',
                currentDay === d
                  ? 'bg-saffron-600 text-white'
                  : 'bg-cream-100 text-text-secondary hover:bg-cream-200'
              )}
            >
              {t(`दिन ${d}`, `Day ${d}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
