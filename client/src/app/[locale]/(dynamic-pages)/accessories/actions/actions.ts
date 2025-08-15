'use server';

import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';

import { AccessoriesResponse } from '../types';
import { ModelResponse } from '@/lib/types';
import { buildFilters } from './build-filters';
import { fetchAPI } from '@/lib/fetch-api';
import qs from 'qs';

interface FetchProductsOptions {
  sortOption?: string;
  page?: number;
  pageSize?: number;
  colorFilters?: string[];
  brandFilters?: string[];
  materialFilters?: string[];
  categoryLink?: string;
  subCategoryLink?: string;
  modelId?: string;
}

export async function fetchProducts({
  sortOption = 'latest',
  page = 1,
  pageSize = 12,
  colorFilters = [],
  brandFilters = [],
  materialFilters = [],
  categoryLink,
  subCategoryLink,
  modelId,
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
        categoryLink,
        subCategoryLink,
        modelId,
        filters: {
          color: colorFilters,
          brand: brandFilters,
          material: materialFilters,
        },
      }),
      populate: {
        brand: true,
        category: true,
        subCategory: true,
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
    isAuth: false,
  });
  return res;
}

export async function fetchModels({
  categoryLink,
  subCategoryLink,
}: {
  categoryLink: string;
  subCategoryLink?: string;
}) {
  const path = subCategoryLink
    ? `/api/models/by-sub-category/${categoryLink}/${subCategoryLink}`
    : `/api/models/by-category/${categoryLink}`;

  const url = new URL(path, STRAPI_BASE_URL);
  const res = await fetchAPI<ModelResponse[]>(url.href, {
    method: 'GET',
    isAuth: false,
  });
  return res.data || [];
}
