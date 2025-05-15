/**
 * newsletter controller
 */
import { v4 as uuidv4 } from 'uuid';
import { factories } from '@strapi/strapi';
import { sendSubscribedEmail, sendUnsubscribedEmail } from '../utils/sendEmail';

export default factories.createCoreController(
  'api::newsletter.newsletter',
  ({ strapi }) => ({
    async subscribe(ctx) {
      const { email, name } = ctx.request.body;

      if (!email) {
        return ctx.badRequest('Email is required.');
      }

      const normalizedEmail = email.toLowerCase().trim();

      // ✅ Try to find a matching user
      const existingUser = await strapi.db
        .query('plugin::users-permissions.user')
        .findOne({
          where: { email: normalizedEmail },
        });

      // Check for existing subscriber
      const existing = await strapi.db
        .query('api::newsletter.newsletter')
        .findOne({
          where: { email: normalizedEmail },
        });

      if (existing) {
        if (existing.subscribed) {
          return ctx.badRequest(
            'This email is already subscribed to the newsletter.'
          );
        } else {
          // Unsubscribed → resubscribe

          const updated = await strapi
            .documents('api::newsletter.newsletter')
            .update({
              documentId: existing.documentId,
              data: {
                subscribed: true,
                subscribedAt: new Date(),
                unsubscribedAt: null,
                token: uuidv4(),
                ...(existingUser && {
                  users_permissions_user: existingUser.id,
                }),
              },
            });

          await sendSubscribedEmail({
            name: updated.name,
            email: updated.email,
            token: updated.token,
          });

          return ctx.send({
            message: 'Successfully resubscribed.',
            data: formatReturnedData(updated),
          });
        }
      }

      // Brand new subscriber → create
      const entry = await strapi
        .documents('api::newsletter.newsletter')
        .create({
          data: {
            email: normalizedEmail,
            name,
            token: uuidv4(),
            subscribed: true,
            subscribedAt: new Date(),
            publishedAt: new Date(),
            ...(existingUser && { users_permissions_user: existingUser.id }),
          },
        });

      await sendSubscribedEmail({
        name: entry.name,
        email: entry.email,
        token: entry.token,
      });

      return ctx.send({
        message: 'Successfully subscribed.',
        data: formatReturnedData(entry),
      });
    },

    async unsubscribe(ctx) {
      const { token } = ctx.request.body;

      if (!token) {
        return ctx.badRequest('Token is required.');
      }
      try {
        // Find subscriber by token
        const subscriber = await strapi.db
          .query('api::newsletter.newsletter')
          .findOne({
            where: { token },
          });

        if (!subscriber) {
          return ctx.notFound('Subscriber not found.');
        }

        // Mark subscriber as unsubscribed
        const updated = await strapi
          .documents('api::newsletter.newsletter')
          .update({
            documentId: subscriber.documentId,
            data: {
              subscribed: false,
              unsubscribedAt: new Date(),
              token: uuidv4(),
              ...(subscriber.users_permissions_user && {
                users_permissions_user: subscriber.users_permissions_user,
              }),
            },
          });

        // ✅ Send unsubscribe email
        await sendUnsubscribedEmail({
          name: updated.name,
          email: updated.email,
        });
        return ctx.send({
          message: 'Successfully unsubscribed.',
          data: formatReturnedData(updated),
        });
      } catch (error) {
        strapi.log.error('Error in unsubscribe:', error);
        return ctx.internalServerError(
          'An error occurred while unsubscribing.'
        );
      }
    },
    async toggleSubscription(ctx) {
      const { user } = ctx.state;
      if (!user) {
        return ctx.unauthorized('Please log in to access this resource.');
      }

      // Try to find existing newsletter record
      let subscriber = await strapi.db
        .query('api::newsletter.newsletter')
        .findOne({
          where: { users_permissions_user: user.id },
        });

      // If no record exists, create a new one (assume subscription is being turned ON)
      if (!subscriber) {
        const userData = await strapi.db
          .query('plugin::users-permissions.user')
          .findOne({
            where: { id: user.id },
          });

        const newEntry = await strapi
          .documents('api::newsletter.newsletter')
          .create({
            data: {
              email: userData.email,
              name: userData.username || userData.name || '',
              subscribed: true,
              subscribedAt: new Date(),
              token: uuidv4(),
              publishedAt: new Date(),
              users_permissions_user: user.id,
            },
          });

        await sendSubscribedEmail({
          name: newEntry.name,
          email: newEntry.email,
          token: newEntry.token,
        });

        return ctx.send({
          message: 'Successfully subscribed.',
          data: formatReturnedData(newEntry),
        });
      }

      // Toggle the subscription status
      const newSubscribedStatus = !subscriber.subscribed;
      const subscribedAt = newSubscribedStatus ? new Date() : null;
      const unsubscribedAt = newSubscribedStatus ? null : new Date();

      const newData = {
        subscribed: newSubscribedStatus,
        subscribedAt,
        unsubscribedAt,
        token: uuidv4(),
        users_permissions_user: subscriber.users_permissions_user,
      };

      const updated = await strapi
        .documents('api::newsletter.newsletter')
        .update({
          documentId: subscriber.documentId,
          data: newData,
        });

      // Send email based on new status
      if (newSubscribedStatus) {
        await sendSubscribedEmail({
          name: updated.name,
          email: updated.email,
          token: updated.token,
        });
      } else {
        await sendUnsubscribedEmail({
          name: updated.name,
          email: updated.email,
        });
      }

      return ctx.send({
        message: `Successfully ${newSubscribedStatus ? 'subscribed' : 'unsubscribed'}.`,
        data: formatReturnedData(updated),
      });
    },
  })
);

const formatReturnedData = (data) => {
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    subscribedAt: data.subscribedAt,
    unsubscribedAt: data.unsubscribedAt,
  };
};
