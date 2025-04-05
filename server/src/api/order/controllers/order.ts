import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async find(ctx) {
      // Get the current user from the state
      const user = ctx.state.user;

      // If there's no user, return empty results or an error
      if (!user) {
        return ctx.unauthorized("You are not authorized to access this order");
      }

      const { results, pagination } = await strapi
        .service("api::order.order")
        .find({
          filters: {
            user: user.id,
          },
          populate: {
            products: {
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
          },
        });

      const sanitizedResults = await this.sanitizeOutput(results, ctx);

      return this.transformResponse(sanitizedResults, { pagination });
    },
  })
);
