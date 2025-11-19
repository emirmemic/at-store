'use client';

import { ImageProps, ProductResponse, ShoppingCartItem } from '@/lib/types';

import { CounterInput } from '@/components/ui/counter-input';
import { IconTrash } from '@/components/icons';
import Link from 'next/link';
import Price from '@/components/ui/price';
import { StrapiImage } from '@/components/strapi/components';
import { makeProductLink } from '@/lib/utils/link-helpers';
import { useTranslations } from 'next-intl';

interface ProductCartTableItemProps {
  cartItem: ShoppingCartItem;
  onQuantityChange?: (cartItem: ShoppingCartItem) => void;
  onRemove?: (cartItem: ShoppingCartItem) => void;
  isDesktop?: boolean;
}

interface CartItemProps {
  product: ProductResponse;
  image: ImageProps | null;
  finalLink: string;
  quantity: number;
  finalPrice: number;
  totalPrice: number;
  onRemove: () => void;
  onQuantityChange: (newValue: number) => void;
}

const ImageContainer = ({
  image,
  product,
}: {
  image: ImageProps | null;
  product: ProductResponse;
}) => {
  const t = useTranslations('productPage');
  return (
    <div className="h-64 w-64 shrink-0 overflow-hidden rounded-xl bg-white">
      {image ? (
        <StrapiImage
          alt={image?.alternativeText || product.displayName}
          className="h-full w-full object-contain p-3"
          height={144}
          sizes="(max-width: 1024px) 9rem, 9rem"
          src={image?.url ?? ''}
          width={144}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-4 text-xs text-grey-medium">
          {t('noImagesAvailable')}
        </div>
      )}
    </div>
  );
};

const CloseButton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  const t = useTranslations('common');
  return (
    <button
      aria-label={t('removeItem')}
      className={`${className} group rounded-full p-2 transition-all duration-200 hover:bg-grey-almost-white`}
      title={t('removeItem')}
      type="button"
      onClick={onClick}
    >
      <IconTrash
        className={`${className} h-5 w-5 text-grey-medium transition-colors duration-200 group-hover:text-grey-darker`}
      />
    </button>
  );
};

const MobileCartItem = ({
  product,
  quantity,
  image,
  finalLink,
  finalPrice,
  totalPrice,
  onRemove,
  onQuantityChange,
}: CartItemProps) => {
  return (
    <div className="flex flex-col items-center gap-3 py-4 first:pt-0">
      <ImageContainer image={image} product={product} />
      <Link
        className="text-center text-lg font-medium text-grey-almost-black transition-colors hover:text-blue"
        href={finalLink}
      >
        {product.displayName}
      </Link>
      <div className="flex w-full items-center justify-evenly">
        <CounterInput
          max={product.amountInStock}
          min={1}
          value={quantity}
          onChange={onQuantityChange}
        />
        <Price className="text-lg font-semibold" value={totalPrice} />
        <CloseButton onClick={onRemove} className="text-red-500" />
      </div>
    </div>
  );
};
const DesktopCartItem = ({
  product,
  quantity,
  image,
  finalLink,
  finalPrice,
  totalPrice,
  onRemove,
  onQuantityChange,
}: CartItemProps) => {
  return (
    <div className="flex items-center gap-4">
      {/* Product Info */}
      <div className="flex flex-1 items-center gap-3">
        <ImageContainer image={image} product={product} />
        <Link
          className="line-clamp-2 text-2xl font-medium text-grey-almost-black transition-colors hover:text-gray-500"
          href={finalLink}
        >
          {product.displayName}
        </Link>
      </div>

      {/* Quantity, Total & Remove */}
      <div className="flex items-center gap-12">
        <div className="flex w-28 justify-center">
          <CounterInput
            max={product.amountInStock}
            min={1}
            value={quantity}
            onChange={onQuantityChange}
          />
        </div>

        <div className="w-24 text-right">
          <Price className="text-base font-semibold" value={totalPrice} />
        </div>

        <div className="flex w-8 justify-end">
          <CloseButton onClick={onRemove} className="text-red-500" />
        </div>
      </div>
    </div>
  );
};

export default function ProductCartTableItem({
  cartItem,
  onQuantityChange,
  onRemove = () => {}, // Provide a default no-op function to avoid runtime errors
  isDesktop = true,
}: ProductCartTableItemProps) {
  const { product, quantity } = cartItem;
  const handleQuantityChange = (newValue: number) => {
    onQuantityChange?.({ ...cartItem, quantity: newValue });
  };

  const handleRemove = () => {
    onRemove?.({ ...cartItem, quantity: 0 });
  };

  const finalPrice = product.discountedPrice ?? product.originalPrice;
  const totalPrice = finalPrice * quantity;
  const image = product.images?.[0] ?? null;
  const finalLink = makeProductLink(
    product?.category?.link ?? '',
    product.productTypeId,
    product.productLink ?? ''
  );
  return (
    <>
      {isDesktop ? (
        <DesktopCartItem
          finalLink={finalLink}
          finalPrice={finalPrice}
          image={image}
          product={product}
          quantity={quantity}
          totalPrice={totalPrice}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      ) : (
        <MobileCartItem
          finalLink={finalLink}
          finalPrice={finalPrice}
          image={image}
          product={product}
          quantity={quantity}
          totalPrice={totalPrice}
          onQuantityChange={handleQuantityChange}
          onRemove={handleRemove}
        />
      )}
    </>
  );
}
