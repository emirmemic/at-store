import { Strapi } from '@strapi/types/dist/core';

/**
 * Retrieves a list of available items from the database based on the specified model and category/subCategory link.
 * Filters the items to include only those with published products in the given category or subCategory.
 * Returns the filtered items with only the specified fields.
 *
 * @param strapi - The Strapi instance used to query the database.
 * @param model - The name of the database model to query.
 * @param link - The link of the category or subCategory to filter products by.
 * @param linkType - The type of link to filter by ('category' or 'subCategory').
 * @param fields - An optional array of field names to include in the result (default: ['id', 'documentId', 'name']).
 * @returns A promise that resolves to an array of objects, each containing the specified fields from the filtered items.
 */
export const getItemsByLink = async (
  strapi: Strapi,
  model: string,
  link: string,
  linkType: 'category' | 'subCategory',
  fields = ['id', 'documentId', 'name']
): Promise<Array<Record<string, any>>> => {
  const items = await strapi.db.query(model).findMany({
    where: {
      products: {
        ...publishedAndInStockFilter,
        [linkType]: {
          link: {
            $eq: link,
          },
        },
      },
    },
    populate: {
      products: {
        where: {
          [linkType]: {
            link: {
              $eq: link,
            },
          },
        },
        populate: {
          [linkType]: true,
        },
      },
    },
  });

  return items
    .filter((item) => item.products.length > 0)
    .map((item) => {
      const result: Record<string, any> = {};
      fields.forEach((field) => {
        result[field] = item[field];
      });
      return result;
    });
};

export const getItemsByCategoryLink = async (
  strapi: Strapi,
  model: string,
  categoryLink: string,
  fields = ['id', 'documentId', 'name']
): Promise<Array<Record<string, any>>> => {
  return getItemsByLink(strapi, model, categoryLink, 'category', fields);
};
export const getItemsBySubCategoryLink = async (
  strapi: Strapi,
  model: string,
  subCategoryLink: string,
  fields = ['id', 'documentId', 'name']
): Promise<Array<Record<string, any>>> => {
  return getItemsByLink(strapi, model, subCategoryLink, 'subCategory', fields);
};

/**
 * Filters to find items that are published and in stock.
 * @type {Object}
 */
export const publishedAndInStockFilter: object = {
  publishedAt: { $notNull: true },
  //TODO: Check later
  // amountInStock: { $gt: 0 },
};
