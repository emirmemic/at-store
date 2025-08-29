import {
  notifyAdminAboutOrderCreation,
  notifyAdminAboutOrderFailure,
  notifyCustomerAboutOrderCreation,
  notifyCustomerAboutOrderFailure,
} from '../utils';

import { Order } from '../types';
import { ProductStockResponse } from '../../product/types';
import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::order.order',
  ({ strapi }) => ({
    async create(ctx) {
      const order = ctx.request.body.data as Order;

      if (!order) {
        return ctx.badRequest('Order data is required');
      }
      const { user } = ctx.state;

      // All products are in stock, proceed with the order creation
      let newOrder;
      const orderData = {
        user: user ? user.id : null,
        orderNumber: order.orderNumber,
        address: order.address,
        deliveryMethod: order.deliveryMethod,
        paymentMethod: order.paymentMethod,
        selectedStore: order.selectedStore,
        deliveryPrice: order.deliveryPrice,
        items: order.items.map((item) => ({
          product: item.productDocumentId,
          quantity: item.quantity,
        })),
        totalPrice: order.totalPrice,
        isGift: order.isGift,
        products: order.items.map((product) => product.productDocumentId),
      };
      try {
        newOrder = await strapi.documents('api::order.order').create({
          data: orderData,
        });
        const populatedOrder = await strapi
          .documents('api::order.order')
          .findOne({
            documentId: newOrder.documentId,
            populate: {
              items: {
                populate: {
                  product: {
                    populate: {
                      images: {
                        fields: ['url', 'name', 'alternativeText'],
                      },
                    },
                  },
                },
              },
            },
          });
        newOrder = populatedOrder || newOrder;
      } catch (error) {
        return ctx.badRequest('Failed to create order', error);
      }

      // Update the product stock with the new quantity
      // If the new quantity is 0, we should put the product in draft state
      try {
        for (const item of order.items) {
          const product = await strapi
            .documents('api::product.product')
            .findOne({
              documentId: item.productDocumentId,
            });
          if (product) {
            const newQuantity = product.amountInStock - item.quantity;
            await strapi.documents('api::product.product').update({
              documentId: product.documentId,
              data: { amountInStock: newQuantity },
              status: 'published',
            });
          }
        }
      } catch (error) {
        // If the stock update fails, we should not create the order
        // and we should return an error
        try {
          const orderExists = await strapi
            .documents('api::order.order')
            .findOne({ documentId: newOrder.documentId });

          if (orderExists) {
            await strapi.documents('api::order.order').delete({
              documentId: newOrder.documentId,
            });
          }
        } catch (err) {
          strapi.log.error('Failed to delete order safely:', err);
        }
        // Notify admin about the failed order creation
        notifyAdminAboutOrderFailure(newOrder);
        // Notify customer about the failed order creation
        if (newOrder.address?.email) {
          notifyCustomerAboutOrderFailure(newOrder);
        }
        return ctx.badRequest('Failed to update product stock', error);
      }

      strapi.log.info('New order created:', newOrder);
      notifyAdminAboutOrderCreation(newOrder);
      notifyCustomerAboutOrderCreation(newOrder);
      return ctx.created({
        message: 'Order created successfully',
        order: newOrder,
      });
    },
    /**
     * Checks and returns the stock status of products by combining information from web account and local database.
     *
     * This method validates product variant IDs, fetches their status from an external web account service,
     * then compares with local database records to determine the actual available stock amounts.
     * The final stock amount for each product is the minimum value between the web account and local database.
     *
     * @param {string[]} ctx.request.body.productsIds - Array of product variant IDs to check
     *
     * @returns {Promise<object>} Returns a response with products status information
     * @returns {object} ctx.ok - Success response with array of product statuses
     * @returns {object} ctx.badRequest - Error response if validation fails or errors occur
     *
     * @throws Will throw an error if fetching product status fails
     */
    async checkProductStatus(ctx) {
      const { productsIds } = ctx.request.body;

      if (!productsIds || productsIds.length === 0) {
        return ctx.badRequest('Products ids are required');
      }

      try {
        const webAccountProductsResponse: WebAccountProductsResponse =
          await strapi
            .service('api::order.order')
            .getProductsStatus(productsIds);

        if (webAccountProductsResponse.error) {
          strapi.log.error(
            'Web account product status error:',
            webAccountProductsResponse.error
          );
          return ctx.badRequest(webAccountProductsResponse.error);
        }

        const products = await strapi
          .documents('api::product.product')
          .findMany({
            filters: {
              productVariantId: {
                $in: productsIds,
              },
            },
            status: 'published',
          });

        if (!products || products.length === 0) {
          return ctx.badRequest('No products found');
        }

        const productsStatusFromStrapi = products.map((product) => ({
          productVariantId: product.productVariantId,
          amountInStock: product.amountInStock,
        }));

        const productsStatus = webAccountProductsResponse.data.map(
          (product) => {
            const matchingProductFromStrapi = productsStatusFromStrapi.find(
              (p) => p.productVariantId === product.product_variant_id
            );
            return {
              productVariantId: product.product_variant_id,
              amountInStock: matchingProductFromStrapi
                ? Math.min(
                    product.amount_in_stock,
                    matchingProductFromStrapi.amountInStock
                  )
                : product.amount_in_stock,
            };
          }
        );

        return ctx.send({ productsStatus });
      } catch (error) {
        strapi.log.error('Failed to get products status:', error);
        return ctx.badRequest('Failed to get products status', error);
      }
    },
  })
);

type WebAccountProductsResponse =
  | {
      data: ProductStockResponse[];
      error?: undefined;
    }
  | {
      error: string;
      data?: undefined;
    };
