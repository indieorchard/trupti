'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { getCurrentPrahar, getPraharInfo } from '@/lib/utils';
import PanchangStrip from '@/components/home/PanchangStrip';
import DailyChecklist from '@/components/home/DailyChecklist';
import QuickAccess from '@/components/home/QuickAccess';
import JourneyProgress from '@/components/home/JourneyProgress';
import type { Prahar } from '@/types';

export default function HomePage() {
  const { t } = useLanguage();
  const [prahar, setPrahar] = useState<Prahar>('pratah');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setPrahar(getCurrentPrahar(now.getHours()));
      setCurrentTime(
        now.toLocaleTimeString('hi-IN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const praharInfo = getPraharInfo(prahar);

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Prahar Greeting Card */}
      <section
        className={`card bg-gradient-to-br ${praharInfo.color} border-0`}
        aria-label={t('प्रहर अभिवादन', 'Prahar greeting')}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-4xl mb-2" aria-hidden="true">{praharInfo.emoji}</p>
            <h2 className="font-heading text-heading-hi text-text-primary font-bold">
              {t(praharInfo.greeting_hi, praharInfo.greeting_en)}
            </h2>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(praharInfo.guidance_hi, praharInfo.guidance_en)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-body font-bold text-saffron-700">
              {currentTime}
            </p>
          </div>
        </div>
      </section>

      {/* Panchang Strip */}
      <PanchangStrip />

      {/* Journey Progress (if enrolled) */}
      <JourneyProgress />

      {/* Daily Checklist */}
      <DailyChecklist prahar={prahar} />

      {/* Quick Access Grid */}
      <QuickAccess />
    </div>
  );
}
