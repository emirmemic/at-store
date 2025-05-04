export default () => {
  return async (ctx, next) => {
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

        // Calculate startingPrice
        const startingPrice = products.length
          ? Math.min(
              ...products.map(
                (product) => product.discountedPrice ?? product.originalPrice
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

    return next();
  };
};
