import qs from 'qs';

import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { NavbarResponseData } from '@/lib/types';

const filterQuery = {
  products: {
    publishedAt: {
      $notNull: true,
    },
  },
};
// Query to fetch categories and their subcategories that have published products
const categoryQuery = qs.stringify(
  {
    populate: {
      categories: {
        filters: {
          ...filterQuery,
        },
        populate: {
          image: {
            fields: STRAPI_IMAGE_FIELDS,
          },
          subCategories: {
            populate: {
              navbarIcon: {
                fields: STRAPI_IMAGE_FIELDS,
              },
            },
            filters: {
              ...filterQuery,
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

export async function getNavbarData() {
  const path = '/api/navbar';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = categoryQuery;

  try {
    const response = await fetchAPI<NavbarResponseData>(url.href, {
      method: 'GET',
      next: { revalidate: 60 },
    });
    const finalData = response.data?.data?.categories || [];
    return finalData;
  } catch {
    return null;
  }
}
