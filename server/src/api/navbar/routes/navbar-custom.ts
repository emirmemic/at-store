export default {
  routes: [
    {
      method: 'GET',
      path: '/navbar/filtered',
      handler: 'api::navbar.navbar.getFilteredItems',
      config: {
        policies: [],
        middlewares: ['api::category.set-starting-price'],
        auth: false,
      },
    },
  ],
};
