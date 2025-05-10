'use server';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

export const updateCart = async (productId: number, quantity: number) => {
  const path = `/api/cart/${productId}/update`;
  await fetchAPI(`${STRAPI_BASE_URL}${path}`, {
    method: 'PATCH',
    body: {
      quantity,
    },
  });
};
