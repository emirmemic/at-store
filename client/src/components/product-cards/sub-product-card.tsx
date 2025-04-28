'use client';
import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components/strapi/components';
import { ProductBase } from '@/lib/types';

import { Button } from '../ui/button';

interface SubProductCardProps {
  product: ProductBase;
  onClick?: () => void;
}
export default function SubProductCard({
  product,
  onClick,
}: SubProductCardProps) {
  const { name, chip, images } = product;
  const t = useTranslations('common');
  const image = images?.[0] ?? null;

  return (
    <div className="flex w-full flex-col justify-between gap-3 rounded-2xl border border-grey-extra-light bg-grey-almost-white px-8 pb-8 pt-4 shadow-popup-black md:flex-row-reverse md:justify-between md:gap-8 md:px-6 md:py-8 lg:px-14">
      <div className="flex h-60 w-full px-8 md:h-auto md:max-w-64 md:p-0 lg:max-w-80">
        {image && (
          <StrapiImage
            alt={name}
            className="h-full w-full object-contain"
            height={250}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={image?.url ?? ''}
            width={276}
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-7 md:items-start md:justify-between md:pt-3">
        <p className="heading-3">{name}</p>
        {chip?.name && (
          <p className="text-grey-darker paragraph-1">{chip?.name}</p>
        )}
        <Button
          className="w-fit px-12 py-3"
          size={'md'}
          variant={'filled'}
          onClick={onClick}
        >
          {t('choose')}
        </Button>
      </div>
    </div>
  );
}
