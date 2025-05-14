import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::navbar.navbar',
  ({ strapi }) => ({
    async getPublishedItems(ctx) {
      try {
        const navbar = await strapi.service('api::navbar.navbar').find({
          populate: {
            items: {
              populate: {
                category: {
                  populate: {
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
                      fields: [
                        'id',
                        'productLink',
                        'publishedAt',
                        'productTypeId',
                      ],
                    },
                  },
                },
                groupedSubCategories: {
                  populate: {
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

        if (!navbar) {
          return ctx.notFound('Navbar not found');
        }

        const filteredItems = navbar.items.map((item) => {
          // Filter subcategories by checking if they have published products
          const filteredSubCategories = (item.subCategories || [])
            .map((subCategory) => {
              const publishedProducts = (subCategory.products || []).filter(
                (product) => product.publishedAt !== null
              );

              const firstProduct = publishedProducts[0] || null;

              return {
                ...subCategory,
                products: firstProduct ? [firstProduct] : [],
              };
            })
            .filter((sub) => sub.products.length > 0);

          return {
            ...item,
            subCategories: filteredSubCategories,
          };
        });

        return { ...navbar, items: filteredItems };
      } catch (error) {
        console.error('Failed to fetch navbar:', error);
        return ctx.internalServerError('Failed to fetch navbar data');
      }
    },
  })
);
