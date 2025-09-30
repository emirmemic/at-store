'use strict';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';

import {
  accountDetailsSchema,
  authenticatedUserSchema,
  organizationUserSchema,
} from '../../../types/schemas/auth';
import { generateClientSecret } from './utils';

const FRONTEND_REDIRECT_URI = `${process.env.FRONTEND_URL}/connect/apple/redirect`;
const APPLE_REDIRECT_URI =
  'https://admin.atstore.ba/api/users-permissions/connect/apple/callback';
const APPLE_AUTH_URL = 'https://appleid.apple.com/auth/authorize';

export default (plugin) => {
  // Apple sign in routes
  plugin.routes['content-api'].routes.push(
    {
      method: 'GET',
      path: '/connect/apple',
      handler: 'auth.appleConnect',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/connect/apple/callback',
      handler: 'auth.appleCallback',
      config: { auth: false },
    }
  );

  const rawAuth = plugin.controllers.auth({ strapi });
  const rawUser = plugin.controllers.user;

  const extendedAuth = ({ strapi }) => ({
    ...rawAuth,
    // Handler to redirect user to Apple's authorization URL
    appleConnect: async (ctx) => {
      const params = new URLSearchParams({
        client_id: process.env.APPLE_SERVICE_ID,
        redirect_uri: APPLE_REDIRECT_URI,
        response_type: 'code',
        response_mode: 'form_post',
        scope: 'name email',
      });

      // Construct the authorization URL with query parameters
      const queryString = params.toString();
      const appleAuthUrl = `${APPLE_AUTH_URL}?${queryString}`;
      // Redirect the user to Apple's authorization URL
      return ctx.redirect(appleAuthUrl);
    },
    // Callback handler after Apple redirects back
    appleCallback: async (ctx) => {
      // 1) Get the authorization code from the callback request
      const body = ctx.request.body;
      if (!body) {
        return ctx.badRequest('No code provided');
      }
      const { code, user: appleUserData, accessToken } = body;

      // Parse Apple user data if provided (first sign-in only)
      let appleUserInfo = null;
      if (appleUserData) {
        try {
          appleUserInfo =
            typeof appleUserData === 'string'
              ? JSON.parse(appleUserData)
              : appleUserData;
        } catch (error) {
          console.warn('Failed to parse Apple user data:', error);
          appleUserInfo = null;
        }
      }
      const { firstName: name, lastName: surname } = appleUserInfo?.name || {};

      if (code) {
        const params = new URLSearchParams({
          access_token: code,
          name: name,
          surname: surname,
        });
        const queryString = params.toString();
        const frontendRedirect = `${FRONTEND_REDIRECT_URI}?${queryString}`;
        return ctx.redirect(frontendRedirect);
      } else if (accessToken) {
        let user;
        try {
          const tokenRes = await fetch('https://appleid.apple.com/auth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: accessToken,
              redirect_uri: APPLE_REDIRECT_URI,
              client_id: process.env.APPLE_SERVICE_ID,
              client_secret: generateClientSecret(),
            }),
          });
          const tokenJson = (await tokenRes.json()) as {
            id_token?: string;
            access_token?: string;
            error?: string;
          };

          console.log('tokenJson', tokenJson);

          if (tokenJson.error) {
            strapi.log.error('Apple token exchange failed:', tokenJson.error);

            return ctx.badRequest('Apple token exchange failed', {
              error: tokenJson.error,
            });
          }

          // 4) Decode the ID token to get user info
          const idToken = tokenJson?.id_token;

          const decoded: any = jwt.decode(idToken, { complete: true });
          const appleSub = decoded?.payload?.sub; // Apple's unique user identifier
          const email = decoded?.payload?.email;

          // 5) Find or create the Strapi user
          // First, try to find user by Apple sub (for repeat sign-ins)
          user = await strapi
            .documents('plugin::users-permissions.user')
            .findFirst({
              filters: { appleSub: appleSub },
            });

          // If no user found by sub and we have email (first sign-in), look by email
          if (!user && email) {
            const userWithEmail = await strapi
              .documents('plugin::users-permissions.user')
              .findFirst({
                filters: { email: email },
              });
            if (userWithEmail) {
              return ctx.badRequest('Email already exists');
            }
          }

          // If still no user found, check if we have email to create new user
          if (!user && !email) {
            return ctx.badRequest(
              'No email received from Apple. This may be a repeat sign-in but no existing user found.'
            );
          }
          if (!user) {
            const role = await strapi
              .documents('plugin::users-permissions.role')
              .findFirst({ filters: { type: 'authenticated' } });
            console.log(role);

            user = await strapi
              .documents('plugin::users-permissions.user')
              .create({
                data: {
                  email: email,
                  provider: 'apple',
                  username: email,
                  confirmed: true, // Apple users are automatically confirmed
                  name: name || email,
                  surname: surname || email,
                  phoneNumber: '0000000000',
                  appleSub: appleSub, // Store Apple's unique identifier
                  role: role?.id || null,
                },
              });
          }
        } catch (error) {
          strapi.log.error('Apple callback error:', error);
          return ctx.badRequest('Greška pri obradi Apple sign-in', {
            message: error,
          });
        }
        // 6) Issue a JWT for the user (Strapi users-permissions service)
        const jwtToken = strapi.plugins['users-permissions'].services.jwt.issue(
          {
            id: user.id,
          }
        );

        ctx.set(
          'set-cookie',
          `jwt=${jwtToken}; Path=/; HttpOnly; Secure; SameSite=lax`
        );
        ctx.body = {
          success: true,
          jwt: jwtToken,
        };

        return ctx.body;
      }

      return ctx.badRequest('No code or access token provided');
    },
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
            await strapi.db.query('plugin::users-permissions.user').update({
              where: { id: user.id },
              data: { confirmedByAdmin: true },
            });

            const messageText = `Poštovani,
Vaša registracija je uspješno završena.
Sada možete započeti kupovinu, dodati u korpu artikle koje želite i automatski ćete dobiti predračun na osnovu kojeg izvršavate uplatu.
Kada uplata bude evidentirana na našem računu, dobit ćete obavijest putem e-maila i potvrdu od strane B2B odjela da je narudžba spremna za preuzimanje ili slanje na Vašu adresu.
Kompanija AT Store zadržava pravo da produži ili skrati rok isporuke naručenih uređaja u skladu sa trenutačnim stanjem.
Srdačan pozdrav,
AT Store – B2B tim`;
            const messageHtml = `
              <p>Poštovani,</p>
              <p>Vaša registracija je uspješno završena.</p>
              <p>Sada možete započeti kupovinu, dodati u korpu artikle koje želite i automatski ćete dobiti predračun na osnovu kojeg izvršavate uplatu.</p>
              <p>Kada uplata bude evidentirana na našem računu, dobit ćete obavijest putem e-maila i potvrdu od strane B2B odjela da je narudžba spremna za preuzimanje ili slanje na Vašu adresu.</p>
              <p>Kompanija AT Store zadržava pravo da produži ili skrati rok isporuke naručenih uređaja u skladu sa trenutačnim stanjem.</p>
              <p>Srdačan pozdrav,</p>
              <p>AT Store – B2B tim</p>
            `;

            await strapi.plugin('email').service('email').send({
              to: user.email,
              from: process.env.DEFAULT_FROM,
              subject: 'Registracija uspješno završena',
              text: messageText,
              html: messageHtml,
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
