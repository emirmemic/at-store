export default {
  routes: [
    {
      method: 'GET',
      path: '/brands/by-category-name/:categoryName',
      handler: 'api::brand.brand.getAvailableBrands',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
