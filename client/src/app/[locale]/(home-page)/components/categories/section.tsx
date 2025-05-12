import { getTranslations } from 'next-intl/server';

import { getNavbarData } from '@/components/nav-bar/actions';
import { makeCategoryLink } from '@/lib/utils/link-helpers';

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

  const finalCategories = categories.map((item) => ({
    ...item,
    link: makeCategoryLink(item.link, item.name, item.displayName),
  }));
  return (
    <section className={`flex w-full flex-col gap-6 ${className}`}>
      <h2 className="heading-4 md:heading-2">{t('seeAllCategories')}</h2>
      <CategoriesCarousel categories={finalCategories} />
    </section>
  );
}
