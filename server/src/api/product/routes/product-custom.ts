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
      path: "/products/link/:productLink",
      handler: "product.getProductByLink",
      config: {
        policies: [],
        middlewares: [],
        auth: false,
      },
    },
  ],
};
