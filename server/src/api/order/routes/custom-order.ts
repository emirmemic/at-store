/**
 * custom order routes
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/narudzba/:orderId',
      handler: 'order.findByOrderId',
      config: {
        auth: false, // Public access for email confirmation links
        policies: [],
        middlewares: [],
      },
      info: {
        type: 'content-api',
      },
    },
  ],
};
