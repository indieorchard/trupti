import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Prahar, Language } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Determines the current Prahar (period of day) based on the hour
 */
export function getCurrentPrahar(hour?: number): Prahar {
  const h = hour ?? new Date().getHours();
  if (h >= 4 && h < 6) return 'brahma_muhurta';
  if (h >= 6 && h < 9) return 'pratah';
  if (h >= 9 && h < 12) return 'madhyahna';
  if (h >= 12 && h < 15) return 'aparahna';
  if (h >= 15 && h < 18) return 'sayam';
  if (h >= 18 && h < 21) return 'pradosha';
  if (h >= 21 && h < 24) return 'ratri';
  return 'nisha'; // 0:00-4:00
}

/**
 * Returns greeting and guidance for current Prahar
 */
export function getPraharInfo(prahar: Prahar, lang: Language = 'hi') {
  const info: Record<Prahar, { greeting_hi: string; greeting_en: string; guidance_hi: string; guidance_en: string; emoji: string; color: string }> = {
    brahma_muhurta: {
      greeting_hi: 'ॐ शुभ ब्रह्म मुहूर्त',
      greeting_en: 'Auspicious Brahma Muhurta',
      guidance_hi: 'ध्यान, जप और प्रार्थना का सर्वोत्तम समय',
      guidance_en: 'Best time for meditation, japa, and prayer',
      emoji: '🌅',
      color: 'from-amber-100 to-orange-50',
    },
    pratah: {
      greeting_hi: 'शुभ प्रभात',
      greeting_en: 'Good Morning',
      guidance_hi: 'सूर्य अर्घ्य, संध्यावंदन और योग का समय',
      guidance_en: 'Time for Surya Arghya, Sandhyavandana, and Yoga',
      emoji: '☀️',
      color: 'from-yellow-50 to-orange-50',
    },
    madhyahna: {
      greeting_hi: 'शुभ मध्याह्न',
      greeting_en: 'Good Noon',
      guidance_hi: 'मध्याह्न संध्या और सात्विक भोजन',
      guidance_en: 'Midday prayer and sattvic meal',
      emoji: '🕉️',
      color: 'from-orange-50 to-amber-50',
    },
    aparahna: {
      greeting_hi: 'शुभ अपराह्न',
      greeting_en: 'Good Afternoon',
      guidance_hi: 'स्वाध्याय और गीता पठन का समय',
      guidance_en: 'Time for study and Gita reading',
      emoji: '📖',
      color: 'from-amber-50 to-yellow-50',
    },
    sayam: {
      greeting_hi: 'शुभ सायंकाल',
      greeting_en: 'Good Evening',
      guidance_hi: 'सायं संध्या, दीप प्रज्वलन और आरती',
      guidance_en: 'Evening prayer, lamp lighting, and aarti',
      emoji: '🪔',
      color: 'from-orange-100 to-red-50',
    },
    pradosha: {
      greeting_hi: 'शुभ प्रदोष काल',
      greeting_en: 'Sacred Twilight',
      guidance_hi: 'शिव पूजा और नाम संकीर्तन',
      guidance_en: 'Shiva worship and nama sankirtan',
      emoji: '🌆',
      color: 'from-purple-50 to-indigo-50',
    },
    ratri: {
      greeting_hi: 'शुभ रात्रि',
      greeting_en: 'Good Night',
      guidance_hi: 'शांति पाठ, योग निद्रा और विश्राम',
      guidance_en: 'Shanti Path, Yoga Nidra, and rest',
      emoji: '🌙',
      color: 'from-indigo-50 to-blue-50',
    },
    nisha: {
      greeting_hi: 'शांत निशा',
      greeting_en: 'Peaceful Night',
      guidance_hi: 'गहन विश्राम — ब्रह्म मुहूर्त शीघ्र आने वाला है',
      guidance_en: 'Deep rest — Brahma Muhurta approaches',
      emoji: '✨',
      color: 'from-slate-100 to-indigo-50',
    },
  };
  return info[prahar];
}

/**
 * Text helper for bilingual content
 */
export function t(hi: string, en: string, lang: Language = 'hi'): string {
  return lang === 'hi' ? hi : en;
}

/**
 * Format time for display
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
