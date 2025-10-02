import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import {
  ProductResponse,
  UserInformation,
  UserInformationResponse,
} from '@/lib/types';

import { getAuthToken } from './get-auth-token';

export async function getUser(): Promise<UserInformation | null> {
  try {
    const authToken = await getAuthToken();
    if (!authToken) return null;

    const [userInfo, favorites] = await Promise.all([
      fetchAPI<UserInformationResponse>(
        `${STRAPI_BASE_URL}/api/users/me?populate[role]=*&populate[newsletter]=*&populate[addresses]=*`,
        {
          method: 'GET',
          next: { tags: ['user-info'] },
        }
      ),
      fetchAPI<ProductResponse[]>(`${STRAPI_BASE_URL}/api/products/favorites`, {
        method: 'GET',
      }),
    ]);
    if (!userInfo.data) return null;
    const { name, email, addresses: rawAddresses } = userInfo.data;
    const addresses = rawAddresses ?? [];
    const defaultAddress =
      addresses.find((address) => address.isDefault) ?? addresses[0] ?? null;
    const initials = name ? name.charAt(0).toUpperCase() + name.slice(1) : '';
    const formattedUser: UserInformation = {
      ...userInfo.data,
      accountDetails: {
        name: name,
        surname: userInfo.data.surname,
        email: email,
        address: defaultAddress?.address || userInfo.data.address,
        phoneNumber: userInfo.data.phoneNumber,
        initials: initials,
        companyIdNumber: userInfo.data.companyIdNumber,
        companyName: userInfo.data.companyName,
        role: userInfo.data.role,
        provider: userInfo.data.provider,
        newsletter: userInfo.data.newsletter ?? null,
      },
      addresses,
      favoriteProducts: favorites.data ?? [],
    };
    return formattedUser;
  } catch {
    return null;
  }
}
