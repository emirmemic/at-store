import { factories } from '@strapi/strapi';
import {
  getItemsByCategoryLink,
  getItemsBySubCategoryLink,
} from '../../../utils/get-available-items';
export default factories.createCoreController(
  'api::material.material',
  ({ strapi }) => ({
    async getAvailableMaterialsByCategory(ctx) {
      const { categoryLink } = ctx.params;

      if (!categoryLink) {
        return ctx.badRequest('Category link is required');
      }

      try {
        const materials = await getItemsByCategoryLink(
          strapi,
          'api::material.material',
          categoryLink
        );
        ctx.body = materials;
      } catch (error) {
        console.error(error);
        return ctx.internalServerError(
          'Failed to fetch materials with published products in the specified category'
        );
      }
    },
    async getAvailableMaterialsBySubCategory(ctx) {
      const { subCategoryLink } = ctx.params;

      if (!subCategoryLink) {
        return ctx.badRequest('SubCategory link is required');
      }

      try {
        const materials = await getItemsBySubCategoryLink(
          strapi,
          'api::material.material',
          subCategoryLink
        );
        ctx.body = materials;
      } catch (error) {
        console.error(error);
        return ctx.internalServerError(
          'Failed to fetch materials with published products in the specified subCategory'
        );
      }
    },
  })
);
