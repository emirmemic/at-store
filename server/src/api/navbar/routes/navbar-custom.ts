export default {
  routes: [
    {
      method: 'GET',
      path: '/navbar/published',
      handler: 'api::navbar.navbar.getPublishedItems',
      config: {
        policies: [],
        middlewares: ['api::category.set-starting-price'],
        auth: false,
      },
    },
  ],
};
