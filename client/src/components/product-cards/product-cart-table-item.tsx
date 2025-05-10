'use client';

import { useTranslations } from 'next-intl';

import { IconTrash } from '@/components/icons';
import { StrapiImage } from '@/components/strapi/components';
import { CounterInput } from '@/components/ui/counter-input';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { CURRENCY } from '@/lib/constants';
import { ShoppingCartItem } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface ProductCartTableItemProps {
  cartItem: ShoppingCartItem;
  onQuantityChange?: (cartItem: ShoppingCartItem) => void;
  onRemove?: (cartItem: ShoppingCartItem) => void;
  className?: string;
}

export default function ProductCartTableItem({
  cartItem,
  onQuantityChange,
  onRemove,
  className,
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

  return (
    <div
      className={cn(
        'relative flex w-full flex-col gap-2 border-b border-grey-light p-2 pb-4 heading-5 md:grid md:grid-cols-6 md:gap-4 lg:heading-4',
        className
      )}
    >
      <div className="flex items-center gap-3 pr-8 md:col-span-2 md:grid md:grid-cols-2 md:gap-4 md:p-0">
        <div className="col-span-1 mb-2 h-32 w-32">
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
        <div className="flex flex-col gap-3 md:col-span-1 md:flex-row md:gap-4">
          <Link
            className="hover:underline md:w-1/2 md:text-end"
            href={{
              pathname: PAGE_NAMES.PRODUCT_DETAILS,
              params: { slug: product.productLink },
            }}
          >
            {product.name}
          </Link>
          <p className="md:hidden">
            {finalPrice} {CURRENCY}
          </p>
        </div>
      </div>

      <p className="hidden self-center md:col-span-1 md:block">
        {finalPrice} {CURRENCY}
      </p>

      <div className="flex w-full items-center justify-between gap-4 md:col-span-2 md:grid md:grid-cols-2 md:justify-center md:gap-4">
        <CounterInput
          className="self-end md:self-start"
          max={product.amountInStock}
          min={1}
          value={quantity}
          onChange={handleQuantityChange}
        />

        <p>{totalPrice}</p>
      </div>

      <div className="md:col-span-1 md:flex md:justify-end">
        <button
          aria-label={t('removeItem')}
          className="absolute right-2 top-2 p-2 text-black transition-colors duration-300 hover:text-grey-darker md:static"
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
