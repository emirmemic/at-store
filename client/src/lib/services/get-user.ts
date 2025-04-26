import qs from 'qs';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { ProductBase, UserInformation } from '@/lib/types';

import { getAuthToken } from './get-auth-token';

const getUserQuery = {
  populate: {
    orders: {
      populate: {
        products: {
          populate: {
            images: {
              fields: ['url', 'alternativeText'],
            },
          },
        },
      },
    },
  },
} as const;

export async function getUser(): Promise<UserInformation | null> {
  try {
    const authToken = await getAuthToken();
    if (!authToken) return null;

    const [userInfo, favorites] = await Promise.all([
      fetchAPI<UserInformation>(
        `${STRAPI_BASE_URL}/api/users/me?${qs.stringify(getUserQuery)}`,
        {
          method: 'GET',
          authToken,
          next: { tags: ['user-info'] },
        }
      ),
      fetchAPI<ProductBase[]>(`${STRAPI_BASE_URL}/api/products/favorites`, {
        method: 'GET',
        authToken,
      }),
    ]);

    if (!userInfo.data) return null;

    return {
      ...userInfo.data,
      favoriteProducts: favorites.data ?? [],
    };
  } catch {
    return null;
  }
}
