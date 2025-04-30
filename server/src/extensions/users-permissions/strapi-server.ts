"use strict";

import {
  authenticatedUserSchema,
  organizationUserSchema,
} from "../../api/schemas/auth";

export default (plugin) => {
  const rawAuth = plugin.controllers.auth({ strapi });

  const extendedAuth = ({ strapi }) => ({
    ...rawAuth,
    register: async (ctx) => {
      try {
        const { body } = ctx.request;

        if (!body) {
          return ctx.badRequest("Tijelo zahtjeva je obavezno");
        }

        // Determine user type and validate accordingly
        const isOrganization = body.role === "organization";

        try {
          isOrganization
            ? organizationUserSchema.parse(body)
            : authenticatedUserSchema.parse(body);
        } catch (validationError) {
          return ctx.badRequest("Greška pri validaciji", {
            errors: validationError.errors,
          });
        }

        // Call the original register function
        const response = await rawAuth.register(ctx);
        if (isOrganization) {
          const organizationRole = await strapi.db
            .query("plugin::users-permissions.role")
            .findOne({ where: { type: "organization" } });
          const { email } = ctx.request.body;

          if (organizationRole) {
            // Update the user's role to the organization role
            await strapi.db.query("plugin::users-permissions.user").update({
              where: { email },
              data: { role: organizationRole.id },
            });
          }
        }

        return response;
      } catch (error) {
        ctx.throw(400, error);
      }
    },
    callback: async (ctx) => {
      try {
        // Check if user exists and is an organization
        const { identifier } = ctx.request.body;

        const user = await strapi
          .query("plugin::users-permissions.user")
          .findOne({
            where: { email: identifier },
            populate: ["role"],
          });

        if (
          user &&
          user.role?.type === "organization" &&
          !user.confirmedByAdmin
        ) {
          return ctx.badRequest("Vaš račun čeka odobrenje administratora");
        }

        return await rawAuth.callback(ctx);
      } catch (error) {
        ctx.throw(400, error);
      }
    },
    emailConfirmation: async (ctx) => {
      // Extract the confirmation token from the URL
      const confirmation = ctx.originalUrl.split("?confirmation=")[1];

      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { confirmation_token: confirmation },
          populate: ["role"],
        });

      // Call the original confirmation handler
      await rawAuth.emailConfirmation(ctx);
      if (user) {
        try {
          // Check if this is an organization user
          const isOrganization = user.role?.type === "organization";

          if (isOrganization) {
            // Send email to admin for approval
            await strapi
              .plugin("email")
              .service("email")
              .send({
                to: process.env.ADMIN_EMAIL,
                from: process.env.DEFAULT_FROM,
                subject: "Nova Registracija Organizacije Zahtijeva Odobrenje",
                text: "Nova organizacija se registrirana i zahtijeva vaše odobrenje.",
                html: `
                <p>Nova organizacija se registrirana i zahtijeva odobrenje:</p>
                <p>Firma: ${user.companyName}</p>
                <p>Email: ${user.email}</p>
                <p>Molimo pregledajte i odobrite ovu organizaciju u administratorskom panelu.</p>
                `,
              });
          }
        } catch (error) {
          ctx.throw(400, error);
        }
      }
    },
  });

  plugin.controllers.auth = extendedAuth;
  return plugin;
};
