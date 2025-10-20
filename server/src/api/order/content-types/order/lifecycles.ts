import {
  notifyCustomerAboutOrderCancellation,
  notifyCustomerAboutOrderCompletion,
} from '../../utils';

import { ORDER_POPULATE_CONFIG } from '../../constants';
import type { OrderPopulated } from '../../types';

module.exports = {
  async beforeUpdate(event) {
    const nextStatus = event?.params?.data?.orderStatus;

    if (nextStatus === undefined) {
      return;
    }

    const documentId =
      event?.params?.where?.documentId ||
      event?.params?.where?.id ||
      event?.params?.data?.documentId;

    if (!documentId) {
      return;
    }

    try {
      const existingOrder = await strapi.documents('api::order.order').findOne({
        documentId,
      });

      if (existingOrder) {
        event.state = event.state || {};
        event.state.previousOrderStatus = existingOrder.orderStatus;
      }
    } catch (error) {
      strapi.log.error(
        '❌ Greška prilikom dohvaćanja narudžbe prije ažuriranja statusa:',
        error
      );
    }
  },

  async afterUpdate(event) {
    const updatedStatus = event?.params?.data?.orderStatus;

    if (!updatedStatus) {
      return;
    }

    const documentId = event?.result?.documentId;

    if (!documentId) {
      return;
    }

    try {
      const order = await strapi.documents('api::order.order').findOne({
        documentId,
        populate: ORDER_POPULATE_CONFIG as any,
      });

      const typedOrder = order as unknown as OrderPopulated;

      if (!typedOrder?.address?.email) {
        return;
      }

      const previousStatus = event.state?.previousOrderStatus;

      if (updatedStatus === 'completed' && previousStatus !== 'completed') {
        await notifyCustomerAboutOrderCompletion(typedOrder);
      }

      if (updatedStatus === 'canceled' && previousStatus !== 'canceled') {
        await notifyCustomerAboutOrderCancellation(typedOrder);
      }
    } catch (error) {
      strapi.log.error(
        '❌ Greška prilikom slanja email obavijesti o promjeni statusa narudžbe:',
        error
      );
    }
  },
};
