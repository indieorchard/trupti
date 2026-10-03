'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useFavorites, FavoriteItem } from '@/hooks/useFavorites';
import { useLanguage } from '@/hooks/useLanguage';
import SmartImage from '@/components/ui/SmartImage';
import { cn } from '@/lib/utils';
import { Star, Trash2, ExternalLink, Sparkles, BookOpen, Compass } from 'lucide-react';

const categoryTabs = [
  { id: 'all', label_hi: 'सभी पसंदीदा', label_en: 'All Starred', emoji: '⭐' },
  { id: 'deity', label_hi: 'देवी-देवता', label_en: 'Deities', emoji: '🕉️' },
  { id: 'temple', label_hi: 'तीर्थ व मंदिर', label_en: 'Temples', emoji: '🛕' },
  { id: 'chant', label_hi: 'आरती व मंत्र', label_en: 'Aartis & Mantras', emoji: '🪔' },
  { id: 'gita', label_hi: 'गीता शास्त्र', label_en: 'Gitas', emoji: '📖' },
  { id: 'veda', label_hi: 'वेद व पुराण', label_en: 'Vedas & Puranas', emoji: '📜' },
  { id: 'vrat', label_hi: 'व्रत संग्रह', label_en: 'Vratas', emoji: '🗓️' },
];

export default function FavoritesPage() {
  const { favorites, removeFavorite, favoritesCount, isLoaded } = useFavorites();
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const matchesCategory = (item: FavoriteItem, tab: string) => {
    if (tab === 'all') return true;
    if (tab === 'deity') return item.type === 'deity';
    if (tab === 'temple') return item.type === 'temple';
    if (tab === 'chant') return ['chant', 'aarti', 'chalisa', 'stotra', 'sukta'].includes(item.type);
    if (tab === 'gita') return item.type === 'gita';
    if (tab === 'veda') return ['veda', 'purana', 'upanishad', 'veda_purana'].includes(item.type);
    if (tab === 'vrat') return ['vrat', 'vrata'].includes(item.type);
    return false;
  };

  const filteredFavorites = favorites.filter(item => matchesCategory(item, selectedTab));

  return (
    <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
      {/* Header Banner */}
      <div className="card bg-gradient-to-r from-amber-50 via-cream-50 to-orange-100 border-amber-300">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h1 className="font-hindi text-lg font-bold text-saffron-900 flex items-center gap-2">
              <Star className="fill-amber-500 text-amber-600" size={24} />
              <span>{t('मेरे पसंदीदा (Starred)', 'My Starred Items')}</span>
              <span className="text-sm font-normal text-text-muted">({favoritesCount})</span>
            </h1>
            <p className="text-base text-text-secondary mt-1">
              {t(
                'आपके द्वारा संचित सभी इष्ट देव, मंदिर, मंत्र, पाठ एवं व्रत — एक स्पर्श में सुलभ।',
                'All your bookmarked deities, temples, aartis, gitas and vratas — 1 tap away.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      {favoritesCount > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categoryTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={cn(
                'px-4 py-2 rounded-full font-hindi text-sm font-semibold whitespace-nowrap transition-colors min-h-[48px]',
                selectedTab === tab.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white border border-cream-300 text-text-secondary hover:bg-cream-100'
              )}
            >
              <span>{tab.emoji} </span>
              <span>{t(tab.label_hi, tab.label_en)}</span>
            </button>
          ))}
        </div>
      )}

      {/* Favorites List */}
      {isLoaded && filteredFavorites.length > 0 && (
        <div className="space-y-3">
          {filteredFavorites.map((item) => (
            <article
              key={`${item.type}-${item.id}`}
              className="card flex items-center justify-between gap-3 p-3.5 hover:shadow-md transition-all border-cream-200 bg-white group"
            >
              <Link
                href={item.url}
                className="flex items-center gap-3.5 flex-1 min-w-0"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-xs border border-cream-200">
                  <SmartImage
                    src={item.image_url}
                    alt={item.title_hi}
                    aspectRatio="square"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  {item.badge && (
                    <span className="inline-block text-sm font-bold text-saffron-700 bg-saffron-50 px-2 py-0.5 rounded-md mb-1 font-hindi">
                      {item.badge}
                    </span>
                  )}
                  <h3 className="font-hindi text-lg font-bold text-text-primary line-clamp-2">
                    {t(item.title_hi, item.title_en)}
                  </h3>
                  {(item.subtitle || item.subtitle_hi) && (
                    <p className="text-xs text-text-secondary line-clamp-2 mt-0.5 font-hindi">
                      {item.subtitle || item.subtitle_hi}
                    </p>
                  )}
                </div>
              </Link>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Link
                  href={item.url}
                  className="p-2.5 rounded-xl bg-cream-100 hover:bg-cream-200 text-saffron-700 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                  aria-label={t('खोलें', 'Open')}
                >
                  <ExternalLink size={18} />
                </Link>

                <button
                  onClick={() => removeFavorite(item.id)}
                  className="p-2.5 rounded-xl text-text-muted hover:text-sacred-vermillion hover:bg-red-50 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
                  title={t('पसंदीदा से हटाएं', 'Remove')}
                  aria-label={t('पसंदीदा से हटाएं', 'Remove')}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Empty State */}
      {isLoaded && favoritesCount === 0 && (
        <div className="card text-center py-12 px-6 space-y-4 border-dashed border-2 border-cream-300 bg-cream-50/50">
          <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
            <Star className="text-amber-600" size={32} />
          </div>
          <div>
            <h3 className="font-hindi text-lg font-bold text-text-primary">
              {t('अभी कोई पसंदीदा आइटम नहीं है', 'No Starred Items Yet')}
            </h3>
            <p className="text-base text-text-secondary mt-1 max-w-sm mx-auto">
              {t(
                'किसी भी देवता, मंदिर, आरती, गीता या व्रत के पास बने ⭐ स्टार पर स्पर्श कर उसे यहाँ सुरक्षित करें।',
                'Tap the ⭐ Star button on any deity, temple, aarti, gita, or vrata to save it here for 1-click access.'
              )}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-2">
            <Link href="/knowledge/aarti" className="btn-secondary text-sm py-2 px-3 min-h-[44px]">
              🪔 {t('आरती संग्रह', 'Aarti Collection')}
            </Link>
            <Link href="/journey/temples" className="btn-secondary text-sm py-2 px-3 min-h-[44px]">
              🛕 {t('मंदिर दर्शन', 'Temples')}
            </Link>
            <Link href="/knowledge/vrat-sangrah" className="btn-secondary text-sm py-2 px-3 min-h-[44px]">
              🗓️ {t('व्रत संग्रह', 'Vrat Sangrah')}
            </Link>
            <Link href="/knowledge/deities" className="btn-secondary text-sm py-2 px-3 min-h-[44px]">
              🕉️ {t('देवी-देवता', 'Deities')}
            </Link>
          </div>
        </div>
      )}

      {/* Empty Filter Results */}
      {isLoaded && favoritesCount > 0 && filteredFavorites.length === 0 && (
        <div className="card text-center py-10 text-text-muted">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-base">
            {t('इस श्रेणी में कोई पसंदीदा आइटम नहीं है।', 'No starred items in this category.')}
          </p>
        </div>
      )}
    </div>
  );
}
