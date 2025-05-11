import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::navbar.navbar',
  ({ strapi }) => ({
    async getPublishedItems(ctx) {
      try {
        const navbar = await strapi.service('api::navbar.navbar').find({
          populate: {
            categories: {
              filters: {
                products: {
                  publishedAt: {
                    $notNull: true,
                  },
                },
              },
              populate: {
                image: {
                  fields: ['url', 'alternativeText'],
                },
                subCategories: {
                  filters: {
                    products: {
                      publishedAt: {
                        $notNull: true,
                      },
                    },
                  },
                  populate: {
                    navbarIcon: {
                      fields: ['url', 'alternativeText'],
                    },
                    products: {
                      fields: ['id', 'productLink', 'publishedAt'],
                    },
                  },
                },
              },
            },
          },
        });

        if (!navbar) {
          return ctx.notFound('Navbar not found');
        }
        // Get the first product from each subcategory that has published products
        // it is used on the frontend to make a link to the product page
        const filteredCategories = navbar.categories.map((category) => {
          const filteredSubCategories = category.subCategories.map(
            (subCategory) => {
              const filteredProducts = subCategory.products.filter(
                (product) => product.publishedAt !== null
              );
              const firstProduct = filteredProducts[0] || null;
              return {
                ...subCategory,
                products: firstProduct ? [firstProduct] : [],
              };
            }
          );
          return {
            ...category,
            subCategories: filteredSubCategories,
          };
        });

        return { ...navbar, categories: filteredCategories };
      } catch (error) {
        console.error('Failed to fetch navbar:', error);
        return ctx.internalServerError('Failed to fetch navbar data');
      }
    },
  })
);
