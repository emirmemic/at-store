import { factories } from '@strapi/strapi';

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
                ],
                populate: {
                  products: {
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

        return category;
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
          return [];
        }

        return accessoryType;
      } catch (error) {
        return ctx.badRequest('Failed to fetch accessory type and models');
      }
    },
  })
);
