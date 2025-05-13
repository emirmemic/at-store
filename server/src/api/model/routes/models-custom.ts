export default {
  routes: [
    {
      method: 'GET',
      path: '/models/by-category/:category',
      handler: 'api::model.model.getModelsByCategory',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/models/by-sub-category/:category/:subCategory',
      handler: 'api::model.model.getModelsBySubCategory',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
