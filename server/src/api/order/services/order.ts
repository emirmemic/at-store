/**
 * order service
 */

import { factories } from '@strapi/strapi';
import { LoginResponse } from '../../product/types';
import { getProductStockStatus } from '../utils';

export default factories.createCoreService('api::order.order', () => ({
  getProductsStatus: async (productsIds: string[]) => {
    // Check if the products are in stock from web account
    const loginCredentials = {
      username: process.env.WEB_ACCOUNT_USERNAME,
      password: process.env.WEB_ACCOUNT_PASSWORD,
    };
    try {
      const res = await fetch(`${process.env.WEB_ACCOUNT_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
      });
      const responseData = await res.json();

      if (!res.ok) {
        const { error } = responseData as { error: string };
        throw new Error('Failed to login to Web Account API, Error: ' + error);
      }

      const { token } = responseData as LoginResponse;
      const stockStatus = await Promise.all(
        productsIds.map((productId) => getProductStockStatus(token, productId))
      );

      return { data: stockStatus };
    } catch (error) {
      return {
        error:
          'Failed to fetch product stock status from Web Account API: ' + error,
      };
    }
  },
}));
