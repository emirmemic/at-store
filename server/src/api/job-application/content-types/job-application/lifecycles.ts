import { sendEmailToAdmin, sendEmailToApplicant } from '../../utils/sendEmail';

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    if (!result?.documentId) {
      return;
    }

    try {
      const jobApplication = await strapi
        .documents('api::job-application.job-application')
        .findFirst({
          where: { documentId: result.documentId },
          populate: { cv: true },
        });

      if (!jobApplication) {
        return;
      }

      await Promise.all([
        sendEmailToAdmin(jobApplication),
        sendEmailToApplicant(jobApplication),
      ]);
    } catch (error) {
      strapi.log.error(
        '❌ Greška prilikom slanja email obavijesti za prijavu za posao:',
        error
      );
    }
  },
};
