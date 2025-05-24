import { sendEmailToAdmin, sendEmailToUser } from '../../utils/sendEmail';

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    if (result?.documentId) {
      const fullComplaint = await strapi
        .documents('api::complaint.complaint')
        .findFirst({
          where: { documentId: result.documentId },
          populate: {
            deviceImage: true,
            warrantyImage: true,
            billImage: true,
          },
        });

      await Promise.all([
        sendEmailToAdmin(fullComplaint),
        sendEmailToUser(fullComplaint),
      ]);
    }
  },
};
