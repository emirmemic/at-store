export default ({ env }) => ({
  "users-permissions": {
    config: {
      secure: env.NODE_ENV === "production",
      expiresIn: "7d",
      jwtSecret: env("JWT_SECRET"),
    },
  },
  documentation: {
    enabled: true,
    config: {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "DOCUMENTATION",
        description: "",
        // Other configuration options...
      },
      "x-strapi-config": {
        plugins: ["upload", "users-permissions"],
        path: "/documentation",
      },
      // More configuration options...
    },
  },
});
