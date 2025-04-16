import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { CURRENCY } from '@/lib/constants';
import { BestSellerItem } from '@/lib/types';
export default function BestSellerCard(product: BestSellerItem) {
  const {
    name,
    original_price,
    discounted_price,
    image,
    tagline,
    product_link,
  } = product;
  const t = useTranslations('common');
  const finalPrice = discounted_price ?? original_price;
  return (
    <div className="flex h-full w-full flex-col justify-between gap-6 rounded-2xl border bg-white p-4 text-grey-almost-black shadow-outline-black">
      <div>
        <div className="mx-auto mb-4 h-48 w-full">
          {image && (
            <Image
              alt={image.alternativeText || name}
              className="h-full w-full object-contain"
              height={172}
              src={image.url}
              width={172}
            />
          )}
        </div>
        <p className="mb-3 paragraph-4">{tagline}</p>
        <p className="mb-3 heading-4">{name}</p>
        <p className="font-sf-pro-display paragraph-2">
          {`${finalPrice} ${CURRENCY}`}
        </p>
      </div>
      {product_link && (
        <Button asChild className="mx-auto w-fit" size="md" variant="filled">
          <Link href={product_link}>{t('buyNow')}</Link>
        </Button>
      )}
    </div>
  );
}
