import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components/strapi/components/strapi-image';
import { PAGE_NAMES } from '@/i18n/page-names';
import { ModelResponse } from '@/lib/types';

interface AccessoriesBarProps {
  title?: string;
  subtitle?: string;
  accessoryTypeLink: string;
  items?: ModelResponse[];
}

export default function AccessoriesBar({
  title,
  subtitle,
  accessoryTypeLink,
  items = [],
}: AccessoriesBarProps) {
  const t = useTranslations('common');
  const finalTitle = title ?? t('macAccessories');
  const finalSubtitle = subtitle ?? t('seeAllMacAccessories');
  const makePath = (id: string) => {
    return `${PAGE_NAMES.ACCESSORIES}/${accessoryTypeLink}?model=${id}`;
  };
  return (
    <div className="rounded-2xl bg-blue-steel px-14 py-10 text-white shadow-slider-drop-shadow md:px-24 md:py-8 lg:px-32 lg:py-12">
      <div className="mb-8 text-center">
        <p className="mb-4 heading-4 md:bullet-heading-1 lg:heading-3">
          {finalTitle}
        </p>
        <p className="bullet-2">{finalSubtitle}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6 xl:gap-x-24">
        {items.map(({ id, icon, displayName }) => {
          return (
            <Link
              key={id}
              className="group flex flex-col items-center gap-8 rounded-lg border border-transparent p-2 px-6 transition-all duration-300 hover:border-grey-medium hover:text-grey-medium md:gap-3"
              href={makePath(String(id))}
            >
              <div className="size-24">
                {icon ? (
                  <StrapiImage
                    alt={icon?.alternativeText ?? null}
                    className="h-full w-full object-contain"
                    height={166}
                    sizes="(100vw) 100vw"
                    src={icon?.url ?? ''}
                    width={250}
                  />
                ) : (
                  <div className="h-full w-full" />
                )}
              </div>
              <p className="flex grow items-center text-center bullet-1 md:paragraph-1">
                {displayName}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
