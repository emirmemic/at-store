export default ({ env }) => ({
  "users-permissions": {
    config: {
      secure: process.env.NODE_ENV === "production",
      expiresIn: "7d",
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
