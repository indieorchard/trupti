'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { BookOpen, Compass, Sparkles, ChevronRight } from 'lucide-react';

const studyPaths = [
  {
    id: 'gita-path',
    title_hi: '१. श्रीमद्भगवद्गीता अध्ययन पथ (18 अध्याय)',
    title_en: '1. Srimad Bhagavad Gita Study Path',
    desc_hi: 'दैनिक 1 अध्याय का अध्ययन एवं श्लोक मनन। कर्म, भक्ति और ज्ञान का व्यावहारिक मार्गदर्शन।',
    desc_en: 'Daily reading of 1 chapter with shloka contemplation for spiritual balance.',
    href: '/knowledge/gita',
    emoji: '📖',
  },
  {
    id: 'upanishad-path',
    title_hi: '२. दशोपनिषद ज्ञान पथ',
    title_en: '2. Ten Principal Upanishads Study Path',
    desc_hi: 'ईश, केन, कठ, प्रश्न, मुंडक, मांडूक्य — आत्मतत्त्व और महावाक्यों का अध्ययन।',
    desc_en: 'Exploration of Atman and Brahman across the primordial Upanishads.',
    href: '/knowledge/vedas-puranas',
    emoji: '🕉️',
  },
  {
    id: 'purana-path',
    title_hi: '३. महापुराण एवं भक्ति कथाएं',
    title_en: '3. Mahapuranas & Devotional Kathas',
    desc_hi: 'श्रीमद्भागवत, विष्णु पुराण, शिव पुराण एवं गरुड़ पुराण के प्रेरक चरित्र।',
    desc_en: 'Inspiring narratives from Srimad Bhagavatam, Shiva Purana, and Garuda Purana.',
    href: '/knowledge/vedas-puranas',
    emoji: '📜',
  },
  {
    id: 'stotra-path',
    title_hi: '४. नित्य स्तोत्र एवं मंत्र साधना',
    title_en: '4. Daily Stotra & Mantra Sadhana',
    desc_hi: 'विष्णु सहस्रनाम, शिव तांडव, आदित्य हृदय एवं ललिता सहस्रनाम का सस्वर पाठ।',
    desc_en: 'Daily recitation of Vishnu Sahasranama, Shiva Tandava, and Aditya Hridaya.',
    href: '/knowledge/stotra',
    emoji: '🔔',
  }
];

export default function TextsStudyPage() {
  const { t } = useLanguage();

  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-emerald-50 to-amber-100 border-emerald-300">
        <div className="flex items-start gap-3">
          <span className="text-4xl">📚</span>
          <div>
            <h1 className="font-heading text-2xl text-emerald-950 font-bold">
              {t('शास्त्र अध्ययन मार्गदर्शिका', 'Sacred Scripture Study Paths')}
            </h1>
            <p className="text-body-hi text-text-secondary mt-1">
              {t(
                'सनातन धर्म के प्राचीन ग्रंथों को व्यवस्थित रूप से पढ़ने, समझने और आत्मसात करने का क्रम।',
                'Curated reading sequences to learn, contemplate, and embody Sanatana Dharma scriptures.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Pathways List */}
      <div className="space-y-3">
        {studyPaths.map(path => (
          <Link key={path.id} href={path.href} className="block">
            <article className="card hover:shadow-md transition-shadow border-cream-200 p-5 flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">{path.emoji}</span>
              <div className="flex-1">
                <h2 className="font-heading text-xl font-bold text-text-primary">
                  {t(path.title_hi, path.title_en)}
                </h2>
                <p className="text-body-hi text-text-secondary mt-1">
                  {t(path.desc_hi, path.desc_en)}
                </p>
              </div>
              <ChevronRight className="text-saffron-600 flex-shrink-0 mt-1" />
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
