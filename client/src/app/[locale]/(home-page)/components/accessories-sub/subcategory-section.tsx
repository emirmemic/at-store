import qs from 'qs';

import { extendItemsToMinLength } from '@/app/[locale]/(home-page)/utils/helpers';
import {
  ACCESSORY_CATEGORY_NAME,
  STRAPI_BASE_URL,
  STRAPI_IMAGE_FIELDS,
} from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { SubCategoryItem } from '@/lib/types';

import SubCategoriesCarousel from './carousel';

const query = qs.stringify(
  {
    populate: {
      image: {
        fields: STRAPI_IMAGE_FIELDS,
      },
      products: {
        filters: {
          publishedAt: { $notNull: true },
          amountInStock: { $gt: 0 },
        },
      },
    },
    filters: {
      category: {
        name: {
          $eqi: ACCESSORY_CATEGORY_NAME,
        },
      },
      products: {
        publishedAt: {
          $notNull: true,
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
    isAuth: false,
  });
  return res;
}

export default async function SubCategorySection() {
  const response = await fetchSubCategories();
  const items = response?.data?.data || [];
  const filteredItems = items.filter(
    (item) => item.products && item.products.length > 0
  );
  if (filteredItems.length === 0) {
    return null;
  }
  const extendedItems = extendItemsToMinLength(filteredItems);
  return <SubCategoriesCarousel items={extendedItems} />;
}
