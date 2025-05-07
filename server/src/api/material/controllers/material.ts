import { factories } from '@strapi/strapi';
import { getAvailableItems } from '../../../utils/get-available-items';
export default factories.createCoreController(
  'api::material.material',
  ({ strapi }) => ({
    async getAvailableMaterials(ctx) {
      const { categoryName } = ctx.params;

      if (!categoryName) {
        return ctx.badRequest('Category name is required');
      }

      try {
        const materials = await getAvailableItems(
          strapi,
          'api::material.material',
          categoryName
        );
        ctx.body = materials;
      } catch (error) {
        console.error(error);
        return ctx.internalServerError(
          'Failed to fetch materials with published products in the specified category'
        );
      }
    },
  })
);
