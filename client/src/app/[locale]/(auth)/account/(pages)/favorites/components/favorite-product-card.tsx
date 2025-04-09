'use client';
import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components';
import { IconTrash } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { CURRENCY } from '@/lib/constants';
import { ProductBase } from '@/lib/types';

export interface FavoriteProductCardProps {
  product: ProductBase;
  onDelete: (id: number) => void;
}

export default function FavoriteProductCard({
  product,
  onDelete,
}: FavoriteProductCardProps) {
  const t = useTranslations();
  const { name, image, original_price, discounted_price, specifications } =
    product;

  const price = discounted_price ?? original_price;

  const headingClassName = 'heading-5 md:bullet-heading-2 lg:heading-4';
  const paragraphClassName = 'paragraph-2 md:bullet-1 lg:paragraph-1';

  return (
    <div className="relative flex w-full flex-col items-center justify-between gap-4 rounded-2xl border-grey-extra-light px-14 py-10 shadow-standard-black md:flex-row md:px-3 md:py-8 lg:p-8">
      <StrapiImage
        alt={image?.alternativeText ?? null}
        className="h-full max-h-[166px] w-full max-w-[250px] object-contain md:max-h-[130px] md:max-w-[194px] lg:max-h-[166px] lg:max-w-[252px]"
        height={166}
        sizes="(max-width: 1024px) 12.125rem, 15.625rem"
        src={image?.url ?? ''}
        width={250}
      />
      <div className="flex flex-1 flex-col gap-1">
        <button
          className="absolute right-3 top-4 lg:bottom-4 lg:top-auto"
          onClick={() => onDelete(product.id)}
        >
          <IconTrash className="size-6 lg:size-9" />
        </button>
        <p className={paragraphClassName}>{name}</p>
        <p className={paragraphClassName}>
          {/* TODO: Remove hardcoded value */}
          {specifications?.join(', ') ?? 'M3 8 CPU 10 GPU 8GB 256GB'}
        </p>
        <p className={headingClassName}>{`${price} ${CURRENCY}`}</p>
        <Button
          className="w-fit"
          size={'md'}
          typography={'button1'}
          variant={'filled'}
          onClick={() => {}}
        >
          {t('common.buyNow')}
        </Button>
      </div>
    </div>
  );
}
