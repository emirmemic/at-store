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
  ],
};
