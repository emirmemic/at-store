/**
 * navbar service
 */

import { factories } from '@strapi/strapi';
import { publishedAndInStockFilter } from '../../../utils/get-available-items';

export default factories.createCoreService('api::navbar.navbar', () => ({
  async filterNavbar() {
    const navbar = await strapi.service('api::navbar.navbar').find({
      populate: {
        items: {
          populate: {
            category: {
              populate: {
                products: {
                  filters: publishedAndInStockFilter,
                  fields: [
                    'id',
                    'productLink',
                    'publishedAt',
                    'productTypeId',
                    'publishedAt',
                    'amountInStock',
                  ],
                },
                image: {
                  fields: ['url', 'alternativeText'],
                },
              },
            },
            subCategories: {
              populate: {
                navbarIcon: {
                  fields: ['url', 'alternativeText'],
                },
                products: {
                  filters: publishedAndInStockFilter,
                  fields: [
                    'id',
                    'productLink',
                    'publishedAt',
                    'productTypeId',
                    'publishedAt',
                    'amountInStock',
                  ],
                },
              },
            },
            groupedSubCategories: {
              populate: {
                subCategories: {
                  populate: {
                    products: {
                      filters: publishedAndInStockFilter,
                      fields: [
                        'id',
                        'productLink',
                        'publishedAt',
                        'productTypeId',
                        'publishedAt',
                        'amountInStock',
                      ],
                    },
                  },
                },
                navbarIcon: {
                  fields: ['url', 'alternativeText'],
                },
                fields: ['id', 'displayName', 'slug'],
              },
            },
          },
        },
      },
    });
    if (!navbar || !navbar.items) {
      return [];
    }
    const filteredItems = navbar.items
      .map((item) => {
        const category = item.category;

        // ❌ Skip items with no valid category or no valid products
        if (!category || category.products.length === 0) {
          return null;
        }

        // ✅ Remove products from category
        const { products: _, ...cleanedCategory } = category;

        // ✅ Subcategories: only keep the first product (if any)
        const filteredSubCategories = (item.subCategories || [])
          .map((subCategory) => {
            const firstProduct = subCategory.products?.[0];
            if (!firstProduct) return null;

            return {
              ...subCategory,
              products: [firstProduct],
            };
          })
          .filter(Boolean);

        // ✅ Grouped Subcategories: only include those that have subCategories with products
        const filteredGroupedSubCategories = (item.groupedSubCategories || [])
          .map((groupedSubCategory) => {
            const filteredSubCats = groupedSubCategory.subCategories || [];

            if (filteredSubCats.length === 0) return null;

            // ✅ Remove products from each subcategory
            const cleanedSubCategories = filteredSubCats.map(
              ({ products, ...rest }) => rest
            );

            return {
              ...groupedSubCategory,
              subCategories: cleanedSubCategories,
            };
          })
          .filter(Boolean);

        return {
          ...item,
          category: cleanedCategory,
          subCategories: filteredSubCategories,
          groupedSubCategories: filteredGroupedSubCategories,
        };
      })
      .filter(Boolean);

    return {
      ...navbar,
      items: filteredItems,
    };
  },
}));
