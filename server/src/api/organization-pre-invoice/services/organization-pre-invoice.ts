import { factories } from '@strapi/strapi';
import { StrapiUser } from '../../../../types/user';
import { sendEmailToAdmin, sendEmailToUser } from '../utils/sendEmail';

const publicUrl = process.env.PUBLIC_URL || 'http://localhost:1337';

const timeout = (ms: number) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Email timeout')), ms)
  );

export default factories.createCoreService(
  'api::organization-pre-invoice.organization-pre-invoice',
  () => ({
    createPreInvoiceFromCart: async (
      user: StrapiUser,
      fileId: string,
      invoiceNumber: string,
      totalPrice: number
    ) => {
      try {
        // 1. Fetch user's cart
        strapi.log.info(
          `Fetching cart for user: ${user.id}, username: ${user.username}`
        );
        const cart = await strapi.db.query('api::cart.cart').findOne({
          where: { user: user.id },
          populate: {
            items: {
              populate: { product: true },
            },
          },
        });

        if (!cart || !cart.items || cart.items.length === 0) {
          strapi.log.warn(
            `Cart not found or empty for user: ${user.id}, username: ${user.username}`
          );
          throw new Error('Cart is empty or not found for the user');
        }
        strapi.log.info(
          `Cart found for user: ${user.id}, items count: ${cart.items.length}`
        );
        // 2. Create pre-invoice
        const items = cart.items.map((item) => ({
          product: item.product.documentId,
          quantity: item.quantity,
        }));

        strapi.log.info(
          `Creating pre-invoice for user: ${user.id}, invoice number: ${invoiceNumber}`
        );
        const preInvoice = await strapi
          .documents('api::organization-pre-invoice.organization-pre-invoice')
          .create({
            data: {
              title: `Predračun - ${user.username}`,
              invoiceNumber: invoiceNumber,
              invoiceStatus: 'pending',
              user: user.id,
              items: items,
              pdfFile: fileId,
              totalAmount: totalPrice,
            },
          });
        if (!preInvoice) {
          strapi.log.error(
            `Failed to create pre-invoice for user: ${user.id}, username: ${user.username}`
          );
          throw new Error('Failed to create pre-invoice');
        }

        strapi.log.info(
          `Pre-invoice created for user: ${user.id}, pre-invoice ID: ${preInvoice.id}`
        );
        // 3. Fetch PDF
        const foundPdf = await strapi.db.query('plugin::upload.file').findOne({
          where: { id: fileId },
          populate: { formats: true },
        });

        if (!foundPdf) {
          strapi.log.error(
            `PDF file not found for user: ${user.id}, username: ${user.username}`
          );
          throw new Error('PDF file not found');
        }

        const pdfUrl = `${publicUrl}${foundPdf.url}`;

        // 4. Send emails with timeout
        let userEmailSent = false;
        let adminEmailSent = false;
        strapi.log.info(
          `Sending emails for pre-invoice ID: ${preInvoice.id}, user: ${user.id}`
        );
        try {
          const userResult = await Promise.race([
            sendEmailToUser({ user, pdfUrl, invoiceNumber }),
            timeout(5000),
          ]);
          strapi.log.info(
            `Email sent to user: ${user.id}, username: ${user.username}`
          );
          userEmailSent = userResult === true;
        } catch (emailError) {
          strapi.log.error(
            `Failed or timed out sending email to user: ${user.id}, username: ${user.username}`,
            emailError
          );
        }

        try {
          const response = await Promise.race([
            sendEmailToAdmin({
              user,
              invoiceDocumentId: preInvoice.documentId,
              invoiceNumber,
              userEmailSent,
            }),
            timeout(5000),
          ]);
          strapi.log.info(
            `Email sent to admin for pre-invoice ID: ${preInvoice.id}`
          );
          adminEmailSent = true;
        } catch (adminEmailError) {
          strapi.log.error(
            `Failed or timed out sending email to admin for pre-invoice ID: ${preInvoice.id}`,
            adminEmailError
          );
        }

        // 5. Update invoice if user email sent
        if (userEmailSent) {
          strapi.log.info(
            `User email sent successfully for pre-invoice ID, update invoice status to emailSent: ${preInvoice.id}`
          );
          const updated = await strapi.db
            .query('api::organization-pre-invoice.organization-pre-invoice')
            .update({
              where: { id: preInvoice.id },
              data: {
                emailSent: true,
              },
            });

          return {
            ...updated,
            pdfFile: foundPdf,
          };
        }

        // 5. Return the created pre-invoice
        return {
          ...preInvoice,
          pdfFile: foundPdf,
        };
      } catch (error) {
        console.error('Error creating pre-invoice from cart:', error);
        throw error;
      }
    },
  })
);
