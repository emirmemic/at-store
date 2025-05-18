'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { IconTrash } from '@/components/icons';
import { StrapiImage } from '@/components/strapi/components';
import { CounterInput } from '@/components/ui/counter-input';
import { CURRENCY } from '@/lib/constants';
import { ShoppingCartItem } from '@/lib/types';
import { makeProductLink } from '@/lib/utils/link-helpers';
import { cn } from '@/lib/utils/utils';

interface ProductCartTableItemProps {
  cartItem: ShoppingCartItem;
  onQuantityChange?: (cartItem: ShoppingCartItem) => void;
  onRemove?: (cartItem: ShoppingCartItem) => void;
  className?: string;
  isMobile?: boolean;
}

export default function ProductCartTableItem({
  cartItem,
  onQuantityChange,
  onRemove,
  className,
  isMobile = false,
}: ProductCartTableItemProps) {
  const t = useTranslations('common');
  const { product, quantity } = cartItem;

  const handleQuantityChange = (newValue: number) => {
    onQuantityChange?.({ ...cartItem, quantity: newValue });
  };

  const handleRemove = () => {
    onRemove?.({ ...cartItem, quantity: 0 });
  };

  const finalPrice = product.discountedPrice ?? product.originalPrice;
  const totalPrice = `${finalPrice * quantity} ${CURRENCY}`;
  const image = product.images?.[0] ?? null;
  const finalLink = makeProductLink(
    product?.category?.link ?? '',
    product.productTypeId,
    product.productLink ?? ''
  );

  return (
    <div
      className={cn(
        isMobile
          ? 'relative flex w-full flex-col gap-2 border-b border-grey-light p-2 pb-4 heading-5'
          : 'relative flex w-full flex-col gap-2 border-b border-grey-light p-2 pb-4 heading-5 md:grid md:grid-cols-6 md:gap-4 lg:heading-4',
        className
      )}
    >
      <div
        className={cn(
          isMobile
            ? 'flex items-center gap-3 pr-8'
            : 'flex items-center gap-3 pr-8 md:col-span-2 md:grid md:grid-cols-2 md:gap-4 md:p-0'
        )}
      >
        <div
          className={cn(
            isMobile ? 'col-span-1 mb-2 h-32 w-32' : 'col-span-1 mb-2 h-32 w-32'
          )}
        >
          {image && (
            <StrapiImage
              alt={image?.alternativeText || product.name}
              className="h-full w-full object-contain"
              height={128}
              sizes="(max-width: 1024px) 8rem, 10rem"
              src={image?.url ?? ''}
              width={128}
            />
          )}
        </div>
        <div
          className={cn(
            isMobile
              ? 'flex flex-col gap-3'
              : 'flex flex-col gap-3 md:col-span-1 md:flex-row md:gap-4'
          )}
        >
          <Link
            className={cn('max-h-28 overflow-hidden hover:underline')}
            href={finalLink}
          >
            {product.name}
          </Link>
          <p className={isMobile ? '' : 'md:hidden'}>
            {finalPrice} {CURRENCY}
          </p>
        </div>
      </div>

      {!isMobile && (
        <p className="hidden self-center md:col-span-1 md:block">
          {finalPrice} {CURRENCY}
        </p>
      )}

      <div
        className={cn(
          isMobile
            ? 'flex w-full items-center justify-between gap-4'
            : 'flex w-full items-center justify-between gap-4 md:col-span-2 md:grid md:grid-cols-2 md:justify-center md:gap-4'
        )}
      >
        <CounterInput
          className={cn(isMobile ? 'self-end' : 'self-end md:self-start')}
          max={product.amountInStock}
          min={1}
          value={quantity}
          onChange={handleQuantityChange}
        />

        <p>{totalPrice}</p>
      </div>

      <div
        className={cn(isMobile ? '' : 'md:col-span-1 md:flex md:justify-end')}
      >
        <button
          aria-label={t('removeItem')}
          className={cn(
            'absolute right-2 top-2 p-2 text-black transition-colors duration-300 hover:text-grey-darker',
            !isMobile && 'md:static'
          )}
          title={t('removeItem')}
          type="button"
          onClick={handleRemove}
        >
          <IconTrash className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
