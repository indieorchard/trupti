'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';

const quickLinks = [
  { href: '/knowledge/japa', emoji: '📿', label_hi: 'जप माला', label_en: 'Japa Mala' },
  { href: '/knowledge/aarti', emoji: '🪔', label_hi: 'आरती', label_en: 'Aarti' },
  { href: '/knowledge/gita', emoji: '📖', label_hi: 'गीता', label_en: 'Gita' },
  { href: '/journey/temples', emoji: '🛕', label_hi: 'मंदिर', label_en: 'Temples' },
  { href: '/knowledge/chalisa', emoji: '🙏', label_hi: 'चालीसा', label_en: 'Chalisa' },
  { href: '/knowledge/stotra', emoji: '🔔', label_hi: 'स्तोत्र', label_en: 'Stotra' },
];

export default function QuickAccess() {
  const { t } = useLanguage();

  return (
    <section aria-label={t('शीघ्र पहुँच', 'Quick Access')}>
      <h3 className="font-heading text-lg text-saffron-600 font-bold mb-3">
        ⚡ {t('शीघ्र पहुँच', 'Quick Access')}
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="pillar-card items-center text-center py-4"
          >
            <span className="text-3xl mb-2 block">{link.emoji}</span>
            <span className="text-body-hi font-medium text-text-primary">
              {t(link.label_hi, link.label_en)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
