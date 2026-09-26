'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useFontScale } from '@/hooks/useFontScale';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { t, lang, toggleLanguage } = useLanguage();
  const { scales, scaleIndex, setScale } = useFontScale();

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="mb-2">
        <h2 className="font-heading text-large-hi text-text-primary font-bold">
          {t('सेटिंग्स', 'Settings')}
        </h2>
      </div>

      {/* Language Setting */}
      <section className="card">
        <h3 className="font-heading text-heading-hi text-saffron-600 font-bold mb-3">
          🌐 {t('भाषा', 'Language')}
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => lang !== 'hi' && toggleLanguage()}
            className={cn(
              'flex-1 min-h-touch rounded-card font-hindi text-body-hi font-semibold transition-colors',
              lang === 'hi'
                ? 'bg-saffron-600 text-white'
                : 'bg-cream-100 text-text-secondary border-2 border-cream-300'
            )}
          >
            हिन्दी
          </button>
          <button
            onClick={() => lang !== 'en' && toggleLanguage()}
            className={cn(
              'flex-1 min-h-touch rounded-card font-body text-body-en font-semibold transition-colors',
              lang === 'en'
                ? 'bg-saffron-600 text-white'
                : 'bg-cream-100 text-text-secondary border-2 border-cream-300'
            )}
          >
            English
          </button>
        </div>
      </section>

      {/* Font Size Setting */}
      <section className="card">
        <h3 className="font-heading text-heading-hi text-saffron-600 font-bold mb-3">
          🔤 {t('फ़ॉन्ट आकार', 'Font Size')}
        </h3>
        <div className="flex gap-2">
          {scales.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setScale(i)}
              className={cn(
                'flex-1 min-h-touch rounded-card font-hindi font-semibold transition-colors',
                i === scaleIndex
                  ? 'bg-saffron-600 text-white'
                  : 'bg-cream-100 text-text-secondary border-2 border-cream-300'
              )}
              style={{ fontSize: `${s.value * 1.125}rem` }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-text-muted mt-3">
          {t(
            'नमूना पाठ: ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्',
            'Sample text: Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam'
          )}
        </p>
      </section>

      {/* About */}
      <section className="card">
        <h3 className="font-heading text-heading-hi text-saffron-600 font-bold mb-3">
          ℹ️ {t('तृप्ति के बारे में', 'About Trupti')}
        </h3>
        <p className="text-body-hi text-text-secondary">
          {t(
            'तृप्ति — आत्मा की संतुष्टि का द्वार। IndieOrchard द्वारा निर्मित। सनातन धर्म में निहित दैनिक साधना, व्रत, तीर्थ और सचेतन जीवन की कला का आपका डिजिटल आध्यात्मिक साथी।',
            'Trupti — Gateway to Soul-Contentment. Built by IndieOrchard. Your digital spiritual companion for daily sadhana, vratas, pilgrimage, and the art of conscious living rooted in Sanatana Dharma.'
          )}
        </p>
        <p className="text-xs text-text-muted mt-3">
          {t('संस्करण', 'Version')}: 0.1.0 (MVP)
        </p>
      </section>
    </div>
  );
}
