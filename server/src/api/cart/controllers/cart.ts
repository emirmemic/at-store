/**
 * cart controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::cart.cart',
  ({ strapi }) => ({
    async getUserCart(ctx) {
      const { user } = ctx.state;
      let cart;
      try {
        cart = await strapi.documents('api::cart.cart').findFirst({
          filters: {
            user: {
              id: user.id,
            },
          },
          populate: {
            items: {
              populate: {
                product: {
                  populate: {
                    category: {
                      fields: ['link'],
                    },
                    images: {
                      fields: ['url', 'name', 'alternativeText'],
                    },
                  },
                },
              },
            },
          },
        });

        // If user cart is not found, create a new one
        if (!cart) {
          cart = await strapi.documents('api::cart.cart').create({
            data: {
              user: user.id,
              items: [],
            },
          });
        }
      } catch (error) {
        strapi.log.error('Error fetching cart:', error);
        return ctx.badRequest('Unable to fetch cart', { error });
      }

      if (!cart) {
        return ctx.notFound('Cart not found');
      }

      return ctx.send(cart);
    },
    async updateCart(ctx) {
      const { user } = ctx.state;
      const { productId } = ctx.params;

      if (!ctx.request.body) {
        return ctx.badRequest('Request body is required');
      }

      const { quantity } = ctx.request.body;

      if (quantity === null || quantity === undefined || quantity < 0) {
        return ctx.badRequest('Quantity is required');
      }

      try {
        const cart = await strapi.documents('api::cart.cart').findFirst({
          filters: {
            user: {
              id: user.id,
            },
          },
          populate: {
            items: {
              populate: {
                product: true,
              },
            },
            user: true,
          },
        });

        // Check if the cart belongs to the user
        if (cart && cart.user.id !== user.id) {
          return ctx.unauthorized('You are not authorized to access this cart');
        }

        // If cart is not found, return an error
        if (!cart) {
          return ctx.notFound('Cart not found');
        }

        // If quantity is 0 and cart is empty, return an error
        if (quantity === 0 && (!cart.items || cart.items.length === 0)) {
          return ctx.badRequest('Product not found in cart');
        }

        const items = cart.items || [];

        // If quantity is 0, remove the item from the cart
        if (quantity === 0 && cart.items && cart.items.length > 0) {
          const item = items.find((item) => item.product.id == productId);
          if (item) {
            items.splice(items.indexOf(item), 1);
          }
        } else {
          // If the item already exists in the cart, update the quantity
          // Otherwise, add the item to the cart
          const existingItem = items.find(
            (item) => item.product.id == productId
          );

          if (existingItem) {
            existingItem.quantity = quantity;
          } else {
            console.log(productId);

            const product = await strapi
              .documents('api::product.product')
              .findFirst({
                filters: {
                  id: productId,
                },
                populate: {
                  fields: [
                    'id',
                    'displayName',
                    'originalPrice',
                    'discountedPrice',
                    'productVariantId',
                  ],
                  images: {
                    fields: ['url', 'name', 'alternativeText'],
                  },
                },
                status: 'published',
              });

            if (!product) {
              return ctx.notFound('Product not found');
            }

            items.push({
              id: productId,
              product: product,
              quantity: quantity,
            });
          }
        }

        await strapi.documents('api::cart.cart').update({
          documentId: cart.documentId,
          data: {
            items: items.map((item) => ({
              product: item.product,
              quantity: item.quantity,
            })),
            user: user.id,
          },
        });

        return ctx.send({ message: 'Cart updated successfully' });
      } catch (error) {
        strapi.log.error('Failed updating cart', error);
        return ctx.internalServerError('Unable to update cart', { error });
      }
    },
  })
);
