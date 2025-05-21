module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/organization-pre-invoices/create-from-cart',
      handler: 'organization-pre-invoice.createFromCart',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
