export default () => {
  return async (ctx, next) => {
    // Fetch the categories
    const categories = await strapi
      .documents('api::category.category')
      .findMany({
        populate: { products: true },
      });

    // Fetch products in each category and calculate startingPrice
    await Promise.all(
      categories.map(async (category) => {
        const products = await strapi
          .documents('api::product.product')
          .findMany({
            filters: {
              category: {
                id: category.id,
              },
            },
            status: 'published',
          });

        // Calculate startingPrice
        const startingPrice = products.length
          ? Math.min(
              ...products.map(
                (product) => product.discountedPrice ?? product.originalPrice
              )
            )
          : null;

        // Set the startingPrice of the category
        await strapi.documents('api::category.category').update({
          documentId: category.documentId,
          data: {
            startingPrice,
          },
        });
      })
    );

    return next();
  };
};
