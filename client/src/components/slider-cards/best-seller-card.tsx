import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { BestSellerItem } from '@/lib/types';
import { makeProductLink } from '@/lib/utils/link-helpers';

import { StrapiImage } from '../strapi/components/strapi-image';
import Price from '../ui/price';
import FavoritesHeart from '../ui/favorites-heart';

import { useContext, useState } from 'react';
import { useToast } from '@/lib/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/app/providers';
import { PAGE_NAMES } from '@/i18n/page-names';

export default function BestSellerCard(bestSeller: BestSellerItem) {
  const {
    name,
    originalPrice,
    discountedPrice,
    images,
    productLink,
    productTypeId,
    category,
    // Add tag if present on product
    tag,
    // Add finalSpecs if present on product
    finalSpecs = [],
  } = bestSeller.product as any;
  // If tag/finalSpecs are not present, adjust destructuring above as needed
  const { tagline } = bestSeller;
  const t = useTranslations('common');

  const { toggleFavorite, user } = useContext(UserContext);
  const router = useRouter();
  const { toast } = useToast();

  const [favorites, setFavorites] = useState<number[]>(
    bestSeller.product.favoritedBy?.map((f) => f.id) ?? []
  );

  const isInFavorites = user ? favorites.includes(user.id) : false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      toggleFavorite(bestSeller.product)
        .then(() => {
          setFavorites((prev) => {
            toast({
              title: prev.includes(user.id)
                ? 'Uklonjeno iz omiljenih'
                : 'Dodano u omiljene',
            });
            return prev.includes(user.id)
              ? prev.filter((id) => id !== user.id)
              : [...prev, user.id];
          });
        })
        .catch((error) => {
          toast({
            title: error.name,
            variant: 'destructive',
            description: error.message,
          });
        });
    } else {
      toast({
        title: 'Niste prijavljeni',
        variant: 'default',
      });
      router.push(PAGE_NAMES.LOGIN);
    }
  };

  const finalPrice = discountedPrice ?? originalPrice;
  const image = images?.[0] ?? null;

  const finalLink = makeProductLink(
    category?.link ?? '',
    productTypeId,
    productLink ?? ''
  );

  // Discount percentage calculation
  const discountPercentage =
    discountedPrice && originalPrice
      ? Math.round(100 - (discountedPrice / originalPrice) * 100)
      : null;

  // Fallback for tag if not on product, use tagline as legacy
  const cardTag = tag || tagline || null;

  return (
    <div className="relative flex w-full flex-col bg-white text-grey-almost-black">
      <Link className="absolute inset-0 z-10" href={finalLink}>
        <span className="sr-only">
          {t('viewDetailsWithName', { productName: name })}
        </span>
      </Link>

      <div className="relative flex aspect-[1/1] w-full items-center justify-center bg-grey-almost-white">
        {image ? (
          <StrapiImage
            alt={image?.alternativeText || name}
            className="max-h-[80%] max-w-[80%] object-contain"
            height={300}
            sizes="(max-width: 1024px) 16rem, 32rem"
            src={image?.url ?? ''}
            width={300}
          />
        ) : (
          <p className="text-center text-sm text-grey-light">
            Nema dostupnih slika
          </p>
        )}
        <FavoritesHeart
          className="absolute right-2 top-2 z-20"
          disabled={false}
          isInFavorites={isInFavorites}
          isLoading={false}
          onClick={handleFavoriteClick}
        />
      </div>

      <div className="mt-4 space-y-1 px-1 pb-2 text-left">
        <p className="text-sm font-semibold leading-tight">{name}</p>
        {finalSpecs && finalSpecs.length > 0 && (
          <p className="text-xs text-grey-dark">{finalSpecs[0]}</p>
        )}
        <p className="text-xs text-grey-dark">Apple</p>
        <Price className="mt-1 text-sm font-semibold" value={finalPrice} />
      </div>
    </div>
  );
}
