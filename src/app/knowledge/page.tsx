'use client';

import { useLanguage } from '@/hooks/useLanguage';
import Link from 'next/link';

const categories = [
  {
    id: 'aarti',
    emoji: '🪔',
    title_hi: 'आरती संग्रह',
    title_en: 'Aarti Collection',
    count_hi: '25+ आरतियाँ',
    count_en: '25+ Aartis',
    href: '/knowledge/aarti',
  },
  {
    id: 'chalisa',
    emoji: '🙏',
    title_hi: 'चालीसा',
    title_en: 'Chalisa',
    count_hi: '10+ चालीसा',
    count_en: '10+ Chalisas',
    href: '/knowledge/chalisa',
  },
  {
    id: 'stotra',
    emoji: '🔔',
    title_hi: 'स्तोत्र और मंत्र',
    title_en: 'Stotras & Mantras',
    count_hi: '50+ स्तोत्र',
    count_en: '50+ Stotras',
    href: '/knowledge/stotra',
  },
  {
    id: 'gita',
    emoji: '📖',
    title_hi: 'श्रीमद् भगवद् गीता',
    title_en: 'Srimad Bhagavad Gita',
    count_hi: '18 अध्याय',
    count_en: '18 Chapters',
    href: '/knowledge/gita',
  },
  {
    id: 'sahasranama',
    emoji: '🕉️',
    title_hi: 'विष्णु सहस्रनाम',
    title_en: 'Vishnu Sahasranama',
    count_hi: '1000 नाम',
    count_en: '1000 Names',
    href: '/knowledge/sahasranama',
  },
  {
    id: 'japa',
    emoji: '📿',
    title_hi: 'जप माला',
    title_en: 'Japa Mala Counter',
    count_hi: 'डिजिटल माला',
    count_en: 'Digital Mala',
    href: '/knowledge/japa',
  },
];

export default function KnowledgePage() {
  const { t } = useLanguage();

  return (
    <div className="px-4 py-4 space-y-4">
      <div className="mb-2">
        <h2 className="font-heading text-large-hi text-text-primary font-bold">
          {t('ज्ञान भंडार', 'Knowledge Treasury')}
        </h2>
        <p className="text-body-hi text-text-secondary mt-1">
          {t(
            'मंत्र, स्तोत्र, आरती और शास्त्र — सब एक स्थान पर',
            'Mantras, Stotras, Aartis & Scriptures — all in one place'
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {categories.map((cat) => (
          <Link key={cat.id} href={cat.href} className="block">
            <article className="pillar-card flex-row items-center gap-4 p-5">
              <span className="text-4xl flex-shrink-0">{cat.emoji}</span>
              <div className="flex-1">
                <h3 className="font-heading text-heading-hi text-text-primary font-bold">
                  {t(cat.title_hi, cat.title_en)}
                </h3>
                <p className="text-sm text-text-muted mt-0.5">
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
