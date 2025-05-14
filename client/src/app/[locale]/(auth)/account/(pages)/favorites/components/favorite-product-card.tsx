'use client';
import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import { useCartProvider, UserContext } from '@/app/providers';
import { StrapiImage } from '@/components';
import { IconLoader, IconTrash } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { CURRENCY } from '@/lib/constants';
import { makeSpecsArray } from '@/lib/formatters';
import { useLoader } from '@/lib/hooks';
import { useToast } from '@/lib/hooks/use-toast';
import { ProductResponse } from '@/lib/types';

export default function FavoriteProductCard({
  product,
}: {
  product: ProductResponse;
}) {
  // Providers and Hooks
  const userProvider = useContext(UserContext);
  const { updateCart, cart } = useCartProvider();
  const t = useTranslations();
  const { toast } = useToast();

  // Data
  const { name, images, originalPrice, discountedPrice } = product;
  const image = images?.[0];
  const price = discountedPrice ?? originalPrice;
  const specifications = makeSpecsArray(product);
  const productAlreadyInCart = cart.find(
    (item) => item.product.productVariantId === product.productVariantId
  );
  const headingClassName = 'heading-5 md:bullet-heading-2 lg:heading-4';
  const paragraphClassName = 'paragraph-2 md:bullet-1 lg:paragraph-1';

  // Handlers
  const { isLoading, execute } = useLoader({
    apiCall: () => userProvider.toggleFavorite(product),
    onSuccess: () => {
      toast({
        title: t('common.successful'),
      });
    },
    onError: (error) => {
      toast({
        title: error.name,
        variant: 'destructive',
        description: error.message,
      });
    },
  });
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
        id: product.id,
        product: product,
        quantity: 1,
      });
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-between gap-4 rounded-2xl border-grey-extra-light px-14 py-10 shadow-standard-black md:flex-row md:px-3 md:py-8 lg:p-8">
      <StrapiImage
        alt={image?.alternativeText ?? null}
        className="h-full max-h-[166px] w-full max-w-[250px] object-contain md:max-h-[130px] md:max-w-[194px] lg:max-h-[166px] lg:max-w-[252px]"
        height={166}
        sizes="(max-width: 1024px) 12.125rem, 15.625rem"
        src={image?.url ?? ''}
        width={250}
      />
      <div className="flex flex-1 flex-col gap-1">
        <button
          className="absolute right-3 top-4 lg:bottom-4 lg:top-auto"
          disabled={isLoading}
          onClick={execute}
        >
          <span className="sr-only">Remove from favorites</span>
          {isLoading ? (
            <IconLoader className="size-6 lg:size-9" />
          ) : (
            <IconTrash className="size-6 lg:size-9" />
          )}
        </button>
        <p className={paragraphClassName}>{name}</p>
        {specifications.length > 0 && (
          <p className={paragraphClassName}>
            {specifications.map((spec, index) => (
              <span key={index}>
                {spec}
                {index < specifications.length - 1 && ', '}
              </span>
            ))}
          </p>
        )}
        <p
          className={`${headingClassName} !font-bold`}
        >{`${price} ${CURRENCY}`}</p>
        <Button
          className="w-fit"
          size={'md'}
          typography={'button1'}
          variant={'filled'}
          onClick={handleCartClick}
        >
          {productAlreadyInCart
            ? t('common.removeFromCart')
            : t('common.buyNow')}
        </Button>
      </div>
    </div>
  );
}
