export default {
  routes: [
    {
      method: 'POST',
      path: '/job-applications',
      handler: 'api::job-application.job-application.create',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};
