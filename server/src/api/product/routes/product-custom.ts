export default {
  routes: [
    {
      method: "GET",
      path: "/products/favorites",
      handler: "api::product.product.getUserFavorites",
    },
    {
      method: "POST",
      path: "/products/:productId/favorite",
      handler: "api::product.product.toggleFavorite",
    },
    {
      method: "POST",
      path: "/products/sync-web-account-products",
      handler: "api::product.product.syncWebAccountProducts",
    },
    {
      method: "GET",
      path: "/products/:slug/metadata",
      handler: "api::product.product.getMetadataBySlug",
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    }, 
    {
      method: 'GET',
      path:  '/products/:slug/options',
      handler: 'api::product.product.getProductOptions',
      config: {
        auth: false,
        middlewares: [],
        policies: []
      },
    },
  ],
};
