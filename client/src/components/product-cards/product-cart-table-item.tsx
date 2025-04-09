'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { IconTrash } from '@/components/icons';
import { CounterInput } from '@/components/ui/counter-input';
import { CURRENCY } from '@/lib/constants';
import { ShoppingCartItem } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface ProductCartTableItemProps {
  product: ShoppingCartItem;
  onQuantityChange?: (productId: string, newQuantity: number) => void;
  onRemove?: (productId: string) => void;
  className?: string;
}

export default function ProductCartTableItem({
  product,
  onQuantityChange,
  onRemove,
  className,
}: ProductCartTableItemProps) {
  const t = useTranslations('common');

  const handleQuantityChange = (newValue: number) => {
    onQuantityChange?.(product.product_variant_id, newValue);
  };

  const handleRemove = () => {
    onRemove?.(product.product_variant_id);
  };

  const availability = product.availability_by_store;
  const availableQuantity = Object.values(availability).reduce(
    (acc, quantity) => acc + quantity,
    0
  );
  const totalPrice = `${product.final_price * product.quantity_in_cart} ${CURRENCY}`;
  return (
    <div
      className={cn(
        'relative flex w-full flex-col gap-2 border-b border-grey-light p-2 pb-4 heading-5 md:grid md:grid-cols-6 md:gap-4 lg:heading-4',
        className
      )}
    >
      <div className="flex items-center gap-3 pr-8 md:col-span-3 md:grid md:grid-cols-3 md:gap-4 md:p-0">
        <div className="col-span-1 mb-2 h-32 w-32">
          <Image
            alt={product.name}
            className="h-full w-full object-contain"
            height={128}
            src={product.image?.url ?? ''}
            width={128}
          />
        </div>
        <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:gap-4">
          <p className="md:w-1/2 md:text-end">{product.name}</p>
          <p className="md:w-1/2 md:text-end">
            {product.final_price} {CURRENCY}
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-4 md:col-span-2 md:grid md:grid-cols-2 md:justify-center md:gap-4">
        <CounterInput
          className="self-end"
          max={availableQuantity}
          min={1}
          value={product.quantity_in_cart}
          onChange={handleQuantityChange}
        />

        <p className="md:text-end">{totalPrice}</p>
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
