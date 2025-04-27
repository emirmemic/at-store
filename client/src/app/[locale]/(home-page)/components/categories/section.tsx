import { getTranslations } from 'next-intl/server';
import qs from 'qs';

import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { CategoryItem } from '@/lib/types';

import CategoriesCarousel from './carousel';

const query = qs.stringify(
  {
    populate: {
      image: {
        fields: STRAPI_IMAGE_FIELDS,
      },
    },
  },
  { encodeValuesOnly: true }
);

interface CategoriesResponse {
  data: CategoryItem[];
}
interface CategoriesSectionProps {
  className?: string;
}
async function fetchCategories() {
  const path = '/api/categories';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;
  const res = await fetchAPI<CategoriesResponse>(url.href, {
    method: 'GET',
  });
  return res;
}

export default async function CategoriesSection({
  className,
}: CategoriesSectionProps) {
  const t = await getTranslations('homepage');
  const response = await fetchCategories();
  const categories = response?.data?.data || [];
  return (
    <section className={`flex w-full flex-col gap-4 ${className}`}>
      <h2 className="mb-6 heading-2">{t('seeAllCategories')}</h2>
      <CategoriesCarousel categories={categories} />
    </section>
  );
}
