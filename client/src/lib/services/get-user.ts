import qs from 'qs';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { UserInformation } from '@/lib/types';

import { getAuthToken } from './get-auth-token';

const getUserQuery = qs.stringify({
  populate: {
    orders: {
      populate: {
        products: {
          populate: {
            image: {
              fields: ['url', 'alternativeText'],
            },
          },
        },
      },
    },
    favorite_products: {
      populate: {
        image: {
          fields: ['url', 'alternativeText'],
        },
      },
    },
  },
});

export async function getUser(): Promise<UserInformation | null> {
  const authToken = await getAuthToken();
  if (!authToken) return null;
  const path = '/api/users/me';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = getUserQuery;
  const res = await fetchAPI<UserInformation>(url.href, {
    method: 'GET',
    authToken,
    next: { tags: ['user-info'] },
  });

  return res.data ?? null;
}
