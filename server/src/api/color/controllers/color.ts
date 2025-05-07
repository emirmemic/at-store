import { factories } from '@strapi/strapi';
import { getAvailableItems } from '../../../utils/get-available-items';
export default factories.createCoreController(
  'api::color.color',
  ({ strapi }) => ({
    async getAvailableColors(ctx) {
      const { categoryName } = ctx.params;

      if (!categoryName) {
        return ctx.badRequest('Category name is required');
      }

      try {
        const colors = await getAvailableItems(
          strapi,
          'api::color.color',
          categoryName,
          ['id', 'documentId', 'name', 'hex']
        );
        ctx.body = colors;
      } catch (error) {
        console.error(error);
        return ctx.internalServerError(
          'Failed to fetch colors with published products in the specified category'
        );
      }
    },
  })
);
