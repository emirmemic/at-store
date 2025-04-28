import { useTranslations } from 'next-intl';

import { IconHeart } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';

export default function Buttons() {
  const t = useTranslations('common');
  const isInFavorites = false;
  const isLoading = false;
  return (
    <div className="flex w-full flex-col items-center gap-6 md:items-start">
      <Button className="h-12 w-72" size="md" variant="filled">
        {t('buyNow')}
      </Button>
      <Button className="h-12 w-72" size="md" variant="addToFavorites">
        <IconHeart
          className={cn(
            isInFavorites ? 'text-red-deep' : 'text-black',
            isLoading && 'animate-pulse text-grey-dark'
          )}
          filled={isLoading ? isLoading : isInFavorites}
          pathClassName="transition-colors duration-300 ease-in-out"
        />
        {t('addToFavorites')}
      </Button>
    </div>
  );
}
