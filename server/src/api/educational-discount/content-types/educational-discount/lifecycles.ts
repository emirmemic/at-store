import { sendEmailToAdmin, sendEmailToUser } from '../../utils/sendEmail';

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    if (result?.documentId) {
      const fullResult = await strapi
        .documents('api::educational-discount.educational-discount')
        .findFirst({
          where: { documentId: result.documentId },
          populate: {
            indexPhoto: true,
          },
        });

      await Promise.all([
        sendEmailToAdmin(fullResult),
        sendEmailToUser(fullResult),
      ]);
    }
  },
};
