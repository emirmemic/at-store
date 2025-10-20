export const ORDER_POPULATE_CONFIG = {
  user: {
    fields: ['username', 'email'],
  },
  items: {
    populate: {
      product: {
        fields: [
          'documentId',
          'name',
          'productVariantId',
          'productTypeId',
          'productLink',
          'originalPrice',
          'discountedPrice',
        ],
        populate: {
          images: {
            fields: ['url', 'name', 'alternativeText', 'width', 'height'],
          },
          brand: {
            fields: ['name'],
          },
          model: {
            fields: ['name'],
          },
          category: {
            fields: ['name', 'link'],
          },
          color: {
            fields: ['name', 'hex'],
          },
          memory: {
            fields: ['value', 'unit'],
          },
          chip: {
            fields: ['name'],
          },
        },
      },
    },
  },
} as const;
