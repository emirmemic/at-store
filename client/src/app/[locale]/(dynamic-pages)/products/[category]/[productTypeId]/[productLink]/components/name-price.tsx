import Price from '@/components/ui/price';
import { useTranslations } from 'next-intl';

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
      <div className="flex flex-col">
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
                  {discountPercentage}% jeftinije
                </span>
              )}
            </>
          )}
        </div>
        <span className="mt-2 text-[1rem] font-thin">
          ili samo {Math.round(finalPrice / 24)} KM na 24 rate.
        </span>
      </div>
    </div>
  );
}
