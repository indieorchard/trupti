'use client';

import { useLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';

export default function JourneyProgress() {
  const { t } = useLanguage();

  // MVP: Static demo data (will be from user state later)
  const currentDay = 0; // 0 = not started
  const totalDays = 90;

  if (currentDay === 0) {
    return (
      <Link href="/journey" className="block">
        <section className="pillar-card bg-gradient-to-r from-saffron-50 to-cream-100 border-saffron-200">
          <div className="flex items-center gap-4">
            <span className="text-4xl">🪷</span>
            <div className="flex-1">
              <h3 className="font-hindi text-lg text-saffron-700 font-bold">
                {t('90-दिवसीय मोक्ष साधना', '90-Day Moksha Sadhana')}
              </h3>
              <p className="text-base text-text-secondary mt-1">
                {t(
                  'अपनी आध्यात्मिक यात्रा शुरू करें →',
                  'Begin your spiritual journey →'
                )}
              </p>
            </div>
          </div>
        </section>
      </Link>
    );
  }

  const progress = Math.round((currentDay / totalDays) * 100);
  const phase = currentDay <= 30 ? t('शुद्धि', 'Shuddhi') : currentDay <= 60 ? t('समर्पण', 'Samarpan') : t('मोक्ष', 'Moksha');

  return (
    <Link href="/journey" className="block">
      <section className="card">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-hindi text-lg text-saffron-600 font-bold">
            🪷 {t('मोक्ष साधना', 'Moksha Sadhana')}
          </h3>
          <span className="text-sm text-text-muted">
            {t(`दिन ${currentDay}/${totalDays}`, `Day ${currentDay}/${totalDays}`)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-cream-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-saffron-500 to-sacred-gold rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={currentDay}
            aria-valuemin={0}
            aria-valuemax={totalDays}
          />
        </div>

        <p className="text-sm text-text-secondary mt-2">
          {t('चरण', 'Phase')}: <strong>{phase}</strong> • {progress}%
        </p>
      </section>
    </Link>
  );
}
