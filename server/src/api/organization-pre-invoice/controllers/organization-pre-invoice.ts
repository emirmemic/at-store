/**
 * organization-pre-invoice controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::organization-pre-invoice.organization-pre-invoice',
  ({ strapi }) => ({
    async createFromCart(ctx) {
      try {
        const user = ctx.state.user;
        const { fileId, invoiceNumber, totalPrice } = ctx.request.body;
        if (!user) return ctx.unauthorized('User not authenticated');
        ctx.body = await strapi
          .service('api::organization-pre-invoice.organization-pre-invoice')
          .createPreInvoiceFromCart(user, fileId, invoiceNumber, totalPrice);
      } catch (err) {
        strapi.log.error('Error creating pre-invoice from cart:', err);
        ctx.internalServerError('Server error');
      }
    },
  })
);
