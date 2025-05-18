export default {
  routes: [
    {
      method: 'POST',
      path: '/order/products/stock-status',
      handler: 'api::order.order.checkProductStatus',
      config: {
        auth: false,
      },
    },
  ],
};
