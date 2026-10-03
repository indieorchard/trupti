'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import type { Prahar } from '@/types';

interface ChecklistItem {
  id: string;
  time: string;
  name_hi: string;
  name_en: string;
  emoji: string;
  prahar: Prahar[];
  hasAudio: boolean;
}

const dailyKriyas: ChecklistItem[] = [
  {
    id: 'karadarshanam',
    time: '04:00',
    name_hi: 'ब्रह्म मुहूर्त जागरण और करदर्शनम्',
    name_en: 'Brahma Muhurta Awakening & Karadarshanam',
    emoji: '🌅',
    prahar: ['brahma_muhurta', 'nisha'],
    hasAudio: false,
  },
  {
    id: 'snana',
    time: '04:30',
    name_hi: 'शौच, स्नान और शुद्धि',
    name_en: 'Shaucha, Snana & Shuddhi',
    emoji: '🚿',
    prahar: ['brahma_muhurta'],
    hasAudio: true,
  },
  {
    id: 'sandhyavandana_pratah',
    time: '05:15',
    name_hi: 'प्रातः संध्यावंदन और गायत्री जप (108×)',
    name_en: 'Morning Sandhyavandana & Gayatri Japa (108×)',
    emoji: '🙏',
    prahar: ['brahma_muhurta', 'pratah'],
    hasAudio: true,
  },
  {
    id: 'pranayama',
    time: '06:00',
    name_hi: 'प्राणायाम, त्राटक और योग आसन',
    name_en: 'Pranayama, Trataka & Yoga Asanas',
    emoji: '🧘',
    prahar: ['pratah'],
    hasAudio: true,
  },
  {
    id: 'panchayajna',
    time: '07:00',
    name_hi: 'पंचमहायज्ञ',
    name_en: 'Panchamahayajna (Five Daily Offerings)',
    emoji: '🔥',
    prahar: ['pratah'],
    hasAudio: false,
  },
  {
    id: 'madhyahna',
    time: '12:00',
    name_hi: 'मध्याह्न संध्या और सात्विक भोजन',
    name_en: 'Midday Prayer & Sattvic Meal',
    emoji: '🕉️',
    prahar: ['madhyahna', 'aparahna'],
    hasAudio: true,
  },
  {
    id: 'svadhyaya',
    time: '04:30 PM',
    name_hi: 'स्वाध्याय — शास्त्र चिंतन',
    name_en: 'Svādhyāya — Scriptural Contemplation',
    emoji: '📖',
    prahar: ['sayam'],
    hasAudio: true,
  },
  {
    id: 'sandhya_sayam',
    time: '06:30 PM',
    name_hi: 'सायं संध्या, दीप प्रज्वलन और आरती',
    name_en: 'Evening Sandhya, Lamp Lighting & Aarti',
    emoji: '🪔',
    prahar: ['sayam', 'pradosha'],
    hasAudio: true,
  },
  {
    id: 'likhita_japa',
    time: '07:30 PM',
    name_hi: 'लिखित जप / नाम संकीर्तन',
    name_en: 'Likhita Japa / Nama Sankirtan',
    emoji: '✍️',
    prahar: ['pradosha'],
    hasAudio: false,
  },
  {
    id: 'kshama',
    time: '09:00 PM',
    name_hi: 'क्षमा प्रार्थना, योग निद्रा और शयन',
    name_en: 'Kshama Prarthana, Yoga Nidra & Rest',
    emoji: '🌙',
    prahar: ['ratri'],
    hasAudio: true,
  },
];

export default function DailyChecklist({ prahar }: { prahar: Prahar }) {
  const { t } = useLanguage();
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Highlight current prahar items
  const isCurrentPrahar = (item: ChecklistItem) =>
    item.prahar.includes(prahar);

  const completedCount = completed.size;
  const totalCount = dailyKriyas.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <section aria-label={t('दैनिक साधना', 'Daily Sadhana')}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-hindi text-lg text-saffron-600 font-bold">
          ✅ {t('दैनिक क्रियाएं', 'Daily Kriyas')}
        </h3>
        <span className="text-sm text-text-muted bg-cream-100 px-3 py-1 rounded-full">
          {completedCount}/{totalCount} • {progressPercent}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-sacred-green rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="space-y-2">
        {dailyKriyas.map((item) => {
          const isDone = completed.has(item.id);
          const isCurrent = isCurrentPrahar(item);

          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={cn(
                'w-full card flex items-center gap-3 text-left',
                'min-h-touch transition-all duration-200',
                'active:scale-[0.98]',
                isDone && 'bg-sacred-green/5 border-sacred-green/30',
                isCurrent && !isDone && 'border-saffron-300 bg-saffron-50/50 ring-2 ring-saffron-200',
                !isCurrent && !isDone && 'opacity-80'
              )}
              aria-label={`${isDone ? t('पूर्ण', 'Completed') : t('अपूर्ण', 'Pending')}: ${t(item.name_hi, item.name_en)}`}
            >
              {/* Checkbox */}
              <div
                className={cn(
                  'w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                  isDone
                    ? 'bg-sacred-green border-sacred-green text-white'
                    : 'border-cream-300'
                )}
              >
                {isDone && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'text-base font-medium',
                  isDone && 'line-through text-text-muted'
                )}>
                  <span className="mr-2">{item.emoji}</span>
                  {t(item.name_hi, item.name_en)}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  🕐 {item.time}
                  {item.hasAudio && ' • 🔊 ' + t('ऑडियो उपलब्ध', 'Audio available')}
                </p>
              </div>

              {/* Current indicator */}
              {isCurrent && !isDone && (
                <span className="text-xs bg-saffron-600 text-white px-2 py-1 rounded-full flex-shrink-0">
                  {t('अभी', 'Now')}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
