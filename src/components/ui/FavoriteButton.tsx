'use client';

import { useFavorites, FavoriteItem } from '@/hooks/useFavorites';
import { useLanguage } from '@/hooks/useLanguage';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  item: Omit<FavoriteItem, 'addedAt'>;
  className?: string;
  size?: number;
  showText?: boolean;
}

export default function FavoriteButton({
  item,
  className = '',
  size = 20,
  showText = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useLanguage();
  const active = isFavorite(item.id);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(item);
      }}
      className={cn(
        'p-2 rounded-xl transition-all flex items-center gap-1.5 min-h-[48px] min-w-[48px] justify-center',
        active
          ? 'bg-amber-100/90 text-amber-700 hover:bg-amber-200 shadow-sm border border-amber-300'
          : 'bg-white/80 hover:bg-cream-100 text-text-muted hover:text-amber-600 border border-cream-200',
        className
      )}
      title={active ? t('पसंदीदा से हटाएं', 'Remove from Favorites') : t('पसंदीदा में जोड़ें', 'Add to Favorites')}
      aria-label={active ? t('पसंदीदा से हटाएं', 'Remove from Favorites') : t('पसंदीदा में जोड़ें', 'Add to Favorites')}
    >
      <Star
        size={size}
        className={cn(
          'transition-transform',
          active ? 'fill-amber-500 text-amber-600 scale-110' : 'text-text-muted'
        )}
      />
      {showText && (
        <span className="text-xs font-hindi font-medium">
          {active ? t('पसंदीदा', 'Starred') : t('पसंद करें', 'Star')}
        </span>
      )}
    </button>
  );
}
