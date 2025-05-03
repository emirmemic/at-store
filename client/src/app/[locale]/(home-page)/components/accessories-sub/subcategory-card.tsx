import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { CURRENCY } from '@/lib/constants';
import { SubCategoryItem } from '@/lib/types';
export default function SubCategoryCard(item: SubCategoryItem) {
  const {
    displayName,
    name,
    image,
    shortDescription,
    startingPrice,
    link,
    tag,
  } = item;
  const t = useTranslations();
  return (
    <div className="relative flex w-full flex-col rounded-2xl border bg-white p-4 shadow-outline-black transition-all hover:bg-grey-almost-white">
      <Link
        className="z-1 absolute inset-0"
        href={{
          pathname: PAGE_NAMES.SUBCATEGORY_PAGE,
          params: { slug: link },
        }}
        title={t('common.viewDetailsWithName', { productName: displayName })}
      >
        <span className="sr-only">
          {t('common.viewDetailsWithName', { productName: displayName })}
        </span>
      </Link>
      <div className="mx-auto mb-4 h-44 w-44">
        {image && image.url ? (
          <StrapiImage
            alt={image.alternativeText || name}
            className="h-full w-full object-contain"
            height={172}
            src={image.url}
            width={172}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-grey-almost-white p-4 text-grey-medium paragraph-2">
            {t('productPage.noImagesAvailable')}
          </div>
        )}
      </div>

      <p className="text-orange-dark paragraph-4">{tag || '\u00A0'}</p>
      <h3 className="mb-3 heading-4">{displayName}</h3>
      {shortDescription && (
        <p className="mb-3 text-grey-almost-black navigation">
          {shortDescription}
        </p>
      )}
      <p className="mb-12 !font-normal text-grey-almost-black footer-text">
        {`${t('common.startsFrom')}: ${startingPrice} ${CURRENCY}`}
      </p>
    </div>
  );
}
