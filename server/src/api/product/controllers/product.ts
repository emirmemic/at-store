import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async toggleFavorite(ctx) {
      const { user } = ctx.state;
      const { productId } = ctx.params;

      const product = await strapi.documents("api::product.product").findFirst({
        filters: {
          id: productId,
        },
        populate: ["favorited_by"],
      });

      if (!product) {
        return ctx.notFound("Product not found");
      }

      const isFavorited = product.favorited_by.some((u) => u.id === user.id);

      try {
        await strapi.documents("api::product.product").update({
          documentId: product.documentId,
          data: {
            favorited_by: {
              [isFavorited ? "disconnect" : "connect"]: [{ id: user.id }],
            },
          },
        });
        return { isFavorited: !isFavorited };
      } catch (error) {
        return ctx.badRequest("Failed to toggle favorite");
      }
    },

    async getUserFavorites(ctx) {
      const { user } = ctx.state;
      if (!user) {
        return ctx.unauthorized(
          "You are not authorized to access this resource"
        );
      }
      try {
        const favorites = await strapi
          .documents("api::product.product")
          .findMany({
            filters: {
              favorited_by: {
                id: user.id,
              },
            },
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          });

        return favorites;
      } catch (error) {
        return ctx.badRequest("Failed to fetch favorites");
      }
    },
  })
);
