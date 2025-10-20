'use client';

import Image from 'next/image';
import Link from 'next/link';
import { OrderItem } from '@/lib/types/order';
import { formatPrice } from '@/lib/formatters';
import { getStrapiURL } from '@/lib/utils/utils';
import { makeProductLink } from '@/lib/utils/link-helpers';
import { useTranslations } from 'next-intl';

interface OrderItemsListProps {
  items: OrderItem[];
}

/**
 * Component to display list of ordered products with images and details
 */
export function OrderItemsList({ items }: OrderItemsListProps) {
  const t = useTranslations('orderDetailsPage');
  const baseUrl = getStrapiURL();

  return (
    <div className="divide-y divide-gray-200">
      {items.map((item) => {
        const product = item.product;
        const imageUrl = product.images?.[0]?.url
          ? `${baseUrl}${product.images[0].url}`
          : '/assets/images/placeholder.png';
        const hasProductLink = Boolean(
          product.category?.link && product.productTypeId && product.productLink
        );
        const productHref = hasProductLink
          ? makeProductLink(
              product.category?.link ?? '',
              product.productTypeId,
              product.productLink
            )
          : undefined;
        const rawUnitPrice =
          product.discountedPrice ?? product.originalPrice ?? 0;
        const unitPrice = Number(rawUnitPrice);
        const totalPrice = unitPrice * item.quantity;

        return (
          <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
            {/* Product Image */}
            {productHref ? (
              <Link
                aria-label={product.name}
                className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                href={productHref}
              >
                <Image
                  alt={product.images?.[0]?.alternativeText || product.name}
                  className="object-contain p-2"
                  fill
                  sizes="96px"
                  src={imageUrl}
                />
              </Link>
            ) : (
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <Image
                  alt={product.images?.[0]?.alternativeText || product.name}
                  className="object-contain p-2"
                  fill
                  sizes="96px"
                  src={imageUrl}
                />
              </div>
            )}

            {/* Product Details */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                {productHref ? (
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-blue-600"
                    href={productHref}
                  >
                    {product.name}
                  </Link>
                ) : (
                  <h3 className="text-base font-medium text-gray-900">
                    {product.name}
                  </h3>
                )}
                <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500">
                  {product.color && (
                    <span className="flex items-center gap-1">
                      <span
                        className="inline-block h-4 w-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: product.color.hex }}
                      />
                      {product.color.name}
                    </span>
                  )}
                  {product.memory && (
                    <span>
                      {product.memory.value}
                      {product.memory.unit}
                    </span>
                  )}
                  {product.chip && <span>{product.chip.name}</span>}
                </div>
              </div>

              {/* Price and Quantity */}
              <div className="flex items-end justify-between">
                <p className="text-sm text-gray-600">
                  {t('quantity')}:{' '}
                  <span className="font-medium">{item.quantity}</span>
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {formatPrice(totalPrice)} KM
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
