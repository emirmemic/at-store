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
import { makeProductLink } from '@/lib/utils/link-helpers';
import { makeSpecsArray } from '@/lib/formatters';
import { useLoader } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { useToast } from '@/lib/hooks/use-toast';
import { useTranslations } from 'next-intl';

interface ProductsListForPromotionsProps {
  products: ProductResponse[];
  className?: string;
}

export default function ProductsListForPromotions({
  products,
  className = '',
}: ProductsListForPromotionsProps) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {products.map((product) => (
        <PromotionProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

interface PromotionProductCardProps {
  product: ProductResponse;
}

function PromotionProductCard({ product }: PromotionProductCardProps) {
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
  const finalSpecs = specs
    .filter((spec) => spec !== 'nullnull' && spec !== null)
    .slice(0, 3);
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

  // Calculate installment price (12 months)
  const installmentPrice = (finalPrice / 24).toFixed(0) as unknown as number;

  return (
    <div className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-[#f5f5f7] transition-all duration-300">
      <Link className="z-1 absolute inset-0" href={finalLink}>
        <span className="sr-only">
          {t('common.viewDetailsWithName', {
            productName: name,
          })}
        </span>
      </Link>

      {/* Image Section */}
      <div className="relative overflow-hidden bg-white p-8">
        {image ? (
          <StrapiImage
            alt={image?.alternativeText || name}
            className="aspect-square w-full object-contain p-12 transition-transform duration-500"
            height={400}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={image?.url ?? ''}
            width={400}
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            {t('productPage.noImagesAvailable')}
          </div>
        )}

        {/* Favorite Button */}
        <div className="absolute right-4 top-4">
          <FavoritesHeart
            className="z-3 relative"
            disabled={isLoading}
            isInFavorites={user ? favorites.includes(user.id) : false}
            isLoading={isLoading}
            onClick={handleFavoriteClick}
          />
        </div>

        {/* Tag */}
        {tag && <ProductTag className="absolute left-4 top-4" tag={tag} />}
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col space-y-3 p-6">
        {/* Product Name */}
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">
          {displayName ?? name}
        </h3>

        {/* Specs */}
        {finalSpecs.length > 0 && (
          <div className="flex flex-col space-y-1">
            {finalSpecs.map((spec, i) => (
              <p key={`${spec}-${i}`} className="text-sm text-slate-600">
                {spec}
              </p>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Pricing Section */}
        <div className="space-y-2 border-t border-slate-100 pt-4">
          {/* Discount Info */}
          {discountedPrice && (
            <div className="flex items-center gap-2">
              <Price
                className="text-md text-slate-500 line-through"
                value={originalPrice}
              />
              <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase text-green-600">
                {discountPercentage}% jeftinije
              </span>
            </div>
          )}

          {/* Main Price */}
          <div className="flex items-baseline justify-between">
            <Price
              className="text-2xl font-bold text-slate-900"
              value={finalPrice}
            />
          </div>

          {/* Installments */}
          <div className="flex items-center gap-1 text-sm text-slate-600">
            <span>ili</span>
            <Price
              className="font-semibold text-slate-900"
              value={installmentPrice}
            />
            <span>mjesečno na 24 rate.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
