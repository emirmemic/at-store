import { factories } from '@strapi/strapi';

/**
 * Service to manage the relationship between categories and accessory types.
 *
 * @function makeRelationAccessoryType
 * @async
 * @description
 * Assigns accessory types (iphone_dodaci, mac_dodaci, etc.) to categories that are not 'dodaci',
 * only if they don't already have an accessory type assigned.
 */
export default factories.createCoreService('api::category.category', () => ({
  makeRelationAccessoryType: async () => {
    try {
      const accessoriesCategory = await strapi.db
        .query('api::category.category')
        .findOne({
          where: {
            name: {
              $eqi: 'dodaci',
            },
          },
          populate: ['subCategories'],
        });

      if (!accessoriesCategory) {
        strapi.log.error('Dodaci category not found');
        return;
      }

      const accessoriesSubCategories = accessoriesCategory.subCategories;

      const categories = await strapi.db
        .query('api::category.category')
        .findMany({
          populate: ['accessoryType'],
        });

      for (const category of categories) {
        // Skip 'dodaci' category and those that already have an accessory type
        if (
          category.name.toLowerCase() === 'dodaci' ||
          category.accessoryType
        ) {
          continue;
        }

        const accessoryType = accessoriesSubCategories.find((subCategory) =>
          subCategory.name.toLowerCase().includes(category.name.toLowerCase())
        );

        if (!accessoryType) {
          strapi.log.warn(
            `No accessory type found for category: ${category.name}`
          );
          continue;
        }

        await strapi.db.query('api::category.category').update({
          where: { id: category.id },
          data: {
            accessoryType: accessoryType.id,
          },
        });

        strapi.log.info(
          `Assigned accessory type ${accessoryType.name} to category ${category.name}`
        );
      }

      strapi.log.info('Accessory types assigned to categories successfully.');
    } catch (error) {
      strapi.log.error('Error in makeRelationAccessoryType service:', error);
    }
  },
}));
