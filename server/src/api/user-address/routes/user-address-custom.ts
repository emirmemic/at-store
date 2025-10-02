export default {
  routes: [
    {
      method: 'POST',
      path: '/user-addresses/:id/set-default',
      handler: 'api::user-address.user-address.setDefault',
    },
  ],
};
