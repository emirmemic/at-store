export default ({ env }) => ({
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
      // providers: {
      //   google: {
      //     enabled: true,
      //     clientId: env("GOOGLE_CLIENT_ID"),
      //     clientSecret: env("GOOGLE_CLIENT_SECRET"),
      //     redirectUri: env("GOOGLE_REDIRECT_URI"),
      //   },
      // },
    },
  },
});
