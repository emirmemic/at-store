export default ({ env }) => ({
  "users-permissions": {
    config: {
      secure: env("NODE_ENV") === "production",
      expiresIn: "7d",
      jwtSecret: env("JWT_SECRET"),
      register: {
        allowedFields: [
          "email",
          "password",
          "name",
          "surname",
          "address",
          "phoneNumber",
          "dateOfBirth",
          "companyName",
          "companyIdNumber",
          "role",
        ],
      },
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
      },
      "x-strapi-config": {
        plugins: ["upload", "users-permissions"],
        path: "/documentation",
      },
    },
  },
});
