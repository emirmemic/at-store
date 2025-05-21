import { StrapiUser } from '../../../../types/user';

const adminEmail = process.env.ADMIN_EMAIL || 'business@atstore.ba';
const defaultFrom = process.env.DEFAULT_FROM || 'no-reply@atstore.ba';
const strapiUrl = process.env.PUBLIC_URL || 'http://localhost:1337';

export const sendEmailToUser = async ({
  user,
  pdfUrl,
  invoiceNumber,
}: {
  user: StrapiUser;
  pdfUrl: string;
  invoiceNumber: string;
}) => {
  try {
    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: user.email,
        from: defaultFrom,
        subject: 'Vaš predračun je kreiran – AT Store',

        text: `
          Poštovani/Poštovana ${user.username},

          Hvala Vam na korištenju naše usluge.

          Vaš predračun broj ${invoiceNumber} je uspješno kreiran i nalazi se u prilogu ovog e-maila.

          Kako biste nastavili sa kupovinom, molimo Vas da izvršite uplatu prema podacima iz predračuna. 
          Nakon što izvršite uplatu, pošaljite potvrdu o uplati na našu e-mail adresu: ${adminEmail}

          Ukoliko imate bilo kakvih pitanja ili Vam je potrebna pomoć, slobodno nas kontaktirajte.

          Srdačan pozdrav,  
          AT Store tim
        `.trim(),

        html: `
        <h2>Vaš predračun je kreiran</h2>
        <p>Poštovani/Poštovana <strong>${user.username}</strong>,</p>

        <p>Hvala Vam na korištenju naše usluge. Vaš predračun broj <strong>${invoiceNumber}</strong> je uspješno kreiran i nalazi se u prilogu ovog e-maila.</p>

        <p>Molimo Vas da izvršite uplatu prema podacima iz predračuna. Nakon uplate, <strong>pošaljite potvrdu o uplati</strong> na:</p>
        <p><a href="mailto:${adminEmail}">${adminEmail}</a></p>

        <p>Ukoliko imate bilo kakvih pitanja, slobodno nas kontaktirajte.</p>

        <p>Srdačan pozdrav,<br/><strong>AT Store tim</strong></p>
      `,
        attachments: [
          {
            filename: `predracun-${invoiceNumber}.pdf`,
            path: pdfUrl,
          },
        ],
      });
    return true;
  } catch (error) {
    strapi.log.error(
      '❌ Greška prilikom slanja e-maila korisniku (predračun):',
      error
    );
  }
};

export const sendEmailToAdmin = async ({
  user,
  invoiceDocumentId,
  invoiceNumber,
}: {
  user: StrapiUser;
  invoiceDocumentId: string;
  invoiceNumber: string;
}) => {
  try {
    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: adminEmail,
        from: defaultFrom,
        subject: `📥 Novi organizacijski predračun – ${user.username}`,

        text: `
        Poštovani,

        Korisnik ${user.username} (${user.email}) je kreirao novi organizacijski predračun.

        Broj predračuna: ${invoiceNumber}

        Za više informacija otvorite administratorsku konzolu:
        ${strapiUrl}/admin/content-manager/collection-types/api::organization-pre-invoice.organization-pre-invoice/${invoiceDocumentId}

        Hvala!
      `.trim(),

        html: `
        <h2>Novi organizacijski predračun</h2>

        <p>Korisnik <strong>${user.username}</strong> (<a href="mailto:${user.email}">${user.email}</a>) je kreirao novi organizacijski predračun.</p>

        <p><strong>Broj predračuna:</strong> ${invoiceNumber}</p>

        <p>
          <a href="${strapiUrl}/admin/content-manager/collection-types/api::organization-pre-invoice.organization-pre-invoice/${invoiceDocumentId}" target="_blank">
            ➡️ Otvori predračun u admin konzoli
          </a>
        </p>

        <p>Hvala!</p>
      `,
      });
  } catch (error) {
    strapi.log.error(
      '❌ Greška prilikom slanja e-maila administratoru (predračun):',
      error
    );
  }
};
