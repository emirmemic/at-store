'use strict';
import { ZodError } from 'zod';

import {
  accountDetailsSchema,
  authenticatedUserSchema,
  organizationUserSchema,
} from '../../../types/schemas/auth';

export default (plugin) => {
  const rawAuth = plugin.controllers.auth({ strapi });
  const rawUser = plugin.controllers.user;

  const extendedAuth = ({ strapi }) => ({
    ...rawAuth,
    register: async (ctx) => {
      try {
        const { body } = ctx.request;

        if (!body) {
          return ctx.badRequest('Tijelo zahtjeva je obavezno');
        }

        // Determine user type and validate accordingly
        const isOrganization = body.role === 'organization';

        try {
          isOrganization
            ? organizationUserSchema.parse(body)
            : authenticatedUserSchema.parse(body);
        } catch (validationError) {
          return ctx.badRequest('Greška pri validaciji', {
            errors: validationError.errors,
          });
        }

        // Call the original register function
        const response = await rawAuth.register(ctx);
        if (isOrganization) {
          const organizationRole = await strapi.db
            .query('plugin::users-permissions.role')
            .findOne({ where: { type: 'organization' } });
          const { email } = ctx.request.body;

          if (organizationRole) {
            // Update the user's role to the organization role
            await strapi.db.query('plugin::users-permissions.user').update({
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
          .query('plugin::users-permissions.user')
          .findOne({
            where: { email: identifier },
            populate: ['role'],
          });

        // If the user is an organization and not confirmed by admin, return a custom error
        // Otherwise, proceed with the original callback
        if (
          user &&
          user.role?.type === 'organization' &&
          !user.confirmedByAdmin &&
          user.confirmed
        ) {
          return ctx.badRequest('Vaš račun čeka odobrenje administratora');
        }

        return await rawAuth.callback(ctx);
      } catch (error) {
        ctx.throw(400, error);
      }
    },
    emailConfirmation: async (ctx) => {
      // Extract the confirmation token from the URL
      const confirmation = ctx.originalUrl.split('?confirmation=')[1];

      const user = await strapi.db
        .query('plugin::users-permissions.user')
        .findOne({
          where: { confirmation_token: confirmation },
          populate: ['role'],
        });

      // Call the original confirmation handler
      await rawAuth.emailConfirmation(ctx);
      if (user) {
        try {
          // Check if this is an organization user
          const isOrganization = user.role?.type === 'organization';

          if (isOrganization) {
            // Send email to admin for approval
            await strapi
              .plugin('email')
              .service('email')
              .send({
                to: process.env.ADMIN_EMAIL,
                from: process.env.DEFAULT_FROM,
                subject: 'Nova Registracija Organizacije Zahtijeva Odobrenje',
                text: 'Nova organizacija se registrirana i zahtijeva vaše odobrenje.',
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
  const extendedUser = ({ strapi }) => ({
    ...rawUser,
    find: async (ctx) => {
      const { user } = ctx.state;

      if (!user) {
        return ctx.unauthorized('Niste autorizirani za ovu akciju');
      }

      return user;
    },
    update: async (ctx) => {
      const { user } = ctx.state;
      const { id } = ctx.params;
      const data = ctx.request.body;

      if (!user || Number(user.id) !== Number(id)) {
        return ctx.unauthorized('Niste autorizirani za ovu akciju');
      }

      try {
        accountDetailsSchema(user.role.type).parse(data);

        const updatedUser = await strapi
          .documents('plugin::users-permissions.user')
          .update({
            documentId: user.documentId,
            data: {
              ...user,
              ...data,
            },
          });

        return updatedUser;
      } catch (error) {
        if (error instanceof ZodError) {
          return ctx.badRequest('Greška pri validaciji', {
            errors: error.errors,
          });
        } else if (error.details?.errors) {
          // Handle Strapi validation errors
          return ctx.badRequest('Greška pri validaciji', {
            errors: error.details.errors,
          });
        } else {
          return ctx.badRequest('Greška pri ažuriranju korisnika', {
            message: error.message,
          });
        }
      }
    },
  });

  plugin.controllers.user = extendedUser;
  plugin.controllers.auth = extendedAuth;
  return plugin;
};
