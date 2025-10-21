'use server';

import { STRAPI_BASE_URL, StoreCode } from '@/lib/constants';
import { StrapiError, fetchAPI } from '@/lib/fetch-api';

import { DeliveryForm } from '@/lib/schemas/checkout';
import { DeliveryMethod } from '../page';
import { OrderDetail } from '@/lib/types/order';
import { ProductStockResponse } from '@/lib/types';

export interface OrderPayload {
  items: {
    productVariantId: string;
    productDocumentId: string;
    quantity: number;
    name: string;
  }[];
  address: DeliveryForm | null | undefined;
  deliveryMethod: DeliveryMethod;
  selectedStore: StoreCode | null;
  isGift: boolean;
  totalPrice: number;
  orderNumber: string | undefined;
  deliveryPrice: number;
  paymentMethod: 'card' | 'cash' | 'virman';
}

export async function createOrder(payload: OrderPayload) {
  const res = await fetchAPI<{ message: string; order: OrderDetail }>(
    `${STRAPI_BASE_URL}/api/orders`,
    {
      method: 'POST',
      body: {
        data: payload,
      },
    }
  );

  if (res.error || !res.data?.order) {
    throw new Error(res.error?.message ?? 'Error creating order');
  }

  return res.data.order;
}

export async function getProductsStatus(
  productsIds: string[]
): Promise<{ error?: StrapiError | string; data?: ProductStockResponse[] }> {
  try {
    const res = await fetchAPI<{
      productsStatus: ProductStockResponse[];
    }>(`${STRAPI_BASE_URL}/api/order/products/stock-status`, {
      method: 'POST',
      isAuth: false,
      body: {
        productsIds,
      },
    });

    if (res.error) {
      return { error: res.error };
    }
    const productsStatus = res.data?.productsStatus || [];
    if (!res.data || productsStatus.length === 0) {
      return { error: 'No products found' };
    }

    if (productsStatus.some((item) => item.amountInStock === 0)) {
      return { error: 'Some products are out of stock' };
    }

    return { data: productsStatus };
  } catch (error) {
    return { error: `Error fetching products status: ${error}` };
  }
}
