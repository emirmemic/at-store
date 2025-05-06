/**
 * material controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::material.material',
  ({ strapi }) => ({
    async getAvailableMaterials(ctx) {
      const { categoryName } = ctx.params;

      if (!categoryName) {
        return ctx.badRequest('Category name is required');
      }

      try {
        const materials = await strapi.db
          .query('api::material.material')
          .findMany({
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

        // Filter out materials with no matching products
        const filteredMaterials = materials.filter(
          (material) => material.products.length > 0
        );

        ctx.body = filteredMaterials.map((material) => ({
          id: material.id,
          documentId: material.documentId,
          name: material.name,
        }));
      } catch (error) {
        console.error(error);
        return ctx.internalServerError(
          'Failed to fetch materials with published products in the specified category'
        );
      }
    },
  })
);
