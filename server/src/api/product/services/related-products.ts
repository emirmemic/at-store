export default ({ strapi }) => ({
  /**
   * Fetches related products based on a product type ID, gets all the products of the same type
   * @param {string} typeId - The ID of the product type.
   * @returns {Promise<any>} - The related products.
   */
  async findRelatedProducts(typeId: string) {
    const products = await strapi.documents('api::product.product').findMany({
      filters: {
        deviceCompatibility: {
          $containsi: typeId,
        },
      },
      status: 'published',
      populate: {
        category: true,
        images: {
          fields: ['url', 'alternativeText'],
        },
      },
    });
    return products;
  },
});
