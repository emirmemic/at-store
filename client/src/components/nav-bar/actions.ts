'use server';
import qs from 'qs';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { ProductResponse } from '@/lib/types';

import { NavbarResponseData } from './types';

interface Response {
  data: ProductResponse[];
}
export async function getSearchResults(searchTerm = '') {
  const path = '/api/products';

  const query = {
    status: 'published',
    filters: {},
    sort: ['originalPrice:desc'],
    populate: {
      category: true,
      subCategory: true,
    },
  };

  if (searchTerm) {
    query.filters = {
      $or: [
        { name: { $containsi: searchTerm } },
        { description: { $containsi: searchTerm } },
        { brand: { name: { $containsi: searchTerm } } },
        { model: { name: { $containsi: searchTerm } } },
        { category: { name: { $containsi: searchTerm } } },
        { subCategory: { name: { $containsi: searchTerm } } },
      ],
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

export async function getNavbarData() {
  const path = '/api/navbar/published';
  const url = new URL(path, STRAPI_BASE_URL);

  try {
    const response = await fetchAPI<NavbarResponseData>(url.href, {
      method: 'GET',
      next: { revalidate: 60 },
      isAuth: false,
    });
    const finalData = response.data?.items || [];
    return finalData;
  } catch {
    return null;
  }
}
