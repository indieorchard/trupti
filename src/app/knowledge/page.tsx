'use client';

import { useLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';

const categories = [
  {
    id: 'deities',
    emoji: '🕉️',
    title_hi: 'भारत के 35+ प्रमुख देवी-देवता',
    title_en: '35+ Sacred Deities of India',
    count_hi: 'शैव, वैष्णव, शाक्त, सौर',
    count_en: 'Shaiva, Vaishnava, Shakta',
    href: '/knowledge/deities',
  },
  {
    id: 'gita',
    emoji: '📖',
    title_hi: 'गीता महाभंडार (14+ पवित्र गीताएं)',
    title_en: 'Gita Treasury (14+ Gitas)',
    count_hi: 'भगवद्गीता 18 अध्याय सहित',
    count_en: '18 Chapters of Bhagavad Gita',
    href: '/knowledge/gita',
  },
  {
    id: 'vedas-puranas',
    emoji: '📜',
    title_hi: 'वेद, महापुराण एवं उपनिषद',
    title_en: 'Vedas, Puranas & Upanishads',
    count_hi: '4 वेद, 18 पुराण, 10 उपनिषद',
    count_en: '4 Vedas, Puranas & Upanishads',
    href: '/knowledge/vedas-puranas',
  },
  {
    id: 'aarti',
    emoji: '🪔',
    title_hi: 'महाआरती संग्रह',
    title_en: 'Sacred Aarti Collection',
    count_hi: '15+ प्रमुख आरतियां',
    count_en: '15+ Sacred Aartis',
    href: '/knowledge/aarti',
  },
  {
    id: 'chalisa',
    emoji: '🙏',
    title_hi: 'चालीसा संग्रह',
    title_en: 'Chalisa Collection',
    count_hi: 'श्री हनुमान चालीसा आदि (10+)',
    count_en: 'Hanuman Chalisa & 10+ Chalisas',
    href: '/knowledge/chalisa',
  },
  {
    id: 'stotra',
    emoji: '🔔',
    title_hi: 'दिव्य स्तोत्र एवं मंत्र',
    title_en: 'Sacred Stotras & Mantras',
    count_hi: 'शिव तांडव, विष्णु सहस्रनाम आदि (20+)',
    count_en: '20+ Powerful Stotras',
    href: '/knowledge/stotra',
  },
  {
    id: 'japa',
    emoji: '📿',
    title_hi: 'डिजिटल जप माला',
    title_en: 'Digital Japa Mala (108 Beads)',
    count_hi: 'ध्वनि व कंपन सहित काउंटर',
    count_en: 'Interactive 108 Beads Counter',
    href: '/knowledge/japa',
  },
];

export default function KnowledgePage() {
  const { t } = useLanguage();

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="card bg-gradient-to-r from-amber-50 to-orange-100 border-saffron-300">
        <h2 className="font-heading text-large-hi text-saffron-900 font-bold">
          {t('ज्ञान भंडार', 'Knowledge Treasury')}
        </h2>
        <p className="text-body-hi text-text-secondary mt-1">
          {t(
            'सनातन धर्म के देवी-देवता, मंदिर, वेद, पुराण, गीताएं, स्तोत्र एवं आरतियां — सब एक सुव्यवस्थित स्थान पर।',
            'Deities, temples, Vedas, Puranas, Gitas, stotras & aartis — beautifully organized in one place.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {categories.map((cat) => (
          <Link key={cat.id} href={cat.href} className="block">
            <article className="pillar-card flex-row items-center gap-4 p-5 hover:shadow-md transition-shadow">
              <span className="text-4xl flex-shrink-0">{cat.emoji}</span>
              <div className="flex-1">
                <h3 className="font-heading text-heading-hi text-text-primary font-bold">
                  {t(cat.title_hi, cat.title_en)}
                </h3>
                <p className="text-sm text-saffron-700 font-medium mt-0.5">
                  {t(cat.count_hi, cat.count_en)}
                </p>
              </div>
              <span className="text-saffron-600 text-2xl flex-shrink-0" aria-hidden="true">
                →
              </span>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
