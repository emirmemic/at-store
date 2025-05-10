import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { CURRENCY } from '@/lib/constants';
import { BestSellerItem } from '@/lib/types';

import { StrapiImage } from '../strapi/components/strapi-image';
export default function BestSellerCard(bestSeller: BestSellerItem) {
  const { name, originalPrice, discountedPrice, images, productLink } =
    bestSeller.product;
  const { tagline } = bestSeller;
  const t = useTranslations('common');

  const finalPrice = discountedPrice ?? originalPrice;
  const image = images?.[0] ?? null;
  return (
    <div className="flex h-full w-full flex-col justify-between gap-6 rounded-2xl border bg-white p-4 text-grey-almost-black shadow-outline-black">
      <div>
        <div className="mx-auto mb-4 h-48 w-full">
          {image && (
            <StrapiImage
              alt={image.alternativeText || name}
              className="h-full w-full object-contain"
              height={172}
              src={image.url}
              width={172}
            />
          )}
        </div>
        <p className="mb-3 paragraph-4">{tagline}</p>
        <p className="mb-3 text-ellipsis heading-4">{name}</p>
        <p className="font-sf-pro-display paragraph-2">
          {`${finalPrice} ${CURRENCY}`}
        </p>
      </div>
      {productLink && (
        <Button asChild className="mx-auto w-fit" size="md" variant="filled">
          <Link
            href={{
              pathname: PAGE_NAMES.PRODUCT_DETAILS,
              params: { slug: productLink },
            }}
          >
            {t('buyNow')}
          </Link>
        </Button>
      )}
    </div>
  );
}
