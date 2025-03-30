import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { UserInformation } from '@/lib/types';

import { getAuthToken } from './get-auth-token';

export async function getUser(): Promise<UserInformation | null> {
  const authToken = await getAuthToken();
  if (!authToken) return null;

  const path = '/api/users/me?populate=orders.products.image';
  const res = await fetchAPI<UserInformation>(`${STRAPI_BASE_URL}${path}`, {
    method: 'GET',
    authToken,
    next: { tags: ['user-info'] },
  });

  return res.data ?? null;
}
