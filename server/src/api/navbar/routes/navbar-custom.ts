export default {
  routes: [
    {
      method: 'GET',
      path: '/navbar/published',
      handler: 'api::navbar.navbar.getPublishedItems',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
