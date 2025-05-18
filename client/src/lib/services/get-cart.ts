'use server';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { CartResponse, ShoppingCartItem } from '@/lib/types';

import { getAuthToken } from './get-auth-token';

export async function getCart(): Promise<ShoppingCartItem[]> {
  try {
    const authToken = await getAuthToken();
    if (!authToken) return [];

    const res = await fetchAPI<CartResponse>(`${STRAPI_BASE_URL}/api/cart`, {
      method: 'GET',
    });

    if (!res.data) return [];

    return res.data.items || [];
  } catch {
    return [];
  }
}
