'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';

const quickLinks = [
  { href: '/knowledge/japa', emoji: '📿', label_hi: 'जप माला', label_en: 'Japa Mala' },
  { href: '/journey/temples', emoji: '🛕', label_hi: 'मंदिर (65+)', label_en: 'Temples' },
  { href: '/knowledge/gita', emoji: '📖', label_hi: 'गीता (14+)', label_en: 'Gitas' },
  { href: '/knowledge/deities', emoji: '🕉️', label_hi: 'देवी-देवता', label_en: 'Deities' },
  { href: '/knowledge/vedas-puranas', emoji: '📜', label_hi: 'वेद-पुराण', label_en: 'Vedas' },
  { href: '/knowledge/aarti', emoji: '🪔', label_hi: 'आरती (15+)', label_en: 'Aarti' },
  { href: '/knowledge/chalisa', emoji: '🙏', label_hi: 'चालीसा (10+)', label_en: 'Chalisa' },
  { href: '/knowledge/stotra', emoji: '🔔', label_hi: 'स्तोत्र (20+)', label_en: 'Stotra' },
  { href: '/journey/vratas', emoji: '🗓️', label_hi: 'व्रत कैलेंडर', label_en: 'Vratas' },
];

export default function QuickAccess() {
  const { t } = useLanguage();

  return (
    <section aria-label={t('शीघ्र पहुँच', 'Quick Access')}>
      <h3 className="font-heading text-lg text-saffron-600 font-bold mb-3">
        ⚡ {t('शीघ्र पहुँच', 'Quick Access')}
      </h3>

      <div className="grid grid-cols-3 gap-2.5">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="pillar-card items-center text-center py-3.5 px-2 hover:border-saffron-500 hover:shadow-sm transition-all"
          >
            <span className="text-3xl mb-1 block">{link.emoji}</span>
            <span className="text-sm font-semibold font-hindi text-text-primary line-clamp-1">
              {t(link.label_hi, link.label_en)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
