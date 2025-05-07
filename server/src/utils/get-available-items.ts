import { Strapi } from '@strapi/types/dist/core';

/**
 * Retrieves a list of available items from the database based on the specified model and category name.
 * Filters the items to include only those with published products in the given category.
 * Returns the filtered items with only the specified fields.
 *
 * @param strapi - The Strapi instance used to query the database.
 * @param model - The name of the database model to query.
 * @param categoryName - The name of the category to filter products by.
 * @param fields - An optional array of field names to include in the result (default: ['id', 'documentId', 'name']).
 * @returns A promise that resolves to an array of objects, each containing the specified fields from the filtered items.
 */
export const getAvailableItems = async (
  strapi: Strapi,
  model: string,
  categoryName: string,
  fields = ['id', 'documentId', 'name']
): Promise<Array<Record<string, any>>> => {
  const items = await strapi.db.query(model).findMany({
    where: {
      products: {
        publishedAt: { $notNull: true },
        category: {
          name: {
            $eqi: categoryName,
          },
        },
      },
    },
    populate: {
      products: {
        where: {
          category: {
            name: {
              $eqi: categoryName,
            },
          },
        },
        populate: {
          category: true,
        },
      },
    },
  });

  return items
    .filter((item) => item.products.length > 0)
    .map((item) => {
      const result = {};
      fields.forEach((field) => {
        result[field] = item[field];
      });
      return result;
    });
};
