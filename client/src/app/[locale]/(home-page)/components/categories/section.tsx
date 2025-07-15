import { getTranslations } from 'next-intl/server';

import CategoriesCarousel from './carousel';

import { getNavbarData } from '@/components/nav-bar/actions';
import { makeCategoryLink } from '@/lib/utils/link-helpers';

interface CategoriesSectionProps {
  className?: string;
}
export default async function CategoriesSection({
  className,
}: CategoriesSectionProps) {
  const t = await getTranslations('homepage');
  const items = (await getNavbarData()) || [];
  if (!items || items.length === 0) {
    return null;
  }

  const categories = items.map((item) => item.category);
  const finalCategories = categories.map((category) => ({
    ...category,
    link: makeCategoryLink(category.link, category.name, category.displayName),
  }));
  return (
    <section className={`flex w-full flex-col gap-6 ${className}`}>
      <h2 className="heading-4 md:heading-4">{t('seeAllCategories')}</h2>
      <CategoriesCarousel categories={finalCategories} />
    </section>
  );
}
