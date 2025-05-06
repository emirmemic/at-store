export default {
  routes: [
    {
      method: 'GET',
      path: '/sub-categories/by-slug/:slug',
      handler: 'api::sub-category.sub-category.getProductsBySlug',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
