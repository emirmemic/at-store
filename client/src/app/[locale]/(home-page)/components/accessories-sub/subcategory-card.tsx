import { DYNAMIC_PAGES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { StrapiImage } from '@/components';
import { SubCategoryItem } from '@/lib/types';
import { useTranslations } from 'next-intl';

export default function SubCategoryCard(item: SubCategoryItem) {
  const { displayName, name, image, shortDescription, link, tag } = item;
  const t = useTranslations();
  return (
    <div className="group relative flex w-full max-w-[320px] flex-col items-center overflow-hidden rounded-3xl bg-neutral-50 px-8 text-center transition-all duration-300 hover:-translate-y-1">
      {/* Shadow layer matching card shape */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition-shadow duration-300 group-hover:shadow-[0_15px_35px_rgba(15,23,42,0.12)]" />

      <Link
        className="absolute inset-0 z-10"
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
      <div className="relative mb-6 mt-0 flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl transition-transform duration-500 group-hover:scale-[1.02] md:mb-3 md:mt-3">
        {image && image.url ? (
          <StrapiImage
            alt={image.alternativeText || name}
            className="h-32 w-auto object-contain drop-shadow-sm"
            height={220}
            src={image.url}
            width={220}
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-grey-almost-white text-grey-medium paragraph-4">
            {t('productPage.noImagesAvailable')}
          </div>
        )}
      </div>

      {tag ? (
        <span className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-orange-500">
          {tag}
        </span>
      ) : (
        <></>
      )}
      <h3 className="mb-2 min-h-[3.5rem] text-lg font-semibold leading-tight text-neutral-900 sm:text-xl">
        {displayName}
      </h3>
      {shortDescription && (
        <p className="mb-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
          {shortDescription}
        </p>
      )}
    </div>
  );
}
