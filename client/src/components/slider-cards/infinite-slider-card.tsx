import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { AccessorySliderItem } from '@/lib/types';
export default function InfiniteSliderCard(item: AccessorySliderItem) {
  const { title, description, priceText, image, tagline, actionLink } = item;
  const t = useTranslations('common');
  return (
    <div className="relative flex w-full flex-col rounded-2xl border bg-white p-4 shadow-outline-black transition-all hover:bg-grey-almost-white">
      <Link
        className="z-1 absolute inset-0"
        href={actionLink}
        title={t('viewDetailsWithName', { productName: title })}
      >
        <span className="sr-only">
          {t('viewDetailsWithName', { productName: title })}
        </span>
      </Link>
      <div className="mx-auto mb-4 h-44 w-44">
        <Image
          alt={image.alternativeText || title}
          className="h-full w-full object-contain"
          height={172}
          src={image.url}
          width={172}
        />
      </div>

      <p className="text-orange-dark paragraph-4">{tagline || '\u00A0'}</p>
      <h3 className="mb-3 heading-4">{title}</h3>
      <p className="mb-3 text-grey-almost-black navigation">{description}</p>
      <p className="mb-12 !font-normal text-grey-almost-black footer-text">
        {priceText}
      </p>
    </div>
  );
}
