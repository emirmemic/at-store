import { CONTACT_PHONE } from '../../../utils/constants';
import { contactInfoBlock } from '../../../utils/contact-email-template';

const strapiUrl = process.env.PUBLIC_URL || 'http://localhost:1337';
const careersEmail = process.env.CAREERS_EMAIL || 'posao@atstore.ba';
const defaultFrom = process.env.DEFAULT_FROM || 'no-reply@atstore.ba';
const companyWebsite = 'https://atstore.ba';

interface MediaFile {
  url: string;
  name: string;
  mime: string;
}

interface JobApplication {
  documentId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  jobTitle?: string;
  jobDepartment?: string;
  jobLocation?: string;
  applyPage?: string;
  cv?: MediaFile | null;
}

const getCvLink = (cv?: MediaFile | null) =>
  cv ? `${strapiUrl}${cv.url}` : 'Nije priložen';

export const sendEmailToAdmin = async (application: JobApplication) => {
  const {
    documentId,
    fullName = 'Nepoznato',
    email = 'Nije navedeno',
    phone = 'Nije navedeno',
    message = 'Kandidat nije ostavio poruku.',
    jobTitle = 'Nepozicija',
    jobDepartment = 'Nije navedeno',
    jobLocation = 'Nije navedeno',
    applyPage = 'Nije dostupno',
    cv,
  } = application;

  const cvLink = getCvLink(cv);
  const adminEntryUrl = documentId
    ? `${strapiUrl}/admin/content-manager/collection-types/api::job-application.job-application/${documentId}`
    : strapiUrl;

  try {
    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: careersEmail,
        from: defaultFrom,
        subject: `🧑‍💼 Nova prijava za posao – ${jobTitle} (${fullName})`,
        text: `
Nova prijava za posao
====================

Detalji pozicije:
- Pozicija: ${jobTitle}
- Odjel: ${jobDepartment}
- Lokacija: ${jobLocation}
- Stranica prijave: ${applyPage}

Podaci kandidata:
- Ime i prezime: ${fullName}
- Email: ${email}
- Telefon: ${phone}

Poruka kandidata:
${message || 'Kandidat nije ostavio poruku.'}

CV: ${cvLink}

Otvori prijavu:
${adminEntryUrl}
        `.trim(),
        html: `
          <h2>🧑‍💼 Nova prijava za posao</h2>
          <p>Primili ste novu prijavu putem AT Store web stranice.</p>

          <h3>Detalji pozicije</h3>
          <ul>
            <li><strong>Pozicija:</strong> ${jobTitle}</li>
            <li><strong>Odjel:</strong> ${jobDepartment}</li>
            <li><strong>Lokacija:</strong> ${jobLocation}</li>
            <li><strong>Stranica prijave:</strong> <a href="${applyPage}" target="_blank" rel="noopener noreferrer">${applyPage}</a></li>
          </ul>

          <h3>Podaci kandidata</h3>
          <ul>
            <li><strong>Ime i prezime:</strong> ${fullName}</li>
            <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
            <li><strong>Telefon:</strong> ${phone}</li>
          </ul>

          <h3>Poruka kandidata</h3>
          <p>${message || 'Kandidat nije ostavio poruku.'}</p>

          <h3>CV</h3>
          <p>
            ${
              cv
                ? `<a href="${cvLink}" target="_blank" rel="noopener noreferrer">📎 Preuzmi CV (${cv.name})</a>`
                : 'Kandidat nije priložio CV.'
            }
          </p>

          <p style="margin-top: 1rem;">
            <a href="${adminEntryUrl}" target="_blank" rel="noopener noreferrer">Otvorite prijavu u Strapi administraciji</a>
          </p>

          <p style="margin-top: 1.5rem;">Lijep pozdrav,<br/><strong>AT Store Web - powered by AT Soft</strong></p>
        `.trim(),
      });
  } catch (error) {
    strapi.log.error(
      '❌ Greška prilikom slanja emaila administratoru za prijavu za posao:',
      error
    );
  }
};

export const sendEmailToApplicant = async (application: JobApplication) => {
  const {
    fullName = 'Poštovani kandidat',
    email,
    jobTitle = 'odabranu poziciju',
  } = application;

  if (!email) {
    return;
  }

  try {
    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: email,
        from: defaultFrom,
        subject: 'Prijava za posao je zaprimljena – AT Store',
        text: `
Poštovani/a ${fullName},

Hvala vam na prijavi za poziciju ${jobTitle} u AT Store.

Vaša prijava je uspješno zaprimljena. Naš tim će pregledati dostavljene informacije i kontaktirati vas ukoliko vaš profil odgovara poziciji.

 Ukoliko imate dodatna pitanja, pišite nam na posao@atstore.ba ili nas pozovite na ${CONTACT_PHONE}.

Srdačan pozdrav,
AT Store
Mono Apple Authorised Reseller
${companyWebsite}
        `.trim(),
        html: `
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;margin:0 auto;font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;color:#111827;background-color:#f9fafb;border-radius:18px;border:1px solid #e5e7eb;overflow:hidden;">
            <tr>
              <td style="padding:32px 36px;">
                <h2 style="margin:0 0 16px;font-size:22px;font-weight:600;">Hvala na prijavi!</h2>
                <p style="margin:0 0 12px;">Poštovani/a <strong>${fullName}</strong>,</p>
                <p style="margin:0 0 12px;">
                  Hvala vam što ste se prijavili za poziciju <strong>${jobTitle}</strong> u AT Store.
                  Vaša prijava je uspješno zaprimljena i proslijeđena našem HR timu.
                </p>
                <p style="margin:0 0 12px;">
                  Ukoliko vaš profil odgovara zahtjevima pozicije, kontaktiraćemo vas u najkraćem mogućem roku.
                </p>

                <p style="margin:24px 0 12px;font-weight:600;">Šta možete očekivati?</p>
                <ul style="margin:0 0 16px 18px;padding:0;">
                  <li style="margin-bottom:8px;">Potvrdu o prijemu ste upravo dobili – hvala na povjerenju.</li>
                  <li style="margin-bottom:8px;">Naš tim pregledava sve prijave pažljivo i javlja se kandidatima koji ulaze u uži izbor.</li>
                  <li style="margin-bottom:8px;">Ako imate dodatne materijale ili pitanja, slobodno nam se javite.</li>
                </ul>

                <div style="margin-top:20px;">
                  ${contactInfoBlock()}
                </div>

                <p style="margin:28px 0 6px;font-weight:600;">Srdačan pozdrav,</p>
                <p style="margin:0;font-size:15px;font-weight:700;">AT Store Tim</p>
                <p style="margin:4px 0 0;font-size:13px;color:#6b7280;">Mono Apple Authorised Reseller</p>
                <p style="margin:2px 0 0;font-size:13px;">
                  <a href="${companyWebsite}" style="color:#368bf4;text-decoration:none;">${companyWebsite.replace('https://', '')}</a>
                </p>
              </td>
            </tr>
          </table>
        `.trim(),
      });
  } catch (error) {
    strapi.log.error(
      '❌ Greška prilikom slanja emaila kandidatu za prijavu za posao:',
      error
    );
  }
};
