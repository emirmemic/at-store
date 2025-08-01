import { CURRENCY } from '@/lib/constants';
import { DYNAMIC_PAGES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { StrapiImage } from '@/components';
import { SubCategoryItem } from '@/lib/types';
import { useTranslations } from 'next-intl';

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
    <div className="relative flex w-full max-w-[200px] flex-col items-center rounded-xl border bg-white p-2 text-center shadow-outline-black transition-all hover:shadow-outline-black-hover sm:rounded-2xl sm:p-3">
      <Link
        className="z-1 absolute inset-0"
        href={{
          pathname: DYNAMIC_PAGES.ACCESSORIES_SUBCATEGORY,
          params: { subcategory: link },
        }}
        title={t('common.viewDetailsWithName', { productName: displayName })}
      >
        <span className="sr-only">
          {t('common.viewDetailsWithName', { productName: displayName })}
        </span>
      </Link>
      <div className="mx-auto mb-4 mt-4 h-20 w-20 sm:h-20 sm:w-20">
        {image && image.url ? (
          <StrapiImage
            alt={image.alternativeText || name}
            className="h-full w-full object-contain"
            height={152}
            src={image.url}
            width={172}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-grey-almost-white p-4 text-grey-medium paragraph-4">
            {t('productPage.noImagesAvailable')}
          </div>
        )}
      </div>

      <p className="text-orange-dark paragraph-4">{tag || '\u00A0'}</p>
      <h3 className="mb-2 text-lg sm:heading-5">{displayName}</h3>
      {shortDescription && (
        <p className="mb-3 text-grey-almost-black navigation">
          {shortDescription}
        </p>
      )}
      <p className="mb-4 text-sm text-blue-500">
        {`${t('common.startsFrom')} ${startingPrice} ${CURRENCY}`}
      </p>
    </div>
  );
}
