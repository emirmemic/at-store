import { factories } from '@strapi/strapi';
import { StrapiUser } from '../../../../types/user';
import { sendEmailToAdmin, sendEmailToUser } from '../utils/sendEmail';

const publicUrl = process.env.PUBLIC_URL || 'http://localhost:1337';
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
        // 1. Fetch user's cart, with items and product populated
        const cart = await strapi.db.query('api::cart.cart').findOne({
          where: { user: user.id },
          populate: {
            items: {
              populate: { product: true },
            },
          },
        });

        if (!cart || !cart.items || cart.items.length === 0) {
          throw new Error('Cart is empty');
        }

        // 2. Create pre-invoice with the cart items
        const items = cart.items.map((item) => ({
          product: item.product.documentId,
          quantity: item.quantity,
        }));
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
          throw new Error('Failed to create pre-invoice');
        }
        // 3. Fetch the PDF file
        const foundPdf = await strapi.db.query('plugin::upload.file').findOne({
          where: { id: fileId },
          populate: { formats: true },
        });
        if (!foundPdf) {
          throw new Error('PDF file not found');
        }
        const pdfUrl = `${publicUrl}${foundPdf.url}`;

        // 4. Send email to user and admin
        const isSuccessful = await sendEmailToUser({
          user,
          pdfUrl,
          invoiceNumber,
        });

        await sendEmailToAdmin({
          user,
          invoiceDocumentId: preInvoice.documentId,
          invoiceNumber,
        });
        if (isSuccessful) {
          // Update the pre-invoice to mark email as sent
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
