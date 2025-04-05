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
  ],
};
