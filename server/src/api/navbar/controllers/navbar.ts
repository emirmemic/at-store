import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::navbar.navbar',
  ({ strapi }) => ({
    async getFilteredItems(ctx) {
      try {
        ctx.body = await strapi.service('api::navbar.navbar').filterNavbar();
      } catch (error) {
        console.error('Failed to fetch filtered navbar items:', error);
        ctx.internalServerError('Failed to fetch filtered navbar items');
      }
    },
  })
);
