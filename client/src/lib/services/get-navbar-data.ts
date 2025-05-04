import qs from 'qs';

import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { NavbarResponseData } from '@/lib/types';

const categoryQuery = qs.stringify(
  {
    populate: {
      categories: {
        populate: {
          subCategories: {
            populate: {
              navbarIcon: {
                fields: STRAPI_IMAGE_FIELDS,
              },
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
    });
    const finalData = response.data?.data?.categories || [];
    return finalData;
  } catch {
    return null;
  }
}
