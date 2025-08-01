import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components/strapi/components';
import { Button } from '@/components/ui/button';
import Price from '@/components/ui/price';
import { ProductResponse } from '@/lib/types';
import { makeProductLink } from '@/lib/utils/link-helpers';
import { cn } from '@/lib/utils/utils';

interface ProductCardProps {
  product: ProductResponse;
  className?: string;
}
export default function RelatedProductAccessories({
  product,
  className,
}: ProductCardProps) {
  const t = useTranslations('common');
  const {
    name,
    images,
    productLink,
    discountedPrice,
    originalPrice,
    displayName,
  } = product;
  const image = images?.[0] ?? null;
  const finalPrice = discountedPrice ?? originalPrice;
  const finalName = displayName || name;
  const finalLink = makeProductLink(
    product.category?.link ?? '',
    product.productTypeId,
    productLink ?? ''
  );
  return (
    <div
      className={cn(
        'relative flex w-full max-w-72 flex-col items-start justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
        className
      )}
    >
      <Link className="absolute inset-0 z-10" href={finalLink}>
        <span className="sr-only">
          {t('viewDetailsWithName', { productName: finalName })}
        </span>
      </Link>
      <div className="relative z-20 mb-3 aspect-square w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
        {image && (
          <StrapiImage
            alt={image?.alternativeText || finalName}
            className="h-full w-full object-contain"
            height={168}
            src={image?.url ?? ''}
            width={168}
          />
        )}
      </div>
      <div className="flex w-full flex-col gap-1 border-b border-gray-200 pb-2">
        <p className="text-s text-center text-gray-800">{finalName}</p>
        <Price
          className="text-s mt-2 border-t border-gray-200 pt-2 text-center text-gray-600"
          value={finalPrice}
        />
      </div>
      <Button asChild size={'md'} variant={'filled'} className="w-full text-sm">
        <span>{t('buyNow')}</span>
      </Button>
    </div>
  );
}
