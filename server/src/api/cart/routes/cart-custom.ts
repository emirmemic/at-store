export default {
  routes: [
    {
      method: 'GET',
      path: '/cart',
      handler: 'api::cart.cart.getUserCart',
    },
    {
      method: 'PUT',
      path: '/cart/clear',
      handler: 'api::cart.cart.clearCart',
    },
    {
      method: 'PATCH',
      path: '/cart/:productId/update',
      handler: 'api::cart.cart.updateCart',
    },
  ],
};
