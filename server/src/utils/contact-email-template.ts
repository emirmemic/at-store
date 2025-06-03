import { CONTACT_EMAIL, CONTACT_PHONE } from './constants';

export const contactInfoBlock = () => {
  return `
    <div style="margin-top: 24px; color:#888; font-size:13px;">
    Ukoliko imate dodatna pitanja, slobodno nas kontaktirajte.<br>
    Email: <a href="mailto:${CONTACT_EMAIL}" style="color:#368bf4; text-decoration:none;">${CONTACT_EMAIL}</a><br>
    Telefon: <a href="tel:${CONTACT_PHONE}" style="color:#368bf4; text-decoration:none;">${CONTACT_PHONE}</a><br>
  </div>
  `;
};

export const contactInfoText = () => {
  return `
    Ukoliko imate dodatna pitanja, slobodno nas kontaktirajte.
    Email: ${CONTACT_EMAIL}
    Telefon: ${CONTACT_PHONE}
  `;
};
