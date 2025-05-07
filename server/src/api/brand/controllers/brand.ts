import { factories } from '@strapi/strapi';
import { getAvailableItems } from '../../../utils/get-available-items';
export default factories.createCoreController(
  'api::brand.brand',
  ({ strapi }) => ({
    async getAvailableBrands(ctx) {
      const { categoryName } = ctx.params;

      if (!categoryName) {
        return ctx.badRequest('Category name is required');
      }

      try {
        const brands = await getAvailableItems(
          strapi,
          'api::brand.brand',
          categoryName
        );
        ctx.body = brands;
      } catch (error) {
        console.error(error);
        return ctx.internalServerError(
          'Failed to fetch brands with published products in the specified category'
        );
      }
    },
  })
);
