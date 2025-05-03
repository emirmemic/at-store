'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { UserContext } from '@/app/providers';
import { IconHeart, IconLoader } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { useLoader } from '@/lib/hooks';
import { useToast } from '@/lib/hooks/use-toast';
import { ProductResponse } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface ButtonsProps {
  product: ProductResponse;
}

export default function Buttons({ product }: ButtonsProps) {
  const t = useTranslations('');
  const router = useRouter();
  const { toast } = useToast();

  const { toggleFavorite, user } = useContext(UserContext);

  /** Is this product in the current user's favourites? */
  const isFavorited =
    user?.favoriteProducts?.some((p) => p.id === product.id) ?? false;

  const { execute, isLoading } = useLoader({
    apiCall: () => toggleFavorite(product),
    onSuccess: () => {
      toast({ title: t('common.successful') });
    },
    onError: (error) =>
      toast({
        title: error.name,
        variant: 'destructive',
        description: error.message,
      }),
  });

  const handleFavoriteClick = () => {
    if (user) {
      execute();
    } else {
      toast({ title: t('productPage.pleaseLogin') });
      router.push(PAGE_NAMES.LOGIN);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 md:items-start">
      {/* TODO Implement adding to cart functionality */}
      <Button className="h-12 w-72" size="md" variant="filled">
        {t('common.buyNow')}
      </Button>
      <Button
        asChild
        className="h-12 w-72"
        size="md"
        transparentVariant="blue_blue"
        variant="transparent"
      >
        <Link
          aria-label="Buy on installments"
          href={{
            pathname: PAGE_NAMES.MIKROFIN_INVOICE,
            query: { productLink: product.productLink },
          }}
        >
          {t('productPage.buyOnInstallments')}
        </Link>
      </Button>

      <Button
        className="h-12 w-72"
        disabled={isLoading}
        size="md"
        variant="addToFavorites"
        onClick={handleFavoriteClick}
      >
        {isLoading ? (
          <IconLoader className="h-8 w-8" />
        ) : (
          <IconHeart
            className={cn(
              'h-8 w-8',
              isFavorited ? 'text-red-deep' : 'text-black'
            )}
            filled={isFavorited}
            pathClassName="transition-colors duration-300 ease-in-out"
          />
        )}
        {isFavorited
          ? t('common.removeFromFavorites')
          : t('common.addToFavorites')}
      </Button>
    </div>
  );
}
