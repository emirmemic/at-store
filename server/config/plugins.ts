export default ({ env }) => ({
  "users-permissions": {
    config: {
      secure: env.NODE_ENV === "production",
      expiresIn: "7d",
      jwtSecret: env("JWT_SECRET"),
    },
  },
});
