import { factories } from '@strapi/strapi';
import { publishedAndInStockFilter } from '../../../utils/get-available-items';

export default factories.createCoreController(
  'api::category.category',
  ({ strapi }) => ({
    async getCategoryBySlug(ctx) {
      const { slug } = ctx.params;
      if (!slug) {
        return ctx.badRequest('Category slug is required');
      }
      try {
        const category = await strapi
          .documents('api::category.category')
          .findFirst({
            filters: {
              link: slug,
            },
            status: 'published',
            populate: {
              image: {
                fields: ['url', 'alternativeText'],
              },
              subCategories: {
                fields: [
                  'id',
                  'name',
                  'link',
                  'displayName',
                  'shortDescription',
                  'modalText',
                ],
                populate: {
                  products: {
                    filters: publishedAndInStockFilter,
                    fields: ['id', 'productLink', 'productTypeId'],
                  },
                  image: {
                    fields: ['url', 'alternativeText'],
                  },
                },
              },
            },
          });

        if (!category) {
          return ctx.notFound('Category not found');
        }
        const subCategories = category.subCategories.filter(
          (subCategory) => subCategory.products.length > 0
        );
        return {
          ...category,
          subCategories,
        };
      } catch (error) {
        return ctx.badRequest('Failed to fetch category details');
      }
    },
    async getAccessoryTypeAndModels(ctx) {
      const { slug } = ctx.params;
      if (!slug) {
        return ctx.badRequest('Category slug is required');
      }
      try {
        const category = await strapi
          .documents('api::category.category')
          .findFirst({
            filters: {
              link: slug,
            },
            populate: {
              accessoryType: {
                populate: {
                  models: {
                    fields: ['id', 'name', 'displayName'],
                    populate: {
                      products: {
                        filters: publishedAndInStockFilter,
                        fields: [
                          'id',
                          'productLink',
                          'productTypeId',
                          'publishedAt',
                          'amountInStock',
                        ],
                      },
                      icon: {
                        fields: ['url', 'alternativeText'],
                      },
                    },
                  },
                },
              },
            },
          });

        if (!category) {
          return ctx.badRequest('Category not found');
        }

        const accessoryType = category.accessoryType;
        if (!accessoryType) {
          return ctx.badRequest('Accessory type not found');
        }
        const models = accessoryType.models.filter(
          (model) => model.products.length > 0
        );
        return {
          ...accessoryType,
          models,
        };
      } catch (error) {
        return ctx.badRequest('Failed to fetch accessory type and models');
      }
    },
  })
);
