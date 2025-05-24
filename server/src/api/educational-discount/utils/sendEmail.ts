const strapiUrl = process.env.PUBLIC_URL || 'http://localhost:1337';
const educationalDiscountEmail = process.env.EDUCATIONAL_DISCOUNT_EMAIL || '';
const defaultFrom = process.env.DEFAULT_FROM || 'no-reply@atstore.ba';

interface MediaFile {
  url: string;
  name: string;
  mime: string;
}

interface Result {
  documentId?: string;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  email?: string;
  indexPhoto?: MediaFile;
}

export const sendEmailToAdmin = async (result: Result) => {
  const { name, surname, email, phoneNumber, indexPhoto, documentId } = result;

  try {
    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: educationalDiscountEmail,
        from: defaultFrom,
        subject: `🧑‍🎓 Novi zahtjev za obrazovni popust – ${name} ${surname}`,

        text: `
          Poštovani,

          Primljen je novi zahtjev za obrazovni popust.

          Detalji:
          • Ime i prezime: ${name} ${surname}
          • Email: ${email}
          • Telefon: ${phoneNumber}

          Priloženi dokument:
          • Fotografija indeksa: ${indexPhoto ? strapiUrl + indexPhoto.url : 'Nije poslano'}

          Otvorite zahtjev u administratorskoj konzoli:
          ${strapiUrl}/admin/content-manager/collection-types/api::educational-discount.educational-discount/${documentId}

          Hvala!
        `.trim(),

        html: `
        <h2>🧑‍🎓 Novi zahtjev za obrazovni popust</h2>
        <p>Primljen je novi zahtjev za obrazovni popust putem web forme.</p>

        <h3>Detalji</h3>
        <ul>
          <li><strong>Ime i prezime:</strong> ${name} ${surname}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Telefon:</strong> ${phoneNumber}</li>
        </ul>

        <h3>Priloženi dokument</h3>
        <ul>
          <li>
            ${
              indexPhoto
                ? `<a href="${strapiUrl + indexPhoto.url}" target="_blank">📄 ${indexPhoto.name}</a>`
                : 'Nije poslano'
            }
          </li>
        </ul>

        <p style="margin-top:1rem;">
        <a href="${strapiUrl}/admin/content-manager/collection-types/api::educational-discount.educational-discount/${documentId}" target="_blank">
        ➡️ Otvori zahtjev u admin konzoli
        </a>
        </p>

        <p>Hvala!<br/><strong>AT Store sistem</strong></p>
        `.trim(),
      });
  } catch (error) {
    strapi.log.error(
      '❌ Greška prilikom slanja e-maila administratoru (obrazovni popust):',
      error
    );
  }
};

export const sendEmailToUser = async (result: Result) => {
  const { name, surname, email, phoneNumber } = result;

  try {
    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: email,
        from: defaultFrom,
        subject: 'Vaš zahtjev za obrazovni popust je zaprimljen – AT Store',
        text: `
      Poštovani/Poštovana ${name} ${surname},

      Zahvaljujemo Vam se na interesovanju za obrazovni popust.

      Vaš zahtjev je uspješno zaprimljen i biće uskoro obrađen. Nakon validacije podataka, kontaktiraćemo Vas putem e-maila.

      Pregled Vašeg zahtjeva:
      • Ime i prezime: ${name} ${surname}
      • Email: ${email}
      • Telefon: ${phoneNumber}

      Ukoliko imate dodatna pitanja, kontaktirajte nas na ${educationalDiscountEmail}.

      Srdačan pozdrav,
      AT Store tim
        `.trim(),

        html: `
        <h2 style="margin-bottom:0.5rem">Vaš zahtjev za obrazovni popust</h2>
        <p>Poštovani/Poštovana <strong>${name} ${surname}</strong>,</p>

        <p>Zahvaljujemo se što ste nam se obratili. Vaš zahtjev za obrazovni popust je uspješno zaprimljen i trenutno je u obradi.</p>

        <h3 style="margin-bottom:0.3rem">Pregled Vašeg zahtjeva</h3>
        <ul style="padding-left:1rem">
          <li><strong>Ime i prezime:</strong> ${name} ${surname}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Telefon:</strong> ${phoneNumber}</li>
        </ul>

        <p style="margin-top:1rem">
        Nakon validacije dostavljenih podataka, bićete kontaktirani putem e-maila.<br/>
        Za dodatna pitanja, javite nam se na 
        <a href="mailto:${educationalDiscountEmail}">${educationalDiscountEmail}</a>.
        </p>

        <p style="margin-top:1.5rem">
        Srdačan pozdrav,<br/>
        <strong>AT Store tim</strong>
        </p>
        `.trim(),
      });
  } catch (error) {
    strapi.log.error(
      '❌ Greška prilikom slanja e-maila korisniku (obrazovni popust):',
      error
    );
  }
};
