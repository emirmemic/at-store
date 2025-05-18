'use server';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

export const updateCart = async (
  productDocumentId: string,
  quantity: number
) => {
  const path = `/api/cart/${productDocumentId}/update`;
  await fetchAPI(`${STRAPI_BASE_URL}${path}`, {
    method: 'PATCH',
    body: {
      quantity,
    },
  });
};

export const clearCart = async () => {
  const path = `/api/cart/clear`;
  await fetchAPI(`${STRAPI_BASE_URL}${path}`, {
    method: 'PUT',
  });
};
