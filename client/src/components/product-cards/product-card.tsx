'use client';

import { useContext, useState } from 'react';

import FavoritesHeart from '@/components/ui/favorites-heart';
import Link from 'next/link';
import { PAGE_NAMES } from '@/i18n/page-names';
import Price from '@/components/ui/price';
import { ProductResponse } from '@/lib/types';
import ProductTag from './product-tag';
import { StrapiImage } from '@/components/strapi/components';
import { UserContext } from '@/app/providers';
import { cn } from '@/lib/utils/utils';
import { makeProductLink } from '@/lib/utils/link-helpers';
import { useLoader } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/hooks/use-toast';
import { useTranslations } from 'next-intl';

interface ProductCardProps {
  product: ProductResponse;
  className?: string;
}
export default function ProductCard({ product, className }: ProductCardProps) {
  const {
    name,
    displayName,
    discountedPrice,
    originalPrice,
    tag,
    images,
    favoritedBy,
    productLink,
  } = product;

  const t = useTranslations('');
  const router = useRouter();
  const { toast } = useToast();
  const { toggleFavorite, user } = useContext(UserContext);
  const [favorites, setFavorites] = useState<number[]>(
    favoritedBy?.map((f) => f.id) ?? []
  );

  const { execute, isLoading } = useLoader({
    apiCall: () => toggleFavorite(product),
    onSuccess: () => {
      toast({
        title: isFavorite
          ? t('productPage.removedFromFavorites')
          : t('productPage.addedToFavorites'),
      });
      if (user) {
        setFavorites((prev) =>
          prev.includes(user.id)
            ? prev.filter((id) => id !== user.id)
            : [...prev, user.id]
        );
      }
    },
    onError: (error) => {
      toast({
        title: error.name,
        variant: 'destructive',
        description: error.message,
      });
    },
  });
  const handleFavoriteClick = () => {
    if (user) {
      execute();
    } else {
      toast({
        title: t('productPage.pleaseLogin'),
        variant: 'default',
      });
      router.push(PAGE_NAMES.LOGIN);
    }
  };

  const finalPrice = discountedPrice ?? originalPrice;
  const image = images?.[0] || null;
  const discountPercentage = discountedPrice
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;
  const finalLink = makeProductLink(
    product.category?.link ?? '',
    product.productTypeId,
    productLink ?? ''
  );
  const isFavorite = user ? favorites.includes(user.id) : false;

  return (
    <div
      className={cn(
        'relative flex w-full flex-col rounded-lg bg-white',
        className
      )}
    >
      <Link className="z-1 absolute inset-0" href={finalLink}>
        <span className="sr-only">
          {t('common.viewDetailsWithName', {
            productName: name,
          })}
        </span>
      </Link>
      <div className="w-full rounded-lg bg-white">
        <div
          className={
            'flex w-full flex-row items-center justify-end px-4 py-1 md:py-4'
          }
        >
          <FavoritesHeart
            className="relative z-10"
            disabled={isLoading}
            isInFavorites={user ? favorites.includes(user.id) : false}
            isLoading={isLoading}
            onClick={handleFavoriteClick}
          />
        </div>

        {image ? (
          <div className="flex h-full items-center justify-center p-4">
            <StrapiImage
              alt={image?.alternativeText || name}
              className="aspect-[4/3] h-fit w-full max-w-[180px] object-contain sm:h-[140px] sm:max-w-[220px] md:h-[160px] md:max-w-[240px]"
              height={160}
              sizes="(max-width: 640px) 11rem, (max-width: 1024px) 14rem, 18rem"
              src={image?.url ?? ''}
              width={200}
            />
          </div>
        ) : (
          <div className="flex aspect-[4/3] h-full w-full items-center justify-center rounded-2xl bg-grey-almost-white p-4 text-grey-medium paragraph-1">
            {t('productPage.noImagesAvailable')}
          </div>
        )}
      </div>
      <div className="mt-8 flex min-h-[250px] flex-col items-center gap-3 px-4 pb-8 text-center">
        <div className="flex h-11 w-full flex-col items-center justify-center">
          <ProductTag className="mt-4 w-fit" tag={tag || ''} />
          <p className="md:text-md text-sm font-normal tracking-wide text-neutral-900">
            {displayName ?? name}
          </p>
        </div>
        {/* {finalSpecs.length > 0 && (
          <div className="flex min-h-[56px] w-full flex-col items-center justify-center gap-1">
            {finalSpecs.map((spec, i) => (
              <p
                key={`${spec}-${i}`}
                className="w-full text-center text-grey-darker paragraph-4"
              >
                {spec}
              </p>
            ))}
          </div>
        )} */}
        <div className="h-[30px] w-full" />
        <div className="flex flex-col items-center gap-2">
          {discountedPrice && (
            <div className="flex items-center justify-center gap-2 text-sm">
              <Price
                className="text-muted-foreground line-through"
                value={originalPrice}
              />
              <p className="text-green-600">{`${discountPercentage}% povoljnije`}</p>
            </div>
          )}
          <Price
            className="text-[1rem] font-semibold text-neutral-900 md:text-[1.5rem]"
            value={finalPrice}
          />
        </div>
        <div className="mt-auto flex w-full items-center justify-center">
          <button
            type="button"
            onClick={() => router.push(finalLink)}
            className="relative z-10 inline-flex w-full max-w-[160px] items-center justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold tracking-wide text-white transition"
            aria-label={`Kupi ${displayName ?? name}`}
          >
            Kupi sada
          </button>
        </div>
      </div>
    </div>
  );
}
