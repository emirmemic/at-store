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
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env("SMTP_PORT"),
        secure: env.bool("SMTP_SECURE"),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      settings: {
        defaultFrom: env("DEFAULT_FROM"),
        defaultReplyTo: env("DEFAULT_REPLY_TO"),
      },
    },
  },
});
