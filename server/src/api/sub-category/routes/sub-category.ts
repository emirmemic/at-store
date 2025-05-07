/**
 * sub-category router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::sub-category.sub-category', {
  config: {
    find: {
      middlewares: ['api::sub-category.set-starting-price'],
    },
    findOne: {
      middlewares: ['api::sub-category.set-starting-price'],
    },
  },
});
