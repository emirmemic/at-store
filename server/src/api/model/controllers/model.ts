/**
 * model controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::model.model',
  ({ strapi }) => ({
    async getModelsByCategory(ctx) {
      const { category } = ctx.params;
      if (!category) {
        return ctx.badRequest('Category is required');
      }
      try {
        const models = await strapi.documents('api::model.model').findMany({
          filters: {
            category: {
              link: category,
            },
          },
          status: 'published',
        });

        if (!models || models.length === 0) {
          return ctx.notFound('No models found for category');
        }

        return models;
      } catch (error) {
        return ctx.badRequest('Failed to fetch models under category');
      }
    },
    async getModelsBySubCategory(ctx) {
      const { category, subCategory } = ctx.params;
      if (!category) {
        return ctx.badRequest('Category is required');
      }
      if (!subCategory) {
        return ctx.badRequest('Sub-category is required');
      }
      try {
        const models = await strapi.documents('api::model.model').findMany({
          filters: {
            category: {
              link: category,
            },
            subCategory: {
              link: subCategory,
            },
          },
          status: 'published',
        });

        if (!models || models.length === 0) {
          return ctx.notFound(
            `No models found for ${category} and ${subCategory}`
          );
        }

        return models;
      } catch (error) {
        return ctx.badRequest(
          `Failed to fetch models under ${category} and ${subCategory}, error: ${error}`
        );
      }
    },
  })
);
