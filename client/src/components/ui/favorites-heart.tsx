import { Slot } from '@radix-ui/react-slot';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import IconHeart from '@/components/icons/heart';
import { cn } from '@/lib/utils/utils';

export interface FavoritesHeartProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  isInFavorites: boolean;
}

const FavoritesHeart = React.forwardRef<HTMLButtonElement, FavoritesHeartProps>(
  ({ className, asChild = false, isInFavorites, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const t = useTranslations('navigation');
    return (
      <Comp
        ref={ref}
        aria-label={isInFavorites ? t('removeFavorites') : t('addFavorites')}
        className={cn(
          'inline-flex items-center justify-center p-1 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.95]',
          className
        )}
        title={isInFavorites ? t('removeFavorites') : t('addFavorites')}
        {...props}
      >
        <IconHeart
          className={cn(isInFavorites ? 'text-red-deep' : 'text-black')}
          filled={isInFavorites}
        />
      </Comp>
    );
  }
);
FavoritesHeart.displayName = 'FavoritesHeart';

export default FavoritesHeart;
