'use client';

import { useLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';

const journeyCards = [
  {
    id: 'moksha-sadhana',
    emoji: '🪷',
    title_hi: '90-दिवसीय मोक्ष साधना',
    title_en: '90-Day Moksha Sadhana',
    subtitle_hi: 'तीन चरणों में आध्यात्मिक उत्थान — शुद्धि, समर्पण, मोक्ष',
    subtitle_en: 'Spiritual elevation in three phases — Shuddhi, Samarpan, Moksha',
    href: '/journey/moksha-sadhana',
    color: 'from-orange-50 to-amber-50',
  },
  {
    id: 'vrata-calendar',
    emoji: '🗓️',
    title_hi: 'व्रत कैलेंडर',
    title_en: 'Vrata Calendar',
    subtitle_hi: 'एकादशी, प्रदोष, शिवरात्रि और अन्य व्रतों का कैलेंडर',
    subtitle_en: 'Calendar for Ekadashi, Pradosha, Shivaratri, and other vratas',
    href: '/journey/vratas',
    color: 'from-blue-50 to-indigo-50',
  },
  {
    id: 'temples',
    emoji: '🛕',
    title_hi: 'तीर्थ एवं मंदिर',
    title_en: 'Temples & Pilgrimage',
    subtitle_hi: 'चार धाम, सप्त पुरी, द्वादश ज्योतिर्लिंग — वर्चुअल दर्शन सहित',
    subtitle_en: 'Char Dham, Sapta Puri, 12 Jyotirlinga — with virtual darshan',
    href: '/journey/temples',
    color: 'from-amber-50 to-yellow-50',
  },
  {
    id: 'sacred-texts',
    emoji: '📖',
    title_hi: 'शास्त्र अध्ययन',
    title_en: 'Sacred Texts Study Path',
    subtitle_hi: 'गीता, विष्णु सहस्रनाम, गरुड़ पुराण, कठोपनिषद',
    subtitle_en: 'Gita, Vishnu Sahasranama, Garuda Purana, Katha Upanishad',
    href: '/journey/texts',
    color: 'from-emerald-50 to-green-50',
  },
  {
    id: 'antima-yatra',
    emoji: '🙏',
    title_hi: 'अंतिम यात्रा — शांतिपूर्ण तैयारी',
    title_en: 'Antima Yatra — Peaceful Preparation',
    subtitle_hi: 'गरिमापूर्ण मार्गदर्शन — क्षमापना, दस दान, आत्मसमर्पण',
    subtitle_en: 'Dignified guidance — Forgiveness, Dasa Daan, Surrender',
    href: '/journey/antima-yatra',
    color: 'from-purple-50 to-pink-50',
  },
];

export default function JourneyPage() {
  const { t } = useLanguage();

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="mb-2">
        <h2 className="font-heading text-large-hi text-text-primary font-bold">
          {t('आपकी आध्यात्मिक यात्रा', 'Your Spiritual Journey')}
        </h2>
        <p className="text-body-hi text-text-secondary mt-1">
          {t(
            'अपनी गति से, अपने मार्ग पर — एक कदम एक दिन',
            'At your pace, on your path — one step, one day'
          )}
        </p>
      </div>

      {journeyCards.map((card) => (
        <Link key={card.id} href={card.href} className="block">
          <article
            className={`pillar-card bg-gradient-to-r ${card.color} border-0 p-5`}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl flex-shrink-0">{card.emoji}</span>
              <div className="flex-1">
                <h3 className="font-heading text-heading-hi text-text-primary font-bold">
                  {t(card.title_hi, card.title_en)}
                </h3>
                <p className="text-body-hi text-text-secondary mt-1">
                  {t(card.subtitle_hi, card.subtitle_en)}
                </p>
              </div>
              <span className="text-saffron-600 text-2xl flex-shrink-0 mt-1" aria-hidden="true">
                →
              </span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
