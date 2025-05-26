import {
  developmentSyncingInterval,
  productionSyncingInterval,
} from './utils/constants';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},
  bootstrap: async () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const cronRule = isDevelopment
      ? `*/${developmentSyncingInterval} * * * *`
      : `*/${productionSyncingInterval} * * * *`;

    const environment = isDevelopment ? 'development' : 'production';
    strapi.cron.add({
      syncProducts: {
        task: async () => {
          try {
            strapi.log.info(
              `Starting product sync from web account (${environment} mode)...`
            );
            const startTime = Date.now();
            await strapi
              .service('api::product.product')
              .syncWebAccountProducts();
            await strapi
              .service('api::category.category')
              .makeRelationAccessoryType();
            const duration = Date.now() - startTime;
            strapi.log.info(
              `Product sync completed successfully in ${duration}ms`
            );
          } catch (error) {
            strapi.log.error('Product sync failed:', {
              error: error.message,
              stack: error.stack,
              timestamp: new Date().toISOString(),
              environment,
            });
          }
        },
        options: {
          rule: cronRule,
          tz: 'UTC',
        },
      },
    });
    // Log when the cron job is initialized with schedule info
    strapi.log.info(
      `Product sync cron job initialized (${environment} mode, schedule: ${cronRule})`
    );
  },
};
