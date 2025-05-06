export default () => {
  return async (_, next) => {
    try {
      // Fetch the subCategories
      const subCategories = await strapi
        .documents("api::sub-category.sub-category")
        .findMany({
          populate: { products: true },
        });

      // Fetch products in each category and calculate startingPrice
      await Promise.all(
        subCategories.map(async (subCategory) => {
          const products = await strapi
            .documents("api::product.product")
            .findMany({
              filters: {
                subCategory: {
                  id: subCategory.id,
                },
              },
              status: "published",
            });

          // Check if there are published products
          if (!products || products.length === 0) {
            return;
          }

          // Calculate startingPrice
          const startingPrice = products.length
            ? Math.min(
                ...products.map(
                  (product) => product.discountedPrice || product.originalPrice
                )
              )
            : null;

          // Set the startingPrice of the subCategory
          await strapi.documents("api::sub-category.sub-category").update({
            documentId: subCategory.documentId,
            data: {
              startingPrice,
            },
          });
        })
      );
    } catch (error) {
      strapi.log.error("Error setting price for sub categories", error);
    }

    return next();
  };
};
