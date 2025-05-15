import jwt from 'jsonwebtoken';
import {
  developmentSyncingInterval,
  productionSyncingInterval,
} from './utils/constants';

function generateClientSecret() {
  const privateKey = process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, '\n');

  const now = Math.floor(Date.now() / 1000);

  return jwt.sign(
    {
      iss: process.env.APPLE_TEAM_ID, // Your Apple Team ID
      iat: now,
      exp: now + 15777000, // ~6 months max
      aud: 'https://appleid.apple.com',
      sub: process.env.APPLE_SERVICE_ID, // Your Service ID / Client ID
    },
    privateKey,
    {
      algorithm: 'ES256',
      keyid: process.env.APPLE_KEY_ID, // Key ID in header
    }
  );
}

export default {
  register({ strapi }) {
    strapi
      .plugin('users-permissions')
      .service('providers-registry')
      .add('apple', {
        icon: 'apple',
        enabled: true,
        grantConfig: {
          apple: {
            authorize_url: 'https://appleid.apple.com/auth/authorize',
            access_url: 'https://appleid.apple.com/auth/token',
            oauth: 2,
            scope: 'name email',
            custom_params: {
              response_mode: 'form_post',
              response_type: 'code',
            },
            redirect_uri: `${strapi.config.server.url}/api/connect/apple/callback`,
            key: process.env.APPLE_KEY,
          },
        },
        async authCallback({ purest, query }) {
          const clientSecret = generateClientSecret();

          const { body } = await purest({
            provider: 'generic',
            config: {
              apple: {
                default: {
                  origin: 'https://appleid.apple.com',
                  path: '/auth/token',
                  headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                  },
                },
              },
            },
          })
            .post({
              form: {
                grant_type: 'authorization_code',
                code: query.code,
                client_id: process.env.APPLE_SERVICE_ID,
                client_secret: clientSecret,
                redirect_uri: `${strapi.config.server.url}/api/connect/apple/callback`,
              },
            })
            .request();

          console.log(body, 'body');

          const decoded: any = jwt.decode(body.id_token);

          console.log(decoded, 'decoded id_token');
          return { email: decoded.email, username: decoded.sub };
        },
      });
  },
  bootstrap: async () => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const cronRule = isDevelopment
      ? `0 */${developmentSyncingInterval} * * *`
      : `*/${productionSyncingInterval} * * * *`

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
