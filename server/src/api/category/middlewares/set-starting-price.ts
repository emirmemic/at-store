export default () => {
  return async (_, next) => {
    // Fetch the categories
    try {
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

          // Set the startingPrice of the category
          await strapi.documents('api::category.category').update({
            documentId: category.documentId,
            data: {
              startingPrice,
            },
          });
        })
      );
    } catch (error) {
      strapi.log.error('Error setting price for categories', error);
    }

    return next();
  };
};
