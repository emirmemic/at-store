'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import { UserContext } from '@/app/providers';
import { StrapiImage } from '@/components/strapi/components';
import FavoritesHeart from '@/components/ui/favorites-heart';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { CURRENCY } from '@/lib/constants';
import { useLoader } from '@/lib/hooks';
import { useToast } from '@/lib/hooks/use-toast';
import { ProductResponse } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

import ProductTag from './product-tag';

interface ProductCardProps {
  product: ProductResponse;
  variant?: 'standard' | 'accessories';
  className?: string;
}
export default function ProductCard({
  product,
  variant = 'standard',
  className,
}: ProductCardProps) {
  const {
    name,
    discountedPrice,
    originalPrice,
    tag,
    images,
    // specifications,
    favoritedBy,
    productLink,
  } = product;
  const t = useTranslations('');
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
  const router = useRouter();

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
  // const finalSpecs = specifications ? specifications.slice(0, 4) : [];
  const finalPrice = discountedPrice ?? originalPrice;
  const image = images?.[0] || null;

  return (
    <div
      className={cn(
        'relative flex w-full flex-col justify-between gap-3 rounded-2xl border border-grey-extra-light bg-white py-6 shadow-standard-black transition-all hover:shadow-standard-black-hover',
        variant === 'accessories' && 'max-w-[300px] px-18px',
        variant === 'standard' && 'max-w-[340px] px-6',
        className
      )}
    >
      <Link
        className="z-1 absolute inset-0"
        href={{
          pathname: PAGE_NAMES.PRODUCT_DETAILS,
          params: { slug: productLink },
        }}
      >
        <span className="sr-only">
          {t('common.viewDetailsWithName', { productName: name })}
        </span>
      </Link>
      <div
        className={cn('w-full', {
          'h-44': variant === 'accessories',
          'h-52': variant === 'standard',
        })}
      >
        {image ? (
          <StrapiImage
            alt={image?.alternativeText || name}
            className="h-full w-full object-contain"
            height={200}
            src={image?.url ?? ''}
            width={200}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-grey-almost-white p-4 text-grey-medium paragraph-1">
            {t('productPage.noImagesAvailable')}
          </div>
        )}
      </div>
      <div>
        <div className="mb-1 flex min-h-16 items-center justify-between gap-2">
          <p className="heading-4">{name}</p>
          <FavoritesHeart
            className="z-3 relative"
            disabled={isLoading}
            isInFavorites={user ? favorites.includes(user.id) : false}
            isLoading={isLoading}
            onClick={handleFavoriteClick}
          />
        </div>
        {/* TODO Do the specs once webaccount api is adjusted and we have the specs in the database */}
        {/* {finalSpecs.length > 0 && (
          <div className="mb-2 flex flex-col">
            {finalSpecs.map((spec, i) => (
              <p key={`${spec}-${i}`} className="text-grey-darker paragraph-4">
                {spec}
              </p>
            ))}
          </div>
        )} */}
        {discountedPrice && (
          <p className="mb-0.5 line-through paragraph-2">{`${originalPrice} ${CURRENCY}`}</p>
        )}
        <p className="heading-4">{`${finalPrice} ${CURRENCY}`}</p>
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
