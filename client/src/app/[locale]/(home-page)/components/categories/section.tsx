import { getTranslations } from 'next-intl/server';

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
  return (
    <section className={`flex w-full flex-col gap-6 ${className}`}>
      <h2 className="heading-4 md:heading-2">{t('seeAllCategories')}</h2>
      <CategoriesCarousel categories={categories} />
    </section>
  );
}
