/**
 * sub-category controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::sub-category.sub-category',
  ({ strapi }) => ({
    async getProductsBySlug(ctx) {
      const { slug } = ctx.params;
      if (!slug) {
        return ctx.badRequest('Slug is required');
      }
      try {
        const subCategory = await strapi
          .documents('api::sub-category.sub-category')
          .findFirst({
            filters: {
              link: slug,
            },
            status: 'published',
            populate: {
              image: {
                fields: ['url', 'alternativeText'],
              },
              products: {
                populate: {
                  images: {
                    fields: ['url', 'alternativeText'],
                  },
                },
              },
            },
          });

        if (!subCategory) {
          return ctx.notFound('Sub-category not found');
        }
        return subCategory;
      } catch (error) {
        return ctx.badRequest('Failed to fetch product details');
      }
    },
  })
);
