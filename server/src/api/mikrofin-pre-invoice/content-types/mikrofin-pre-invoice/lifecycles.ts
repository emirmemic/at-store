import { sendEmailToAdmin, sendEmailToUser } from '../../utils/sendEmail';

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    if (result) {
      // 1. Find the product by variantId
      const product = await strapi.db.query('api::product.product').findOne({
        where: { productVariantId: result.productVariantId },
      });

      if (product) {
        await strapi.db
          .query('api::mikrofin-pre-invoice.mikrofin-pre-invoice')
          .update({
            where: { id: result.id },
            data: { product: product.id },
          });
      }
      await Promise.all([
        sendEmailToAdmin(result, product),
        sendEmailToUser(result, product),
      ]);
    }
  },
};
