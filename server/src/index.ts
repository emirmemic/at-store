import {
  developmentSyncingInterval,
  productionSyncingInterval,
} from './utils/constants';

// Flag to track if sync is currently running
let isSyncInProgress = false;

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
          // Check if sync is already in progress
          if (isSyncInProgress) {
            strapi.log.warn(
              `Skipping product sync - previous sync still in progress (${environment} mode)`
            );
            return;
          }

          // Set the flag to indicate sync is starting
          isSyncInProgress = true;

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
          } finally {
            // Always reset the flag when sync is complete (success or failure)
            isSyncInProgress = false;
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
