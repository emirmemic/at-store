import { ProductResponse } from '@/lib/types';
import QuickBuySection from './quick-buy-section';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import qs from 'qs';

const query = qs.stringify(
  {
    populate: {
      items: {
        populate: {
          product: {
            populate: ['images', 'category'],
          },
        },
      },
    },
  },
  { encodeValuesOnly: true }
);

interface StrapiQuickBuyResponse {
  data: {
    id: number;
    documentId: string;
    headline: string | null;
    items: Array<{
      id: number;
      subtitle?: string | null;
      product: ProductResponse | null;
    }> | null;
  } | null;
}

interface QuickBuyData {
  headline: string | null;
  items: Array<{
    id: number;
    subtitle?: string;
    product: ProductResponse;
  }>;
}

function normaliseQuickBuyResponse(
  payload: StrapiQuickBuyResponse
): QuickBuyData | null {
  const quickBuyEntry = payload?.data;

  if (!quickBuyEntry) {
    return null;
  }

  const { headline, items } = quickBuyEntry;

  if (!items || items.length === 0) {
    return {
      headline: headline ?? null,
      items: [],
    };
  }

  const normalisedItems = items.reduce<
    Array<{
      id: number;
      subtitle?: string;
      product: ProductResponse;
    }>
  >((acc, item) => {
    if (!item.product) {
      return acc;
    }

    acc.push({
      id: item.id,
      subtitle: item.subtitle ?? undefined,
      product: item.product,
    });

    return acc;
  }, []);

  return {
    headline: headline ?? null,
    items: normalisedItems,
  };
}

async function fetchQuickBuyData() {
  const path = '/api/quick-buy';
  const url = new URL(path, STRAPI_BASE_URL);
  url.search = query;

  try {
    const res = await fetchAPI<StrapiQuickBuyResponse>(url.href, {
      method: 'GET',
      isAuth: false,
    });

    if (!res.data) {
      return null;
    }

    const normalized = normaliseQuickBuyResponse(res.data);

    return normalized;
  } catch (error) {
    console.error('Error fetching quick buy data:', error);
    return null;
  }
}

export default async function QuickBuyWrapper() {
  const data = await fetchQuickBuyData();

  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  // Filter out items without products or with products out of stock
  const validItems = data.items.filter(
    (item) => item.product && item.product.amountInStock > 0
  );

  if (validItems.length === 0) {
    return null;
  }

  return (
    <QuickBuySection
      headline={data.headline || 'Kupi brzo'}
      items={validItems}
    />
  );
}
