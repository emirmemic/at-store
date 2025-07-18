'use client';

import { IconHeart, IconLoader } from '@/components/icons';
import { UserContext, useCartProvider } from '@/app/providers';

import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { ProductResponse } from '@/lib/types';
import { ProductVariant } from '../types';
import { cn } from '@/lib/utils/utils';
import { useContext } from 'react';
import { useLoader } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/hooks/use-toast';
import { useTranslations } from 'next-intl';

interface ButtonsProps {
  product: ProductVariant;
  isModal?: boolean;
}

export default function Buttons({ product, isModal = false }: ButtonsProps) {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();

  const { toggleFavorite, user } = useContext(UserContext);
  const { updateCart, cart } = useCartProvider();
  const productAlreadyInCart = cart.find(
    (item) => item.product?.productVariantId === product?.productVariantId
  );

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
    amountInStock: product.amountInStock,
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

  const handleCartClick = () => {
    toast({
      title: productAlreadyInCart
        ? t('common.removedFromCart')
        : t('common.addedToCart'),
    });
    if (productAlreadyInCart) {
      updateCart({
        ...productAlreadyInCart,
        quantity: 0,
      });
    } else {
      updateCart({
        id: adjustedProduct.id,
        product: adjustedProduct,
        quantity: 1,
      });
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-6 md:flex-row md:items-start">
      <Button
        className="h-12 w-72"
        size="md"
        variant="filled"
        onClick={handleCartClick}
      >
        {productAlreadyInCart ? t('common.removeFromCart') : t('common.buyNow')}
      </Button>

      {!isModal && (
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
                'h-6 w-6',
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
      )}
    </div>
  );
}
