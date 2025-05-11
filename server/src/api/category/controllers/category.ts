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
          return ctx.notFound('Product not found');
        }

        return category;
      } catch (error) {
        return ctx.badRequest('Failed to fetch product details');
      }
    },
  })
);
