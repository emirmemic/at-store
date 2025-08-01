import { factories } from '@strapi/strapi';
export default factories.createCoreController(
  'api::product.product',
  ({ strapi }) => ({
    async find(ctx) {
      // Ensure filters exist
      ctx.query = ctx.query || {};
      ctx.query.filters = ctx.query.filters || {};

      // Inject the amountInStock > 0 filter
      (ctx.query.filters as Record<string, any>).amountInStock = {
        ...((ctx.query.filters as Record<string, any>).amountInStock || {}),
        $gt: 0,
      };

      // Inject the originalPrice > 0 filter
      (ctx.query.filters as Record<string, any>).originalPrice = {
        ...((ctx.query.filters as Record<string, any>).originalPrice || {}),
        $gt: 0,
      };
      // Call the default core controller logic
      const { data, meta } = await super.find(ctx);
      return { data, meta };
    },
    async findOne(ctx) {
      // Ensure filters exist
      ctx.query = ctx.query || {};
      ctx.query.filters = ctx.query.filters || {};

      // Inject the amountInStock > 0 filter
      (ctx.query.filters as Record<string, any>).amountInStock = {
        ...((ctx.query.filters as Record<string, any>).amountInStock || {}),
        $gt: 0,
      };

      // Inject the originalPrice > 0 filter
      (ctx.query.filters as Record<string, any>).originalPrice = {
        ...((ctx.query.filters as Record<string, any>).originalPrice || {}),
        $gt: 0,
      };
      // Call the default core controller logic
      const { data, meta } = await super.findOne(ctx);
      return { data, meta };
    },
    async toggleFavorite(ctx) {
      const { user } = ctx.state;
      const { productId } = ctx.params;

      const product = await strapi.documents('api::product.product').findFirst({
        filters: {
          documentId: productId,
        },
        status: 'published',
        populate: ['favoritedBy'],
      });

      if (!product) {
        return ctx.notFound('Product not found');
      }

      const isFavorited = product.favoritedBy.some((u) => u.id === user.id);

      try {
        await strapi.documents('api::product.product').update({
          documentId: productId,
          status: 'published',
          data: {
            favoritedBy: {
              [isFavorited ? 'disconnect' : 'connect']: [
                { id: user.id, status: 'published' },
              ],
            },
          },
          populate: ['favoritedBy'],
        });

        return { isFavorited: !isFavorited };
      } catch (error) {
        return ctx.badRequest('Failed to toggle favorite');
      }
    },

    async getUserFavorites(ctx) {
      const { user } = ctx.state;
      if (!user) {
        return ctx.unauthorized(
          'You are not authorized to access this resource'
        );
      }
      try {
        const favorites = await strapi
          .documents('api::product.product')
          .findMany({
            status: 'published',
            filters: {
              favoritedBy: {
                id: user.id,
              },
            },
            populate: {
              brand: true,
              category: true,
              model: true,
              stores: true,
              color: true,
              memory: true,
              images: {
                fields: ['url', 'alternativeText'],
              },
            },
          });

        return favorites;
      } catch (error) {
        return ctx.badRequest('Failed to fetch favorites');
      }
    },
    async syncWebAccountProducts(ctx) {
      try {
        await strapi.service('api::product.product').syncWebAccountProducts();
        ctx.body = { success: true };
      } catch (error) {
        ctx.body = { error: error.message };
        ctx.status = 500;
      }
    },
    async getMetadataBySlug(ctx) {
      const { slug } = ctx.params;
      if (!slug) {
        return ctx.badRequest('Product slug is missing');
      }
      try {
        const product = await strapi
          .documents('api::product.product')
          .findFirst({
            filters: {
              productLink: slug,
            },
            status: 'published',
            populate: {
              images: {
                fields: ['url', 'alternativeText', 'name'],
              },
            },
          });

        if (!product) {
          return ctx.notFound('Product not found');
        }

        return {
          title: product.metaTitle || product.name,
          description: product.metaDescription || product.description,
          images: product.images,
        };
      } catch (error) {
        return ctx.badRequest('Failed to fetch product details');
      }
    },

    async getProductOptions(ctx) {
      const { productTypeId } = ctx.params;
      if (!productTypeId) return ctx.badRequest('productTypeId is missing');

      try {
        ctx.body = await strapi
          .service('api::product.product-options')
          .getProductVariantsByTypeId(productTypeId);
      } catch (error) {
        ctx.body = { error: error.message };
        ctx.throw(500, 'Could not build product-type options');
      }
    },
    async getRelatedProducts(ctx) {
      const { productTypeId } = ctx.params;
      if (!productTypeId) return ctx.badRequest('productTypeId is missing');

      try {
        ctx.body = await strapi
          .service('api::product.related-products')
          .findRelatedProducts(productTypeId);
      } catch (error) {
        ctx.body = { error: error.message };
        ctx.throw(500, 'Could not build related products');
      }
    },
  })
);
