/**
 * payment-method controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::payment-method.payment-method",
  ({ strapi }) => ({
    async delete(ctx) {
      const { id: documentId } = ctx.params;
      console.log("Document ID:", documentId);

      const paymentMethod = await strapi
        .documents("api::payment-method.payment-method")
        .findOne({
          status: "published",
          documentId: documentId,
        });

      // paymentMethod is not found
      if (!paymentMethod) {
        return ctx.notFound("Payment method not found");
      }

      await strapi.documents("api::payment-method.payment-method").delete({
        documentId: documentId,
      });

      return ctx.send({ message: "Payment method deleted successfully" }, 200);
    },
    // This is a custom action to toggle the default payment method
    // It will be called when the user clicks on the default button
    // It will set the default payment method to the one clicked and unset the others
    async toggleDefault(ctx) {
      const { paymentMethodId } = ctx.params;
      const { user } = ctx.state;

      // Find the payment method to be set as default
      const paymentMethod = await strapi
        .documents("api::payment-method.payment-method")
        .findOne({
          status: "published",
          documentId: paymentMethodId,
        });

      // paymentMethod is not found
      if (!paymentMethod) {
        return ctx.notFound("Payment method not found");
      }

      // Set the default payment method to the one clicked and unset the others
      const allPaymentMethods = await strapi
        .documents("api::payment-method.payment-method")
        .findMany({ status: "published", filters: { user: user.id } });

      await Promise.all(
        allPaymentMethods
          .filter(
            (pm) => pm.isDefault === true && pm.documentId !== paymentMethodId
          )
          .map((pm) =>
            strapi.documents("api::payment-method.payment-method").update({
              documentId: pm.documentId,
              data: { isDefault: false },
            })
          )
      );

      // Set the isDefault flag for the selected payment method
      await strapi.documents("api::payment-method.payment-method").update({
        documentId: paymentMethodId,
        data: { isDefault: true },
      });

      return ctx.send({ message: "Payment method updated successfully" }, 200);
    },
  })
);
