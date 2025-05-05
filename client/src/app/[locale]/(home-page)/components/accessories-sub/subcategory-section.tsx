import qs from 'qs';

import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { SubCategoryItem } from '@/lib/types';

import SubCategoriesCarousel from './carousel';

const query = qs.stringify(
  {
    populate: {
      image: {
        fields: STRAPI_IMAGE_FIELDS,
      },
    },
    filters: {
      category: {
        name: {
          $eq: 'Accessories',
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

interface SubCategoriesResponse {
  data: SubCategoryItem[];
}

async function fetchSubCategories() {
  const path = '/api/sub-categories';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;
  const res = await fetchAPI<SubCategoriesResponse>(url.href, {
    method: 'GET',
  });
  return res;
}

export default async function SubCategorySection() {
  const response = await fetchSubCategories();
  const items = response?.data?.data || [];
  return <SubCategoriesCarousel items={items} />;
}
