export default {
  routes: [
    {
      method: 'GET',
      path: '/brands/by-category-link/:categoryLink',
      handler: 'api::brand.brand.getAvailableBrandsByCategory',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/brands/by-sub-category-link/:subCategoryLink',
      handler: 'api::brand.brand.getAvailableBrandsBySubCategory',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
