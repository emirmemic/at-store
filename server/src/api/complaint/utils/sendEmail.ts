const strapiUrl = process.env.PUBLIC_URL || 'http://localhost:1337';
const complaintsEmail = process.env.COMPLAINTS_EMAIL || '';
const defaultFrom = process.env.DEFAULT_FROM || 'no-reply@atstore.ba';
const complaintsPhone = '+387 33 956 188';

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
  message?: string;
  deviceImage?: MediaFile;
  warrantyImage?: MediaFile;
  billImage?: MediaFile;
}

export const sendEmailToAdmin = async (result: Result) => {
  const {
    name,
    surname,
    email,
    phoneNumber,
    message,
    deviceImage,
    warrantyImage,
    billImage,
    documentId,
  } = result;
  try {
    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: complaintsEmail,
        from: defaultFrom,
        subject: `🆕 Novi zahtjev za reklamaciju – ${name} ${surname}`,

        text: `
        Poštovani,

        Primljen je novi zahtjev za reklamaciju.

        Detalji:
        • Ime i prezime: ${name} ${surname}
        • Email: ${email}
        • Telefon: ${phoneNumber}
        • Poruka: ${message}

        Linkovi na slike:
        • Slika uređaja: ${deviceImage ? strapiUrl + deviceImage.url : 'Nije poslano'}
        • Slika garancije: ${warrantyImage ? strapiUrl + warrantyImage.url : 'Nije poslano'}
        • Slika računa: ${billImage ? strapiUrl + billImage.url : 'Nije poslano'}

        Pregledajte zahtjev u administratorskoj konzoli:
        ${strapiUrl}/admin/content-manager/collection-types/api::complaint.complaint

        Hvala!
          `.trim(),

        html: `
        <h2>🛠 Novi zahtjev za reklamaciju</h2>
        <p>Primljen je novi zahtjev za reklamaciju uređaja. Molimo da ga što prije pregledate u admin konzoli.</p>

        <h3>Detalji</h3>
        <ul>
        <li><strong>Ime i prezime:</strong> ${name} ${surname}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Telefon:</strong> ${phoneNumber}</li>
        <li><strong>Poruka:</strong> ${message}</li>
        </ul>

        <h3>Priložene slike</h3>
        <ul>
        <li>
          ${
            deviceImage
              ? `<a href="${strapiUrl + deviceImage.url}" target="_blank">📷 ${deviceImage.name}</a>`
              : 'Nije poslano'
          }
        </li>
        <li>
          ${
            warrantyImage
              ? `<a href="${strapiUrl + warrantyImage.url}" target="_blank">📄 ${warrantyImage.name}</a>`
              : 'Nije poslano'
          }
        </li>
        <li>
          ${
            billImage
              ? `<a href="${strapiUrl + billImage.url}" target="_blank">🧾 ${billImage.name}</a>`
              : 'Nije poslano'
          }
        </li>
        </ul>

        <p style="margin-top:1rem;">
        <a href="${strapiUrl}/admin/content-manager/collection-types/api::complaint.complaint/${documentId}" target="_blank">
        ➡️ Otvori zahtjev u admin konzoli
        </a>
        </p>

      <p>Hvala!<br/><strong>AT Store sistem</strong></p>
      `.trim(),
      });
  } catch (error) {
    strapi.log.error(
      '❌ Greška prilikom slanja e-maila administratoru (reklamacija):',
      error
    );
  }
};

export const sendEmailToUser = async (result: Result) => {
  const { name, surname, email, phoneNumber, message } = result;

  try {
    await strapi
      .plugin('email')
      .service('email')
      .send({
        to: email,
        from: defaultFrom,
        subject: 'Vaš zahtjev za reklamaciju je zaprimljen – AT Store',
        text: `
          Poštovani/Poštovana ${name} ${surname},

          Vaš zahtjev za reklamaciju je uspješno zaprimljen i trenutno je u obradi.

          Pregled Vašeg zahtjeva
          ----------------------
          Ime i prezime: ${name} ${surname}
          E-mail:        ${email}
          Telefon:       ${phoneNumber}
          Poruka:        ${message}

          Ako imate dodatna pitanja ili želite izmijeniti informacije, kontaktirajte nas putem e-maila na reklamacije@atstore.ba ili pozivom na +387 33 956 188.

          Srdačan pozdrav,
          AT Store tim
                  `.trim(),
        html: `
          <h2 style="margin-bottom:0.5rem">Vaš zahtjev za reklamaciju</h2>
          <p>Poštovani/Poštovana <strong>${name} ${surname}</strong>,</p>

          <p>Zahvaljujemo se što ste nam se obratili. Vaš zahtjev za reklamaciju je uspješno zaprimljen i trenutno je u obradi.</p>

          <h3 style="margin-bottom:0.3rem">Detalji zahtjeva</h3>
          <ul style="padding-left:1rem">
            <li><strong>Ime i prezime:</strong> ${name} ${surname}</li>
            <li><strong>E-mail:</strong> ${email}</li>
            <li><strong>Telefon:</strong> ${phoneNumber}</li>
            <li><strong>Poruka:</strong> ${message}</li>
          </ul>

          <p style="margin-top:1rem">
          Ako imate dodatna pitanja ili želite izmijeniti informacije, kontaktirajte nas putem e-maila na 
          <a href="mailto:${complaintsEmail}">${complaintsEmail}</a> ili pozivom na
          <a href="tel:${complaintsPhone}">${complaintsPhone}</a>.
          </p>

          <p style="margin-top:1.5rem">
          Srdačan pozdrav,<br/>
          <strong>AT Store tim</strong>
          </p>
        `.trim(),
      });
  } catch (error) {
    strapi.log.error(
      '❌ Greška prilikom slanja e-maila korisniku (reklamacija):',
      error
    );
  }
};
