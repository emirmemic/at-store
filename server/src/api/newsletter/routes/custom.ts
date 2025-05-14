export default {
  routes: [
    {
      method: 'POST',
      path: '/newsletter/subscribe',
      handler: 'api::newsletter.newsletter.subscribe',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/newsletter/unsubscribe',
      handler: 'api::newsletter.newsletter.unsubscribe',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
