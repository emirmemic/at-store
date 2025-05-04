/**
 * brand controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::brand.brand",
  ({ strapi }) => ({
    async getAvailableBrands(ctx) {
      const { categoryName } = ctx.params;

      if (!categoryName) {
        return ctx.badRequest("Category name is required");
      }

      try {
        const brands = await strapi.db.query("api::brand.brand").findMany({
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

        // Filter out brands with no matching products
        const filteredBrands = brands.filter(
          (brand) => brand.products.length > 0
        );

        ctx.body = filteredBrands.map((brand) => ({
          id: brand.id,
          documentId: brand.documentId,
          name: brand.name,
        }));
      } catch (error) {
        console.error(error);
        return ctx.internalServerError(
          "Failed to fetch brands with published products in the specified category"
        );
      }
    },
  })
);
