const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
export const sendSubscribedEmail = async ({
  email,
  name,
  token,
}: {
  email: string;
  name: string;
  token: string;
}) => {
  const unsubscribeUrl = `${frontendUrl}/newsletter/unsubscribe?token=${token}`;

  try {
    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: email,
        from: process.env.DEFAULT_FROM,
        subject: 'Hvala što ste se pretplatili na naš newsletter!',
        text: `U bilo kojem trenutku se možete odjaviti putem ovog linka: ${unsubscribeUrl}`,
        html: `
          <p>Poštovani ${name},</p>
          <p>Hvala što ste se pretplatili na naš newsletter!</p>
          <p>Ako se ikada poželite odjaviti, kliknite na link ispod:</p>
          <p><a href="${unsubscribeUrl}">Odjavi se</a></p>
        `,
      });
  } catch (error) {
    strapi.log.error('❌ Greška prilikom slanja newsletter emaila:', error);
  }
};
export const sendUnsubscribedEmail = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  const subscribeUrl = `${frontendUrl}/newsletter`;

  try {
    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: email,
        from: process.env.DEFAULT_FROM,
        subject: 'Žao nam je što se odjavljujete od našeg newslettera',
        text: `Ako se ikada poželite ponovo pretplatiti, kliknite na ovaj link: ${subscribeUrl}`,
        html: `
          <p>Poštovani ${name},</p>
          <p>Žao nam je što se odjavljujete od našeg newslettera</p>
          <p>Ako se ikada poželite ponovo pretplatiti, kliknite na link ispod:</p>
          <p><a href="${subscribeUrl}">Ponovo se pretplati</a></p>
        `,
      });
  } catch (error) {
    strapi.log.error('❌ Greška prilikom slanja newsletter emaila:', error);
  }
};
