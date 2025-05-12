export default ({ strapi }) => ({
  /**
   * Fetches product variants by slug, gets all the products of the same type and
   * organizes them by their attributes(color, memory etc.) and populates available options.
   * @param {string} slug - The slug of the product.
   * @returns {Promise<any>} - The product variants with unified response format and
   * available options.
   */
  async findRelatedProducts(typeId: string) {
    // Fetch all products of the same type and organize them by their attributes and populate available options
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
