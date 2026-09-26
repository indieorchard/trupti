'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SmartImageProps {
  src?: string;
  alt: string;
  fallbackEmoji?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'wide';
}

export default function SmartImage({
  src,
  alt,
  fallbackEmoji = '🕉️',
  className = '',
  containerClassName = '',
  aspectRatio = 'square',
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[16/9]',
  }[aspectRatio];

  if (!src || hasError) {
    return (
      <div
        className={cn(
          'w-full flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-amber-100/80 via-cream-100 to-saffron-100/50 border border-saffron-200/60 p-3 select-none text-center',
          aspectClasses,
          containerClassName
        )}
        aria-label={alt}
      >
        <span className="text-4xl sm:text-5xl filter drop-shadow-sm mb-1 transform hover:scale-110 transition-transform">
          {fallbackEmoji}
        </span>
        <span className="text-xs font-hindi font-medium text-saffron-900/80 line-clamp-1 max-w-[90%] px-1">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-xl bg-cream-100 border border-cream-200',
        aspectClasses,
        containerClassName
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-cream-100 animate-pulse text-saffron-600/40 text-2xl font-sanskrit">
          ॐ
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
        className={cn(
          'w-full h-full object-cover transition-all duration-300',
          isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100',
          className
        )}
      />
    </div>
  );
}
