import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async toggleFavorite(ctx) {
      const { user } = ctx.state;
      const { productId } = ctx.params;

      const product = await strapi.documents("api::product.product").findFirst({
        filters: {
          documentId: productId,
        },
        status: "published",
        populate: ["favoritedBy"],
      });

      if (!product) {
        return ctx.notFound("Product not found");
      }

      const isFavorited = product.favoritedBy.some((u) => u.id === user.id);

      try {
        await strapi.documents("api::product.product").update({
          documentId: productId,
          status: "published",
          data: {
            favoritedBy: {
              [isFavorited ? "disconnect" : "connect"]: [
                { id: user.id, status: "published" },
              ],
            },
          },
          populate: ["favoritedBy"],
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
            status: "published",
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
                fields: ["url", "alternativeText"],
              },
            },
          });

        return favorites;
      } catch (error) {
        return ctx.badRequest("Failed to fetch favorites");
      }
    },
    async syncWebAccountProducts(ctx) {
      try {
        await strapi.service("api::product.product").syncWebAccountProducts();
        ctx.body = { success: true };
      } catch (error) {
        ctx.body = { error: error.message };
        ctx.status = 500;
      }
    },
    async getProductByLink(ctx) {
      const { productLink } = ctx.params;
    
      try {
        const product = await strapi.documents("api::product.product").findFirst({
          filters: {
            productLink: productLink,
          },
          status: "published",
          populate: {
            brand: true,
            category: true,
            model: true,
            stores: true,
            color: true,
            memory: true,
            images: {
              fields: ["url", "alternativeText"],
            },
          },
        });
    
        if (!product) {
          return ctx.notFound("Product not found");
        }
    
        return product;
      } catch (error) {
        return ctx.badRequest("Failed to fetch product details");
      }
    },
  })
);
