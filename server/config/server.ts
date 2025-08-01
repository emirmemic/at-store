export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url:
    env('NODE_ENV') === 'production'
      ? env('PUBLIC_URL')
      : 'http://localhost:1337/',
  proxy: {
    koa: true,
  },
  app: {
    keys: env.array('APP_KEYS'),
  },
});
