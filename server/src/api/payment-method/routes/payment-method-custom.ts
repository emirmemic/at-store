export default {
  routes: [
    {
      method: 'PUT',
      path: '/payment-methods/:paymentMethodId/isDefault',
      handler: 'api::payment-method.payment-method.toggleDefault',
      config: {
        middlewares: ['global::is-owner'],
      },
    },
  ],
};
