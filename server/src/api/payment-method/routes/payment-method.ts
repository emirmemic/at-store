/**
 * payment-method router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter(
  'api::payment-method.payment-method',
  {
    config: {
      find: {
        middlewares: ['global::is-owner'],
      },
      findOne: {
        middlewares: ['global::is-owner'],
      },
      delete: {
        middlewares: ['global::is-owner'],
      },
    },
  }
);
