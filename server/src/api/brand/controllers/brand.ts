import { factories } from '@strapi/strapi';
import {
  getItemsByCategoryLink,
  getItemsBySubCategoryLink,
} from '../../../utils/get-available-items';
export default factories.createCoreController(
  'api::brand.brand',
  ({ strapi }) => ({
    async getAvailableBrandsByCategory(ctx) {
      const { categoryLink } = ctx.params;

      if (!categoryLink) {
        return ctx.badRequest('Category link is required');
      }

      try {
        const brands = await getItemsByCategoryLink(
          strapi,
          'api::brand.brand',
          categoryLink
        );
        ctx.body = brands;
      } catch (error) {
        console.error(error);
        return ctx.internalServerError(
          'Failed to fetch brands with published products in the specified category'
        );
      }
    },
    async getAvailableBrandsBySubCategory(ctx) {
      const { subCategoryLink } = ctx.params;

      if (!subCategoryLink) {
        return ctx.badRequest('SubCategory link is required');
      }

      try {
        const brands = await getItemsBySubCategoryLink(
          strapi,
          'api::brand.brand',
          subCategoryLink
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
