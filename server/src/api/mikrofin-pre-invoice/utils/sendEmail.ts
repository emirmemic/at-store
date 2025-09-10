import { CURRENCY } from '../../../utils/constants';
import { StrapiProduct } from '../../product/types';

const strapiUrl = process.env.PUBLIC_URL || 'http://localhost:1337';
const adminEmail = process.env.MIKROFIN_EMAIL || '';

interface Result {
  nameAndSurname: string;
  email: string;
  phoneNumber: string;
  productVariantId: string;
  note?: string;
  documentId: string;
}

const makeTextForProduct = (product: StrapiProduct | undefined) => {
  if (!product) {
    return 'Proizvod nije pronađen, šifra artikla nije ispravna.';
  }
  return [
    `Ime proizvoda: ${product.name}`,
    `Šifra proizvoda: ${product.productVariantId}`,
    `Cijena: ${product.originalPrice} ${CURRENCY}`,
  ].join('\n');
};
const makeHtmlForProduct = (product: StrapiProduct | undefined) => {
  if (!product) {
    return 'Proizvod nije pronađen, šifra artikla nije ispravna.';
  }
  return `
    Ime proizvoda: ${product.name}<br>
    Šifra artikla: ${product.productVariantId}<br>
    Cijena: ${product.originalPrice} ${CURRENCY}
  `;
};

export const sendEmailToAdmin = async (
  result: Result,
  product: StrapiProduct | undefined
) => {
  const {
    nameAndSurname,
    email,
    phoneNumber,
    productVariantId,
    note,
    documentId,
  } = result;

  try {
    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: adminEmail,
        from: process.env.DEFAULT_FROM,
        subject: `🆕 Novi zahtjev za Mikrofin predračun – ${nameAndSurname}`,

        /* ---------------- PLAIN-TEXT ---------------- */
        text: `
        Poštovani,

        Primljen je novi zahtjev za Mikrofin predračun.

        Detalji:
        • Ime i prezime: ${nameAndSurname}
        • Email: ${email}
        • Telefon: ${phoneNumber}
        • Napomena: ${note ?? '-'}
        • Proizvod: ${makeTextForProduct(product)}

        Da biste obradili zahtjev, otvorite Mikrofin predračun sekciju u administratorskoj konzoli:
        ${strapiUrl}/admin/content-manager/collection-types/api::mikrofin-pre-invoice.mikrofin-pre-invoice/${documentId}

        Hvala!
        `.trim(),

        /* ----------------  HTML  ------------------- */
        html: `
          <h2>Novi zahtjev za Mikrofin predračun</h2>

          <p>Primili ste novi zahtjev za Mikrofin predračun. Molimo da ga obradite u
          <span style="white-space:nowrap;">admin&nbsp;konzoli.</span></p>

          <ul>
            <li><strong>Ime i prezime:</strong> ${nameAndSurname}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Telefon:</strong> ${phoneNumber}</li>
            <li><strong>Napomena:</strong> ${note ?? '-'}</li>
            <li><strong>Proizvod:</strong> ${makeHtmlForProduct(product)}</li>
          </ul>

          <p style="margin-top:1rem;">
            <a href="${strapiUrl}/admin/content-manager/collection-types/api::mikrofin-pre-invoice.mikrofin-pre-invoice/${documentId}" target="_blank">
              ➡️ Otvori zahtjev u admin konzoli
            </a>
          </p>

          <p>Hvala!</p>
        `.trim(),
      });
  } catch (error) {
    strapi.log.error('❌ Greška prilikom slanja Mikrofin e-maila:', error);
  }
};
export const sendEmailToUser = async (
  result: Result,
  product: StrapiProduct | undefined
) => {
  const { nameAndSurname, email, phoneNumber, productVariantId, note } = result;

  try {
    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: email,
        from: process.env.DEFAULT_FROM,
        subject: 'Vaš zahtjev za Mikrofin predračun je zaprimljen',
        text: `
          Poštovani/Poštovana ${nameAndSurname},

          Hvala Vam na interesovanju za Mikrofin proizvode!
          Vaš zahtjev za predračun je zaprimljen, a predračun će Vam stići ubrzo putem ovog e-maila.

          Pregled Vašeg zahtjeva
          ----------------------
          Ime i prezime: ${nameAndSurname}
          E-mail:        ${email}
          Telefon:       ${phoneNumber}
          Napomena:      ${note ?? '-'}
          Proizvod:      ${makeTextForProduct(product)}


         Ako ste slučajno unijeli pogrešne podatke ili imate dodatna pitanja, pošaljite nam e-mail na prodaja@atstore.ba ili nas pozovite.

          Srdačan pozdrav,
          AT Store
        `,
        html: `
          <h2 style="margin-bottom:0.5rem">Vaš zahtjev za Mikrofin predračun</h2>
          <p>Poštovani/Poštovana <strong>${nameAndSurname}</strong>,</p>

          <p>Hvala Vam na interesovanju za Mikrofin proizvode! Zaprimili smo Vaš zahtjev,
          a <strong>predračun će Vam stići ubrzo</strong> putem ovog e-maila.</p>

          <h3 style="margin-bottom:0.3rem">Pregled Vašeg zahtjeva</h3>
          <ul style="padding-left:1rem">
            <li><strong>Ime i prezime:</strong> ${nameAndSurname}</li>
            <li><strong>E-mail:</strong> ${email}</li>
            <li><strong>Telefon:</strong> ${phoneNumber}</li>
            <li><strong>Napomena:</strong> ${note ?? '-'}</li>
            <li><strong>Proizvod:</strong> ${makeHtmlForProduct(product)}</li>
          </ul>

          <p style="margin-top:1rem">
          Ako ste slučajno unijeli pogrešne podatke ili imate dodatna pitanja, pošaljite nam e-mail na prodaja@atstore.ba ili nas pozovite.
          </p>

          <p style="margin-top:1.5rem">
          Srdačan pozdrav,<br/>
          <strong>AT Store</strong>
          </p>
        `,
      });
  } catch (error) {
    strapi.log.error('❌ Greška prilikom slanja AT Store e-maila:', error);
  }
};
