import {
  notifyAdminAboutOrderCreation,
  notifyAdminAboutOrderFailure,
  notifyCustomerAboutOrderCreation,
  notifyCustomerAboutOrderFailure,
} from '../utils';

import { ORDER_POPULATE_CONFIG } from '../constants';
import { Order } from '../types';
import { ProductStockResponse } from '../../product/types';
import crypto from 'node:crypto';
import { factories } from '@strapi/strapi';

const ORDER_TOKEN_BYTE_LENGTH = 24;

const createTokenCandidate = () =>
  crypto.randomBytes(ORDER_TOKEN_BYTE_LENGTH).toString('base64url');

async function generateUniquePublicToken(strapi: any): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const token = createTokenCandidate();
    const existing = await strapi.documents('api::order.order').findMany({
      filters: { publicToken: { $eq: token } },
      fields: ['id'],
      pagination: { page: 1, pageSize: 1 },
    });

    if (!existing || existing.length === 0) {
      return token;
    }
  }

  throw new Error('Unable to generate unique order public token');
}

async function ensureOrderHasPublicToken(strapi: any, order: any) {
  if (!order || order.publicToken) {
    return order;
  }

  if (!order.documentId) {
    return order;
  }

  const token = await generateUniquePublicToken(strapi);

  await strapi.documents('api::order.order').update({
    documentId: order.documentId,
    data: { publicToken: token },
  });

  return {
    ...order,
    publicToken: token,
  };
}

async function findOrderByPublicToken(strapi: any, token: string) {
  const orders = await strapi.documents('api::order.order').findMany({
    filters: { publicToken: { $eq: token } },
    populate: ORDER_POPULATE_CONFIG as any,
    pagination: { page: 1, pageSize: 1 },
  });

  if (!orders || orders.length === 0) {
    return null;
  }

  return ensureOrderHasPublicToken(strapi, orders[0]);
}

async function resolveRequestUser(strapi: any, ctx: any) {
  if (ctx?.state?.user?.email) {
    return ctx.state.user;
  }

  const headerAuth =
    ctx?.request?.headers?.authorization || ctx?.request?.header?.authorization;

  let token: string | null = null;

  if (
    typeof headerAuth === 'string' &&
    headerAuth.toLowerCase().startsWith('bearer ')
  ) {
    token = headerAuth.slice(7).trim();
  }

  if (!token && typeof ctx?.cookies?.get === 'function') {
    const cookieValue = ctx.cookies.get('jwt');
    if (typeof cookieValue === 'string') {
      token = cookieValue;
    } else if (cookieValue && typeof cookieValue.value === 'string') {
      token = cookieValue.value;
    }
  }

  if (!token) {
    return null;
  }

  try {
    const jwtService =
      strapi.service?.('plugin::users-permissions.jwt') ||
      strapi.plugin('users-permissions').service('jwt');

    const userService =
      strapi.service?.('plugin::users-permissions.user') ||
      strapi.plugin('users-permissions').service('user');

    const decoded = await jwtService.verify(token);

    if (!decoded?.id) {
      return null;
    }

    const user =
      typeof userService.fetchAuthenticatedUser === 'function'
        ? await userService.fetchAuthenticatedUser(decoded.id)
        : await strapi.query('plugin::users-permissions.user').findOne({
            where: { id: decoded.id },
            select: ['id', 'email'],
          });

    if (!user?.email) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
    };
  } catch (error) {
    strapi.log.warn(
      'Failed to resolve authenticated user for public order lookup',
      error
    );
    return null;
  }
}

const maskString = (
  value: string | null | undefined,
  visibleStart = 2,
  visibleEnd = 2
) => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return value;
  }

  const totalVisible = Math.max(0, visibleStart) + Math.max(0, visibleEnd);
  if (trimmed.length <= totalVisible) {
    const firstChar = trimmed.charAt(0);
    return `${firstChar}${'*'.repeat(Math.max(0, trimmed.length - 1))}`;
  }

  const start = trimmed.slice(0, visibleStart);
  const end = trimmed.slice(-visibleEnd);
  const maskedLength = Math.max(3, trimmed.length - totalVisible);
  const masked = '*'.repeat(maskedLength);
  return `${start}${masked}${end}`;
};

const sanitizeOrderForPublic = (order: any) => {
  if (!order) {
    return order;
  }

  const address = order.address
    ? {
        ...order.address,
        address: maskString(order.address.address, 5, 3),
        phoneNumber: maskString(order.address.phoneNumber, 3, 2),
        postalCode: maskString(order.address.postalCode, 2, 1),
        city: maskString(order.address.city, 2, 1),
        note: order.address.note ? '***' : order.address.note,
      }
    : order.address;

  return {
    ...order,
    address,
  };
};

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
      const publicToken = await generateUniquePublicToken(strapi);
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
        publicToken,
      };
      try {
        newOrder = await strapi.documents('api::order.order').create({
          data: orderData,
        });
        const populatedOrder = await strapi
          .documents('api::order.order')
          .findOne({
            documentId: newOrder.documentId,
            populate: ORDER_POPULATE_CONFIG as any,
          });
        newOrder = await ensureOrderHasPublicToken(
          strapi,
          populatedOrder || newOrder
        );
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
     * Public order lookup endpoint used by email confirmation links.
     * Ensures only the order owner sees the full payload; others receive masked data.
     */
    async findByOrderId(ctx) {
      const { orderId } = ctx.params;

      if (!orderId) {
        return ctx.badRequest('Order ID is required');
      }

      try {
        const normalizedId = String(orderId).trim();

        if (!normalizedId) {
          return ctx.badRequest('Order ID is required');
        }

        let order = await findOrderByPublicToken(strapi, normalizedId);

        if (!order) {
          order = await strapi.documents('api::order.order').findOne({
            documentId: normalizedId,
            populate: ORDER_POPULATE_CONFIG as any,
          });
        }

        if (!order) {
          const orders = await strapi.documents('api::order.order').findMany({
            filters: {
              orderNumber: { $eq: normalizedId },
            },
            populate: ORDER_POPULATE_CONFIG as any,
            pagination: { page: 1, pageSize: 1 },
          });

          if (orders && orders.length > 0) {
            [order] = orders;
          }
        }

        if (!order) {
          return ctx.notFound('Order not found');
        }

        const orderWithToken = await ensureOrderHasPublicToken(strapi, order);
        const authUser = await resolveRequestUser(strapi, ctx);

        const orderEmail =
          typeof orderWithToken.address?.email === 'string'
            ? orderWithToken.address.email.toLowerCase()
            : null;
        const authEmail =
          typeof authUser?.email === 'string'
            ? authUser.email.toLowerCase()
            : null;

        const isSameUser = Boolean(
          orderEmail && authEmail && orderEmail === authEmail
        );

        const responseOrder = isSameUser
          ? orderWithToken
          : sanitizeOrderForPublic(orderWithToken);

        return ctx.send({
          status: 'success',
          message: 'Order retrieved successfully',
          data: responseOrder,
        });
      } catch (error) {
        strapi.log.error('Failed to retrieve order:', error);
        return ctx.badRequest('Failed to retrieve order', { error });
      }
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
