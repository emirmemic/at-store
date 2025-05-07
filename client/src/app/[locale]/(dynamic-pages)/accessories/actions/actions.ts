'use server';

import qs from 'qs';

import {
  ACCESSORY_CATEGORY_NAME,
  STRAPI_BASE_URL,
  STRAPI_IMAGE_FIELDS,
} from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';

import { AccessoriesResponse } from '../types';

import { buildFilters } from './build-filters';

interface FetchProductsOptions {
  sortOption?: string;
  page?: number;
  pageSize?: number;
  colorFilters?: string[];
  brandFilters?: string[];
  materialFilters?: string[];
}

export async function fetchProducts({
  sortOption = 'latest',
  page = 1,
  pageSize = 12,
  colorFilters = [],
  brandFilters = [],
  materialFilters = [],
}: FetchProductsOptions) {
  let sortParam;

  switch (sortOption) {
    case 'price-asc':
      sortParam = ['originalPrice:asc'];
      break;
    case 'price-desc':
      sortParam = ['originalPrice:desc'];
      break;
    case 'latest':
      sortParam = ['createdAt:desc'];
      break;
    case 'name-az':
      sortParam = ['name:asc'];
      break;
    case 'name-za':
      sortParam = ['name:desc'];
      break;
    default:
      sortParam = ['createdAt:desc'];
      break;
  }

  const query = qs.stringify(
    {
      filters: buildFilters({
        categoryName: ACCESSORY_CATEGORY_NAME,
        filters: {
          color: colorFilters,
          brand: brandFilters,
          material: materialFilters,
        },
      }),
      populate: {
        brand: true,
        category: true,
        model: true,
        stores: true,
        color: true,
        memory: true,
        images: {
          fields: STRAPI_IMAGE_FIELDS,
        },
      },
      pagination: {
        page,
        pageSize,
      },
      sort: sortParam,
    },
    {
      encodeValuesOnly: true,
    }
  );

  const path = '/api/products';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;

  const res = await fetchAPI<AccessoriesResponse>(url.href, {
    method: 'GET',
  });
  return res;
}
