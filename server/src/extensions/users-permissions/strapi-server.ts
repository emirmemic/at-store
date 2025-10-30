'use strict';

import {
  accountDetailsSchema,
  authenticatedUserSchema,
  organizationUserSchema,
} from '../../../types/schemas/auth';

import { ZodError } from 'zod';
import { errors } from '@strapi/utils';
import { generateClientSecret } from './utils';
import jwt from 'jsonwebtoken';

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

  const sanitizeUser = async (user, ctx) => {
    const userSchema = strapi.getModel('plugin::users-permissions.user');
    const authState = ctx.state?.auth;
    return strapi.contentAPI.sanitize.output(user, userSchema, {
      auth: authState,
    });
  };

  const { ApplicationError, ValidationError } = errors;

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

        const isOrganization = body.role === 'organization';

        let validatedPayload;
        try {
          validatedPayload = isOrganization
            ? organizationUserSchema.parse(body)
            : authenticatedUserSchema.parse(body);
        } catch (validationError) {
          return ctx.badRequest('Greška pri validaciji', {
            errors: validationError.errors,
          });
        }

        const {
          confirmPassword,
          addressLabel,
          city,
          postalCode,
          country,
          ...userData
        } = validatedPayload;

        const pluginStore = await strapi.store({
          type: 'plugin',
          name: 'users-permissions',
        });
        const advancedSettings = await pluginStore.get({ key: 'advanced' });

        if (!advancedSettings.allow_register) {
          throw new ApplicationError('Register action is currently disabled');
        }

        const defaultRole = await strapi.db
          .query('plugin::users-permissions.role')
          .findOne({ where: { type: advancedSettings.default_role } });

        if (!defaultRole) {
          throw new ApplicationError('Impossible to find the default role');
        }

        const organizationRole = isOrganization
          ? await strapi.db
              .query('plugin::users-permissions.role')
              .findOne({ where: { type: 'organization' } })
          : null;

        const roleId = organizationRole?.id ?? defaultRole.id;

        const email = userData.email.trim().toLowerCase();
        const username = email;

        const existingUser = await strapi.db
          .query('plugin::users-permissions.user')
          .findOne({
            where: {
              $or: [{ email }, { username }],
            },
          });

        if (existingUser) {
          throw new ApplicationError('Email or Username are already taken');
        }

        const userPayload = {
          email,
          username,
          password: userData.password,
          name: userData.name,
          surname: userData.surname,
          phoneNumber: userData.phoneNumber,
          address: userData.address.trim(),
          provider: 'local',
          role: roleId,
          confirmed: !advancedSettings.email_confirmation,
          blocked: false,
          ...(isOrganization && {
            companyName: userData.companyName,
            companyIdNumber: userData.companyIdNumber,
          }),
        };

        const userService = strapi.plugin('users-permissions').service('user');
        let createdUser;

        try {
          createdUser = await userService.add(userPayload);
        } catch (error) {
          strapi.log.error('Failed to create user during registration', error);
          throw new ApplicationError('Greška pri kreiranju korisnika');
        }

        const labelValue = addressLabel?.trim() || 'Primarna adresa';
        const addressValue = userData.address.trim();
        const cityValue = city?.trim() || '';
        const postalCodeValue = postalCode?.trim() || '';
        const countryValue = country?.trim() || '';

        try {
          await strapi.documents('api::user-address.user-address').create({
            data: {
              label: labelValue,
              address: addressValue,
              city: cityValue,
              postalCode: postalCodeValue,
              country: countryValue,
              isDefault: true,
              user: createdUser.id,
            },
          });

          await strapi.db.query('plugin::users-permissions.user').update({
            where: { id: createdUser.id },
            data: { address: addressValue },
          });
        } catch (error) {
          strapi.log.error('Failed to create default address for user', error);
          await strapi.db
            .query('plugin::users-permissions.user')
            .delete({ where: { id: createdUser.id } });
          throw new ApplicationError('Greška pri kreiranju adrese korisnika');
        }

        const populatedUser = await strapi.db
          .query('plugin::users-permissions.user')
          .findOne({
            where: { id: createdUser.id },
            populate: ['addresses'],
          });

        const sanitizedUser = await sanitizeUser(populatedUser, ctx);

        if (advancedSettings.email_confirmation) {
          try {
            await userService.sendConfirmationEmail(sanitizedUser);
          } catch (error) {
            strapi.log.error('Failed to send confirmation email', error);
            throw error;
          }

          return ctx.send({ user: sanitizedUser });
        }

        const jwtService = strapi.plugin('users-permissions').service('jwt');
        const jwtToken = jwtService.issue({ id: createdUser.id });

        return ctx.send({
          jwt: jwtToken,
          user: sanitizedUser,
        });
      } catch (error) {
        if (error instanceof ZodError) {
          return ctx.badRequest('Greška pri validaciji', {
            errors: error.errors,
          });
        }

        if (
          error instanceof ApplicationError ||
          error instanceof ValidationError
        ) {
          return ctx.badRequest(error.message);
        }

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
<!DOCTYPE html>
<html lang="bs">
  <head>
    <meta charset="UTF-8" />
    <title>AT Store – Registracija</title>
    <style>
      @media (prefers-color-scheme: dark) {
        .footer-legal {
          color: #ffffff !important;
        }
      }

      @media (prefers-color-scheme: light) {
        .footer-legal {
          color: #111111 !important;
        }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background-color:#1a1a23;font-family:Arial,sans-serif;color:#ffffff;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#1a1a23">
      <tr>
        <td align="center">
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#333333;color:#ffffff;">
            <tr>
              <td style="padding:20px;text-align:right;font-size:14px;color:#b3b3b3;">AT Store</td>
            </tr>
            <tr>
              <td style="border-top:1px solid #555555;border-bottom:1px solid #555555;padding:20px;text-align:left;font-size:15px;line-height:1.6;">
                <p style="margin:0 0 16px 0;">Poštovani,</p>
                <p style="margin:0 0 16px 0;">
                  Vaša registracija je uspješno završena.<br />
                  Sada možete započeti kupovinu, dodati u korpu artikle koje želite i automatski ćete dobiti predračun na osnovu kojeg izvršavate uplatu.<br />
                  Kada uplata bude evidentirana na našem računu, dobit ćete obavijest putem e-maila i potvrdu od strane B2B odjela da je narudžba spremna za preuzimanje ili slanje na Vašu adresu.<br />
                  Kompanija AT Store zadržava pravo da produži ili skrati rok isporuke naručenih uređaja u skladu sa trenutačnim stanjem.
                </p>
                <p style="margin:0;">Srdačan pozdrav,<br />AT Store – B2B tim</p>
              </td>
            </tr>
          </table>
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="margin-top:20px;color:#ffffff;">
            <tr>
              <td style="padding:20px;text-align:center;font-size:14px;line-height:1.6;">
                <p style="margin:0;font-size:13px;color:#b3b3b3;">AT Store B2B Sales Department</p>
                <p style="margin:0;font-size:13px;color:#b3b3b3;">AT Store - Mono Apple Authorised Reseller</p>
                <p class="footer-legal" style="margin:0;font-size:12px;color:#111111;">TM and © 2025 AT Store Inc.</p>
                <p style="margin:10px 0 0 0;font-size:10px;color:#b3b3b3;">
                  Sarajevo, 71000, Fra Anđela Zvizdovića 1, Franca Lehara 2, Vrbanja 1 - Banja Luka, 78000, Bulevar srpske vojske 8, Bosna i Hercegovina.
                  <a href="https://atstore.ba" style="color:#4da6ff;text-decoration:none;">www.atstore.ba</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
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

      try {
        const populatedUser = await strapi
          .documents('plugin::users-permissions.user')
          .findOne({
            documentId: user.documentId,
            populate: ctx.query?.populate,
          });

        return populatedUser ?? user;
      } catch (error) {
        strapi.log.error('Failed to fetch user with relations', error);
        return ctx.badRequest('Greška pri dohvaćanju korisnika');
      }
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
