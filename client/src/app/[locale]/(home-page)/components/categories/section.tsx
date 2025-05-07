import { getTranslations } from 'next-intl/server';

import { matchesCategory } from '@/app/[locale]/(home-page)/utils/helpers';
import { PAGE_NAMES } from '@/i18n/page-names';
import { ACCESSORY_CATEGORY_NAME } from '@/lib/constants';
import { getNavbarData } from '@/lib/services';

import CategoriesCarousel from './carousel';

interface CategoriesSectionProps {
  className?: string;
}
export default async function CategoriesSection({
  className,
}: CategoriesSectionProps) {
  const t = await getTranslations('homepage');
  const categories = (await getNavbarData()) || [];
  if (!categories || categories.length === 0) {
    return null;
  }

  const finalCategories = categories.map((category) => {
    if (matchesCategory(category, ACCESSORY_CATEGORY_NAME)) {
      return {
        ...category,
        link: PAGE_NAMES.ACCESSORIES,
      };
    } else {
      return {
        ...category,
        link: `${PAGE_NAMES.CATEGORY}/${category.link}`,
      };
    }
  });
  return (
    <section className={`flex w-full flex-col gap-6 ${className}`}>
      <h2 className="heading-4 md:heading-2">{t('seeAllCategories')}</h2>
      <CategoriesCarousel categories={finalCategories} />
    </section>
  );
}
