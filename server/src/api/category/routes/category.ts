/**
 * category router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::category.category', {
  config: {
    find: {
      middlewares: ['api::category.set-starting-price'],
    },
    findOne: {
      middlewares: ['api::category.set-starting-price'],
    },
  },
});
