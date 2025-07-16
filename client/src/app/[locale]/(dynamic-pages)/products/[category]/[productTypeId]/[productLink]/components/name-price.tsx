import { useTranslations } from 'next-intl';

import Price from '@/components/ui/price';

interface NamePriceProps {
  name: string;
  discountedPrice: number | null;
  originalPrice: number;
  productVariantId: string;
}

export default function NamePrice({
  name,
  discountedPrice,
  originalPrice,
  productVariantId,
}: NamePriceProps) {
  const t = useTranslations('productPage');
  const hasDiscount =
    discountedPrice && originalPrice && discountedPrice < originalPrice;

  const finalPrice = discountedPrice ? discountedPrice : originalPrice;

  let discountPercentage: number | null = null;

  if (hasDiscount && discountedPrice !== null && originalPrice) {
    discountPercentage = Math.round(
      ((originalPrice - discountedPrice) / originalPrice) * 100
    );
  }

  return (
    <div>
      <p className="text-grey-dark">{`${t('productId')}: ${productVariantId}`}</p>
      <h1 className="mb-2 heading-4">{name}</h1>
      <div className="flex items-center gap-5">
        <Price className="heading-4" value={finalPrice} />

        {hasDiscount && (
          <>
            <Price
              className="text-grey-darker line-through paragraph-1"
              value={originalPrice}
            />
            {discountPercentage !== null && (
              <span className="text-green-dark heading-5">
                {discountPercentage}% off
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
