export default {
  routes: [
    {
      method: 'GET',
      path: '/materials/by-category-link/:categoryLink',
      handler: 'api::material.material.getAvailableMaterialsByCategory',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/materials/by-sub-category-link/:subCategoryLink',
      handler: 'api::material.material.getAvailableMaterialsBySubCategory',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
