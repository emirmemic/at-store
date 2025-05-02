import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components';
import { CURRENCY } from '@/lib/constants';
import { CategoryItem } from '@/lib/types';

interface CategoryProps {
  className?: string;
  category: CategoryItem;
}
export default function Category({ category, className }: CategoryProps) {
  const t = useTranslations('common');
  const { name, link, image, startingPrice, displayName } = category;
  return (
    <Link
      className={`flex h-full flex-col items-center gap-3 rounded-2xl p-2 transition-all hover:bg-grey-extra-light/50 ${className}`}
      href={link}
    >
      <span className="h-24 w-40">
        {image && (
          <StrapiImage
            alt={image.alternativeText || name}
            className="h-full w-full object-contain"
            height={96}
            sizes="160px"
            src={image.url}
            width={160}
          />
        )}
      </span>
      <span className="flex grow flex-col items-center justify-center gap-1">
        <span className="sr-only">{t('viewMore')}</span>
        <span className="text-center heading-5 md:heading-4">
          {displayName || name}
        </span>
        <span className="text-grey-darkest paragraph-4 md:paragraph-2">{`${t('startsFrom')}: ${startingPrice} ${CURRENCY}`}</span>
      </span>
    </Link>
  );
}
