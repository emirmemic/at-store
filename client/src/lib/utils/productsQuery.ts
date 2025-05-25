import { STRAPI_IMAGE_FIELDS } from '../constants';

export const productsQuery = {
  filters: {
    publishedAt: { $notNull: true },
    amountInStock: { $gt: 0 },
  },
  populate: {
    images: {
      fields: STRAPI_IMAGE_FIELDS,
    },
    category: true,
  },
};
