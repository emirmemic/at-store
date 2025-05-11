import { factories } from '@strapi/strapi';
import {
  getItemsByCategoryLink,
  getItemsBySubCategoryLink,
} from '../../../utils/get-available-items';
export default factories.createCoreController(
  'api::color.color',
  ({ strapi }) => ({
    async getAvailableColorsByCategory(ctx) {
      const { categoryLink } = ctx.params;

      if (!categoryLink) {
        return ctx.badRequest('Category link is required');
      }

      try {
        const colors = await getItemsByCategoryLink(
          strapi,
          'api::color.color',
          categoryLink,
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
    async getAvailableColorsBySubCategory(ctx) {
      const { subCategoryLink } = ctx.params;

      if (!subCategoryLink) {
        return ctx.badRequest('SubCategory link is required');
      }

      try {
        const colors = await getItemsBySubCategoryLink(
          strapi,
          'api::color.color',
          subCategoryLink,
          ['id', 'documentId', 'name', 'hex']
        );
        ctx.body = colors;
      } catch (error) {
        console.error(error);
        return ctx.internalServerError(
          'Failed to fetch colors with published products in the specified subCategory'
        );
      }
    },
  })
);
