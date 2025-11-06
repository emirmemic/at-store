import {
  RELATED_GROUP_POPULATE,
  RELATED_PRODUCT_FIELDS,
  RELATED_PRODUCT_POPULATE,
} from '../utils/related-group';

export default ({ strapi }) => ({
  /**
   * Returns related products for the given product type. Prefers curated bundles and
   * falls back to the legacy device compatibility match to preserve existing behaviour.
   */
  async findRelatedProducts(typeId: string) {
    const relatedFromBundle = await strapi
      .documents('api::product.product')
      .findFirst({
        filters: {
          productTypeId: {
            $eqi: typeId,
          },
        },
        status: 'published',
        populate: RELATED_GROUP_POPULATE,
      });

    if (relatedFromBundle?.related_group?.products?.length) {
      return relatedFromBundle.related_group.products;
    }

    const fallback = await strapi.documents('api::product.product').findMany({
      filters: {
        deviceCompatibility: {
          $containsi: typeId,
        },
      },
      status: 'published',
      fields: RELATED_PRODUCT_FIELDS as unknown as string[],
      populate: RELATED_PRODUCT_POPULATE,
    });

    return fallback;
  },
});
