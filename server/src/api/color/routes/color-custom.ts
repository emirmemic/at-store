export default {
  routes: [
    {
      method: 'GET',
      path: '/colors/by-category-name/:categoryName',
      handler: 'api::color.color.getAvailableColors',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
