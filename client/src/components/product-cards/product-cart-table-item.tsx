'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { IconTrash } from '@/components/icons';
import { StrapiImage } from '@/components/strapi/components';
import { CounterInput } from '@/components/ui/counter-input';
import Price from '@/components/ui/price';
import { ImageProps, ProductResponse, ShoppingCartItem } from '@/lib/types';
import { makeProductLink } from '@/lib/utils/link-helpers';

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
    <div className="h-32 w-32 shrink-0">
      {image ? (
        <StrapiImage
          alt={image?.alternativeText || product.displayName}
          className="h-full w-full object-contain"
          height={128}
          sizes="(max-width: 1024px) 8rem, 10rem"
          src={image?.url ?? ''}
          width={128}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-grey-almost-white p-4 text-grey-medium paragraph-4">
          {t('noImagesAvailable')}
        </div>
      )}
    </div>
  );
};

const CloseButton = ({ onClick }: { onClick: () => void }) => {
  const t = useTranslations('common');
  return (
    <button
      aria-label={t('removeItem')}
      className="-mr-2 p-2 text-black transition-colors duration-300 hover:text-grey-darker"
      title={t('removeItem')}
      type="button"
      onClick={onClick}
    >
      <IconTrash className="h-5 w-5" />
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
    <div className="flex flex-col gap-2 border-b border-grey-light py-4 heading-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <ImageContainer image={image} product={product} />
          <div className="flex flex-col gap-3">
            <Link className="hover:underline" href={finalLink}>
              {product.displayName}
            </Link>
            <Price value={finalPrice} />
          </div>
        </div>
        <CloseButton onClick={onRemove} />
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <CounterInput
          max={product.amountInStock}
          min={1}
          value={quantity}
          onChange={onQuantityChange}
        />

        <Price value={totalPrice} />
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
    <tr className="border-b border-grey-light paragraph-2">
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <ImageContainer image={image} product={product} />
          <Link className="hover:underline" href={finalLink}>
            {product.displayName}
          </Link>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-4">
        <Price value={finalPrice} />
      </td>

      <td className="px-4 py-4">
        <CounterInput
          max={product.amountInStock}
          min={1}
          value={quantity}
          onChange={onQuantityChange}
        />
      </td>
      <td className="whitespace-nowrap px-4 py-4">
        <Price value={totalPrice} />
      </td>
      <td className="px-4 py-4">
        <CloseButton onClick={onRemove} />
      </td>
    </tr>
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
