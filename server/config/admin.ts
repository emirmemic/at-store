export default ({ env }) => ({
  auth: {
    secret: env("ADMIN_JWT_SECRET"),
    options: {
      expiresIn: "7d",
    },
  },
  apiToken: {
    salt: env("API_TOKEN_SALT"),
  },
  transfer: {
    token: {
      salt: env("TRANSFER_TOKEN_SALT"),
    },
  },
  flags: {
    nps: false,
    promoteEE: false,
  },
});
