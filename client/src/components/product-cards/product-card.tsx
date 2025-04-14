'use client';
// TODO - Change the Link import from next-intl while building the product details page
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useContext, useState } from 'react';

import { UserContext } from '@/app/providers';
import FavoritesHeart from '@/components/ui/favorites-heart';
import { CURRENCY } from '@/lib/constants';
import { useLoader } from '@/lib/hooks';
import { useToast } from '@/lib/hooks/use-toast';
import { ProductBase } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

import { StrapiImage } from '../strapi-image';

interface ProductCardProps {
  product: ProductBase;
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
    discounted_price,
    original_price,
    tag,
    image,
    specifications,
    product_link,
    favorited_by,
  } = product;
  const t = useTranslations('common');
  const { toast } = useToast();
  const { toggleFavorite, user } = useContext(UserContext);
  const [favoritedBy, setFavoritedBy] = useState<number[]>(
    favorited_by?.map((f) => f.id) ?? []
  );

  const { execute, isLoading } = useLoader({
    apiCall: () => toggleFavorite(product),
    onSuccess: () => {
      toast({
        title: t('successful'),
      });
      if (user) {
        setFavoritedBy((prev) =>
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
  const finalSpecs = specifications ? specifications.slice(0, 4) : [];
  const finalPrice = discounted_price ?? original_price;

  return (
    <div
      className={cn(
        'relative flex w-full flex-col justify-between gap-3 rounded-2xl border border-grey-extra-light bg-white py-6 shadow-standard-black transition-all hover:shadow-standard-black-hover',
        variant === 'accessories' && 'max-w-[300px] px-18px',
        variant === 'standard' && 'max-w-[340px] px-6',
        className
      )}
    >
      {product_link && (
        <Link className="z-1 absolute inset-0" href={product_link}>
          <span className="sr-only">
            {t('viewDetailsWithName', { productName: name })}
          </span>
        </Link>
      )}
      <div
        className={cn('w-full', {
          'h-44': variant === 'accessories',
          'h-52': variant === 'standard',
        })}
      >
        {/* TODO use StrapiImage when connected with API*/}
        <StrapiImage
          alt={image?.alternativeText || name}
          className="h-full w-full object-contain"
          height={200}
          src={image?.url ?? ''}
          width={200}
        />
      </div>
      <div>
        <div className="mb-1 flex min-h-16 items-center justify-between gap-2">
          <p className="heading-4">{name}</p>
          <FavoritesHeart
            className="z-3 relative"
            disabled={isLoading}
            isInFavorites={user ? favoritedBy.includes(user.id) : false}
            isLoading={isLoading}
            onClick={() => {
              if (user) execute();
            }}
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
        {discounted_price && (
          <p className="mb-0.5 line-through paragraph-2">{`${original_price} ${CURRENCY}`}</p>
        )}
        <p className="heading-4">{`${finalPrice} ${CURRENCY}`}</p>
      </div>

      {tag && (
        <div className="absolute right-0 top-0 flex min-w-28 -translate-y-1/2 justify-center rounded-2xl bg-red-deep px-2">
          <p className="text-white heading-5">{tag}</p>
        </div>
      )}
    </div>
  );
}
