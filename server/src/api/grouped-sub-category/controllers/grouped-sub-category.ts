/**
 * grouped-sub-category controller
 */

import { factories } from '@strapi/strapi';
import { publishedAndInStockFilter } from '../../../utils/get-available-items';

export default factories.createCoreController(
  'api::grouped-sub-category.grouped-sub-category',
  ({ strapi }) => ({
    async getGroupedSubCategoryBySlug(ctx) {
      const { slug } = ctx.params;
      if (!slug) {
        return ctx.badRequest('Grouped sub-category slug is required');
      }
      try {
        const item = await strapi
          .documents('api::grouped-sub-category.grouped-sub-category')
          .findFirst({
            filters: {
              slug,
            },
            status: 'published',
            populate: {
              sliderImages: {
                fields: ['url', 'alternativeText'],
              },
              category: true,
              subCategories: {
                fields: [
                  'id',
                  'name',
                  'link',
                  'displayName',
                  'shortDescription',
                ],
                populate: {
                  products: {
                    filters: publishedAndInStockFilter,
                    fields: [
                      'id',
                      'productLink',
                      'productTypeId',
                      'amountInStock',
                      'publishedAt',
                    ],
                  },
                  image: {
                    fields: ['url', 'alternativeText'],
                  },
                },
              },
            },
          });

        if (!item) {
          return ctx.notFound('Grouped sub-category not found');
        }
        const subCategories = item.subCategories.filter(
          (subCategory) => subCategory.products.length > 0
        );

        return {
          ...item,
          subCategories,
        };
      } catch (error) {
        console.error('Controller error:', error);
        return ctx.badRequest('Failed to fetch grouped sub-category details');
      }
    },
  })
);
