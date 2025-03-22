import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { UserInformation } from '@/lib/types/auth';

import { getAuthToken } from './get-auth-token';

export async function getUser(): Promise<UserInformation | null> {
  const authToken = await getAuthToken();
  if (authToken) {
    const path = '/api/users/me';
    const res = await fetchAPI<UserInformation>(`${STRAPI_BASE_URL}${path}`, {
      method: 'GET',
      authToken,
      next: { tags: ['user-info'] },
    });
    return res.data || null;
  } else {
    return null;
  }
}
