'use client';

import { useContext, useState } from 'react';

import { CartContext } from '@/app/providers/cart-provider';
import Image from 'next/image';
import Link from 'next/link';
import { ProductResponse } from '@/lib/types';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { makeProductLink } from '@/lib/utils/link-helpers';
import { useToast } from '@/lib/hooks/use-toast';
import { useTranslations } from 'next-intl';

interface QuickBuyProductCardProps {
  product: ProductResponse;
  subtitle?: string;
}

export default function QuickBuyProductCard({
  product,
  subtitle,
}: QuickBuyProductCardProps) {
  const t = useTranslations();
  const { toast } = useToast();
  const { updateCart } = useContext(CartContext);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return null;
  }

  const {
    name,
    displayName,
    discountedPrice,
    originalPrice,
    images,
    productLink,
    amountInStock,
  } = product;

  const finalPrice = discountedPrice ?? originalPrice;
  const image = images?.[0];

  // Safe link creation with fallbacks
  const categoryLink = product.category?.link || '';
  const productType = product.productTypeId || '';
  const link = productLink || '';

  const finalLink = makeProductLink(categoryLink, productType, link);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (amountInStock <= 0) {
      toast({
        title: t('productPage.outOfStock'),
        variant: 'destructive',
      });
      return;
    }

    setIsAdding(true);
    try {
      await updateCart({
        id: product.id,
        product,
        quantity: 1,
      });
      toast({
        title: t('common.addedToCart'),
      });
    } catch (error) {
      toast({
        title: t('common.error'),
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const discountPercentage = discountedPrice
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;

  const imageUrl = image
    ? `${STRAPI_BASE_URL}${(image as any).formats?.medium?.url || image.url}`
    : '/placeholder-product.png';

  return (
    <div className="group relative flex h-full flex-col">
      <Link href={finalLink} className="block flex-1">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#F5F5F7] transition-all duration-300 hover:border-neutral-300 hover:shadow-lg">
          {/* Product Image */}
          <div className="relative mx-auto mt-6 aspect-square w-full max-w-[256px] overflow-hidden p-12">
            <Image
              src={imageUrl}
              alt={displayName || name || 'Product'}
              fill
              className="object-contain"
              sizes="(max-width: 512px) 50vw, 25vw"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col items-center justify-between px-8 pb-8 pt-6 text-center">
            <div className="w-full space-y-2">
              {/* Discount Badge or Subtitle - Fixed height container */}
              <div className="min-h-[1.25rem]">
                {discountPercentage > 0 && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                    Popust {discountPercentage}%
                  </p>
                )}
                {subtitle && !discountPercentage && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Product Name */}
              <h3 className="line-clamp-2 min-h-[3rem] text-lg font-semibold text-neutral-900">
                {displayName || name}
              </h3>

              {/* Price */}
              <div className="space-y-0.5 pt-2">
                {discountPercentage > 0 && (
                  <p className="text-xs text-neutral-500 line-through">
                    {originalPrice.toFixed(2)} KM
                  </p>
                )}
                <p className="text-xl font-semibold text-neutral-900">
                  {finalPrice.toFixed(2)} KM
                </p>
                <p className="text-md font-thin text-neutral-900">
                  ili {((finalPrice + finalPrice * 0.1) / 24).toFixed(2)} KM na
                  24 mjeseca
                </p>
              </div>
            </div>
            <div className="mt-10 w-fit">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full rounded-3xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isAdding ? 'Dodavanje...' : 'Dodaj u korpu'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
