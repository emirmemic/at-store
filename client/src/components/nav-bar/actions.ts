'use server';
import qs from 'qs';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { ProductResponse } from '@/lib/types';

interface Response {
  data: ProductResponse[];
}
export async function getSearchResults(searchTerm = '', pageSize = 10) {
  const path = '/api/products';

  const query = {
    filters: {},
    pagination: {
      pageSize,
    },
  };

  if (searchTerm) {
    query.filters = {
      name: {
        $containsi: searchTerm,
      },
    };
  }

  const searchQuery = qs.stringify(query, {
    encodeValuesOnly: true,
  });

  const url = new URL(path, STRAPI_BASE_URL);
  url.search = searchQuery;

  try {
    const response = await fetchAPI<Response>(url.href, {
      method: 'GET',
    });
    return response.data?.data || [];
  } catch {
    return null;
  }
}
