export default {
  routes: [
    {
      method: 'GET',
      path: '/colors/by-category-link/:categoryLink',
      handler: 'api::color.color.getAvailableColorsByCategory',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/colors/by-sub-category-link/:subCategoryLink',
      handler: 'api::color.color.getAvailableColorsBySubCategory',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
