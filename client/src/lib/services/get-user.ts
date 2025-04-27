import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import {
  ProductBase,
  UserInformation,
  UserInformationResponse,
} from '@/lib/types';

import { getAuthToken } from './get-auth-token';

export async function getUser(): Promise<UserInformation | null> {
  try {
    const authToken = await getAuthToken();
    if (!authToken) return null;

    const [userInfo, favorites] = await Promise.all([
      fetchAPI<UserInformationResponse>(`${STRAPI_BASE_URL}/api/users/me`, {
        method: 'GET',
        next: { tags: ['user-info'] },
      }),
      fetchAPI<ProductBase[]>(`${STRAPI_BASE_URL}/api/products/favorites`, {
        method: 'GET',
      }),
    ]);

    if (!userInfo.data) return null;
    const { name, email } = userInfo.data;
    const initials =
      name?.charAt(0)?.toUpperCase() ?? email.charAt(0).toUpperCase();
    const formattedUser: UserInformation = {
      ...userInfo.data,
      accountDetails: {
        name: name,
        surname: userInfo.data.surname,
        email: email,
        address: userInfo.data.address,
        phoneNumber: userInfo.data.phoneNumber,
        dateOfBirth: userInfo.data.dateOfBirth,
        initials: initials,
      },
      favoriteProducts: favorites.data ?? [],
    };
    return formattedUser;
  } catch {
    return null;
  }
}
