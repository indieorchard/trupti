'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Compass, BookOpen, Settings } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

const navItems = [
  {
    href: '/',
    icon: Sun,
    label_hi: 'आज',
    label_en: 'Today',
  },
  {
    href: '/journey',
    icon: Compass,
    label_hi: 'यात्रा',
    label_en: 'Journey',
  },
  {
    href: '/knowledge',
    icon: BookOpen,
    label_hi: 'ज्ञान',
    label_en: 'Knowledge',
  },
  {
    href: '/settings',
    icon: Settings,
    label_hi: 'सेटिंग्स',
    label_en: 'Settings',
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-cream-200 shadow-lg"
      role="navigation"
      aria-label={t('मुख्य नेविगेशन', 'Main navigation')}
    >
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center',
                'min-w-[4rem] min-h-touch py-2 px-3 rounded-xl',
                'transition-colors duration-200',
                'active:bg-cream-200',
                isActive
                  ? 'text-saffron-600 bg-saffron-50'
                  : 'text-text-muted hover:text-text-primary'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                size={28}
                strokeWidth={isActive ? 2.5 : 2}
                aria-hidden="true"
              />
              <span
                className={cn(
                  'text-xs mt-1 font-hindi font-medium',
                  isActive && 'font-bold'
                )}
              >
                {t(item.label_hi, item.label_en)}
              </span>
            </Link>
          );
        })}
      </div>
      {/* Safe area padding for mobile devices with bottom notch */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
