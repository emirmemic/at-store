export default {
  routes: [
    {
      method: 'GET',
      path: '/cart',
      handler: 'api::cart.cart.getUserCart',
    },
    {
      method: 'PATCH',
      path: '/cart/:productId/update',
      handler: 'api::cart.cart.updateCart',
    },
  ],
};
