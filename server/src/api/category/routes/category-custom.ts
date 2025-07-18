export default {
  routes: [
    {
      method: 'GET',
      path: '/categories/by-slug/:slug',
      handler: 'api::category.category.getCategoryBySlug',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/categories/:slug/accessory-models',
      handler: 'api::category.category.getAccessoryTypeAndModels',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
