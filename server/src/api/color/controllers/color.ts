import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::color.color',
  ({ strapi }) => ({
    async getAvailableColors(ctx) {
      const { categoryName } = ctx.params;

      if (!categoryName) {
        return ctx.badRequest('Category name is required');
      }

      try {
        const colors = await strapi.db.query('api::color.color').findMany({
          where: {
            products: {
              publishedAt: { $notNull: true },
              category: {
                name: categoryName,
              },
            },
          },
          populate: {
            products: {
              where: {
                category: {
                  name: categoryName,
                },
              },
              populate: {
                category: true,
              },
            },
          },
        });

        // Filter out colors with no matching products
        const filteredColors = colors.filter(
          (color) => color.products.length > 0
        );

        ctx.body = filteredColors.map((color) => ({
          id: color.id,
          documentId: color.documentId,
          name: color.name,
          hex: color.hex,
        }));
      } catch (error) {
        console.error(error);
        return ctx.internalServerError(
          'Failed to fetch colors with published products in the specified category'
        );
      }
    },
  })
);
