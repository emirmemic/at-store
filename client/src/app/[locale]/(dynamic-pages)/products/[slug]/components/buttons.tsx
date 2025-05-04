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

import { ProductVariant } from '../types';

interface ButtonsProps {
  product: ProductVariant;
}

export default function Buttons({ product }: ButtonsProps) {
  const t = useTranslations('');
  const router = useRouter();
  const { toast } = useToast();

  const { toggleFavorite, user } = useContext(UserContext);

  /** Is this product in the current user's favorites? */
  const isFavorited =
    user?.favoriteProducts?.some((p) => p.id === product.id) ?? false;

  /* ProductVariant and ProductResponse have different structure for options, toggleFavorite expects a ProductResponse,
   * so we need to adjust the product object before passing it to toggleFavorite.
   * It can be refactored in the future to use a common type for both.
   */
  const adjustedProduct: ProductResponse = {
    ...product,
    color: product.color
      ? {
          id: 1,
          name: product.color.name,
          hex: product.color.hex || '',
        }
      : undefined,
    memory: product.memory
      ? {
          id: 1,
          value: parseInt(product.memory.value, 10),
          unit: product.memory.value
            .replace(parseInt(product.memory.value, 10).toString(), '')
            .trim(),
        }
      : undefined,
    keyboard: product.keyboard ? product.keyboard.name : undefined,
    screenSize: product.screenSize ? product.screenSize.name : undefined,
    wifiModel: product.wifiModel ? product.wifiModel.name : undefined,
    ancModel: product.ancModel ? product.ancModel.name : undefined,
    braceletSize: product.braceletSize ? product.braceletSize.name : undefined,
  };
  const { execute, isLoading } = useLoader({
    apiCall: () => toggleFavorite(adjustedProduct),
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
