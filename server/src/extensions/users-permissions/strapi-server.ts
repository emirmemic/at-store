'use strict';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';

import {
  accountDetailsSchema,
  authenticatedUserSchema,
  organizationUserSchema,
} from '../../../types/schemas/auth';
import { generateClientSecret } from './utils';

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
        state: 'force_email', // Force email request
      });

      // Construct the authorization URL with query parameters
      const queryString = params.toString();
      const appleAuthUrl = `${APPLE_AUTH_URL}?${queryString}`;
      console.log('Redirecting to Apple authorization URL:', appleAuthUrl);
      // Redirect the user to Apple's authorization URL
      return ctx.redirect(appleAuthUrl);
    },
    // Callback handler after Apple redirects back
    appleCallback: async (ctx) => {
      // 1) Get the authorization code from the callback request
      console.log('Apple callback received:', ctx.request.body);

      const body = ctx.request.body;
      if (!body) {
        return ctx.badRequest('No code provided');
      }

      const { code, user: appleUserData } = body;
      console.log('Apple user data from form_post:', appleUserData);

      // Parse Apple user data if provided (first sign-in only)
      let appleUserInfo = null;
      if (appleUserData) {
        try {
          appleUserInfo = JSON.parse(appleUserData);
          console.log('Parsed Apple user info:', appleUserInfo);
        } catch (e) {
          console.log('Failed to parse Apple user data:', e);
        }
      }
      let user;
      try {
        const tokenRes = await fetch('https://appleid.apple.com/auth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
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
        console.log('Apple token exchange response:', tokenJson);

        if (tokenJson.error) {
          strapi.log.error('Apple token exchange failed:', {
            error: tokenJson.error,
          });

          return ctx.badRequest('Apple token exchange failed', {
            error: tokenJson,
          });
        }

        // 4) Decode the ID token to get user info
        const idToken = tokenJson?.id_token;
        strapi.log.info('Apple ID token received:', {
          idToken,
        });
        console.log('Apple id token received:', idToken);

        const decoded: any = jwt.decode(idToken, { complete: true });
        console.log('Decoded Apple ID token:', decoded);

        strapi.log.info('Decoded Apple ID token:', {
          decoded,
        });

        const appleEmail = decoded?.payload?.email;
        const appleSub = decoded?.payload?.sub; // Apple's unique user identifier

        // 5) Find or create the Strapi user
        // First, try to find user by Apple sub (for repeat sign-ins)
        user = await strapi
          .documents('plugin::users-permissions.user')
          .findOne({
            filters: { appleSub: appleSub },
          });

        // If no user found by sub and we have email (first sign-in), look by email
        if (!user && appleEmail) {
          user = await strapi
            .documents('plugin::users-permissions.user')
            .findOne({
              filters: { email: appleEmail },
            });
        }

        // If still no user found, check if we have email to create new user
        if (!user && !appleEmail) {
          return ctx.badRequest(
            'No email received from Apple. This may be a repeat sign-in but no existing user found.'
          );
        }
        if (!user) {
          user = await strapi
            .documents('plugin::users-permissions.user')
            .create({
              data: {
                email: appleEmail,
                provider: 'apple',
                username: appleEmail,
                confirmed: true, // Apple users are automatically confirmed
                name: decoded?.payload?.name || appleEmail,
                appleSub: appleSub, // Store Apple's unique identifier
              },
            });
        } else if (!user.appleSub) {
          // Update existing user with Apple sub for future sign-ins
          user = await strapi
            .documents('plugin::users-permissions.user')
            .update({
              documentId: user.documentId,
              data: {
                appleSub: appleSub,
              },
            });
        }
      } catch (error) {
        strapi.log.error('Apple callback error:', { error });
        return ctx.badRequest('Greška pri obradi Apple sign-in', {
          message: error.message,
        });
      }
      // 6) Issue a JWT for the user (Strapi users-permissions service)
      const jwtToken = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id,
      });

      // 7) Respond with the JWT and user info
      return ctx.send({
        jwt: jwtToken,
      });
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
