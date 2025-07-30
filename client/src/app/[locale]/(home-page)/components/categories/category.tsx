import { CURRENCY } from '@/lib/constants';
import { CategoryItem } from '@/lib/types';
import Link from 'next/link';
import { StrapiImage } from '@/components';
import { useTranslations } from 'next-intl';

interface CategoryProps {
  className?: string;
  category: CategoryItem;
}
export default function Category({ category, className }: CategoryProps) {
  const t = useTranslations('common');
  const { name, link, image, startingPrice, displayName } = category;
  return (
    <Link
      className={`flex flex-col items-center gap-2 rounded-2xl p-2 transition-all hover:bg-grey-extra-light/50 ${className}`}
      href={link}
    >
      <span className="h-20 w-24 md:w-32">
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
      <span className="sr-only">{t('viewMore')}</span>
      <span className="text-center text-sm font-medium md:text-base">
        {displayName || name}
      </span>
      <span className="text-xs text-grey-darkest md:text-sm">{`${t('startsFrom')} ${startingPrice} ${CURRENCY}`}</span>
    </Link>
  );
}
