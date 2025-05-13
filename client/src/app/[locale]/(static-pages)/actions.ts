'use server';

import qs from 'qs';

import { STRAPI_BASE_URL, STRAPI_IMAGE_FIELDS } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { BestSellerItem } from '@/lib/types';

const query = qs.stringify(
  {
    populate: {
      items: {
        populate: {
          product: {
            populate: {
              category: {
                fields: ['link'],
              },
              images: {
                fields: STRAPI_IMAGE_FIELDS,
              },
            },
            fields: [
              'name',
              'originalPrice',
              'discountedPrice',
              'productLink',
              'productTypeId',
            ],
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

interface MostSoldResponse {
  data: {
    items: BestSellerItem[];
  };
}

export const fetchMostSold = async () => {
  const path = `/api/most-sold`;
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;
  const res = await fetchAPI<MostSoldResponse>(url.href, {
    method: 'GET',
    isAuth: false,
  });

  return res;
};
