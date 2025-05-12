export default {
  routes: [
    {
      method: 'GET',
      path: '/grouped-sub-categories/by-slug/:slug',
      handler:
        'api::grouped-sub-category.grouped-sub-category.getGroupedSubCategoryBySlug',
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
