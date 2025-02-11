export default ({ env }) => ({
  "users-permissions": {
    jwt: {
      expiresIn: "7d",
      secure: process.env.NODE_ENV === "production",
    },
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
