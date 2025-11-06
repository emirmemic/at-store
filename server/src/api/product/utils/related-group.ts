// Shared field/populate configuration for related product bundles.
export const RELATED_PRODUCT_FIELDS = [
  'id',
  'documentId',
  'name',
  'displayName',
  'productLink',
  'productVariantId',
  'productTypeId',
  'webAccountArticleName',
  'originalPrice',
  'discountedPrice',
] as const;

export const RELATED_PRODUCT_POPULATE = {
  images: {
    fields: ['url', 'alternativeText'],
  },
  category: {
    fields: ['id', 'link'],
  },
} as const;

export const RELATED_GROUP_POPULATE = {
  related_group: {
    fields: ['id', 'title'],
    populate: {
      products: {
        fields: RELATED_PRODUCT_FIELDS,
        populate: RELATED_PRODUCT_POPULATE,
      },
    },
  },
} as const;

export const applyRelatedGroupPopulate = (query: Record<string, any>): void => {
  if (query.populate === '*') {
    return;
  }

  if (!query.populate || typeof query.populate !== 'object') {
    query.populate = {};
  }

  query.populate = {
    ...query.populate,
    ...RELATED_GROUP_POPULATE,
  };
};
