'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import { UserContext } from '@/app/providers';
import { StrapiImage } from '@/components/strapi/components';
import FavoritesHeart from '@/components/ui/favorites-heart';
import { PAGE_NAMES } from '@/i18n/page-names';
import { CURRENCY } from '@/lib/constants';
import { makeSpecsArray } from '@/lib/formatters';
import { useLoader } from '@/lib/hooks';
import { useToast } from '@/lib/hooks/use-toast';
import { ProductResponse } from '@/lib/types';
import { makeProductLink } from '@/lib/utils/link-helpers';
import { cn } from '@/lib/utils/utils';

import ProductTag from './product-tag';

interface ProductCardProps {
  product: ProductResponse;
  className?: string;
}
export default function ProductCard({ product, className }: ProductCardProps) {
  const {
    name,
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
        title: t('common.successful'),
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
  const specs = makeSpecsArray(product);
  const finalSpecs = specs.slice(0, 4);
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
  return (
    <div className={cn('relative flex w-full flex-col bg-white', className)}>
      <Link className="z-1 absolute inset-0" href={finalLink}>
        <span className="sr-only">
          {t('common.viewDetailsWithName', { productName: name })}
        </span>
      </Link>
      <div className="w-full bg-grey-almost-white">
        {image ? (
          <StrapiImage
            alt={image?.alternativeText || name}
            className="aspect-[4/3] w-full object-contain"
            height={200}
            sizes="(max-width: 1024px) 16rem, 32rem"
            src={image?.url ?? ''}
            width={200}
          />
        ) : (
          <div className="flex aspect-[4/3] h-full w-full items-center justify-center rounded-2xl bg-grey-almost-white p-4 text-grey-medium paragraph-1">
            {t('productPage.noImagesAvailable')}
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1 px-2 pb-4 text-left">
        <div className="flex flex-row items-center justify-between">
          <p className="text-md font-semibold">{name}</p>
          <FavoritesHeart
            className="z-3 relative"
            disabled={isLoading}
            isInFavorites={user ? favorites.includes(user.id) : false}
            isLoading={isLoading}
            onClick={handleFavoriteClick}
          />
        </div>
        {finalSpecs.length > 0 && (
          <div className="mb-2 flex flex-col">
            {finalSpecs.map((spec, i) => (
              <p key={`${spec}-${i}`} className="text-grey-darker paragraph-4">
                {spec}
              </p>
            ))}
          </div>
        )}
        {discountedPrice && (
          <div className="flex items-center gap-2 text-sm">
            <p className="text-muted-foreground line-through">{`${originalPrice} ${CURRENCY}`}</p>
            <p className="text-green-600">{`${discountPercentage}% off`}</p>
          </div>
        )}
        <p className="text-sm font-semibold">{`${finalPrice} ${CURRENCY}`}</p>
      </div>
      {tag && (
        <ProductTag
          className="absolute right-0 top-0 -translate-y-1/2"
          tag={tag}
        />
      )}
    </div>
  );
}
