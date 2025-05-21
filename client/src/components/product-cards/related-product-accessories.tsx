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
        'relative flex w-full max-w-72 flex-col items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-outline-black transition-all hover:shadow-outline-black-hover',
        className
      )}
    >
      <Link className="z-1 absolute inset-0" href={finalLink}>
        <span className="sr-only">
          {t('viewDetailsWithName', { productName: finalName })}
        </span>
      </Link>
      <div className="h-40 w-full">
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
      <div className="flex flex-col gap-1">
        <p className="flex min-h-16 items-center justify-center text-center heading-4">
          {finalName}
        </p>
        <Price value={finalPrice} />
      </div>
      <Button asChild size={'md'} variant={'filled'}>
        <span>{t('buyNow')}</span>
      </Button>
    </div>
  );
}
