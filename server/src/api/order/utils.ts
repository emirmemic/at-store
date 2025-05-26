import { ProductStockResponse } from '../product/types';
import { Order } from './types';

export async function getProductStockStatus(
  token: string,
  productId: string
): Promise<ProductStockResponse | null> {
  try {
    const response = await fetch(
      `${process.env.WEB_ACCOUNT_API_URL}/products/${productId}/stock`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const productStockResponse =
      (await response.json()) as ProductStockResponse;
    return productStockResponse;
  } catch {
    return {
      product_variant_id: productId,
      availability_by_store: {},
      amount_in_stock: 0,
    };
  }
}

/* Success Scenario */
export async function notifyAdminAboutOrderCreation(
  order: Order
): Promise<void> {
  await strapi
    .plugin('email')
    .service('email')
    .send({
      to: process.env.ORDERS_EMAIL,
      from: process.env.DEFAULT_FROM,
      subject: 'Nova narudžba je napravljena',
      text: `Nova narudžba #${order.orderNumber} je napravljena.
      Kupac: ${order.address.name} ${order.address.surname}
      Email: ${order.address.email}
      Telefon: ${order.address.phoneNumber}
      Način dostave: ${order.deliveryMethod === 'pickup' ? 'Preuzimanje' : 'Dostava'}
      Način plaćanja: ${order.paymentMethod === 'card' ? 'Kartica' : 'Gotovina'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Nova narudžba #${order.orderNumber}</h2>
          
          <h3 style="color: #555;">Podaci o kupcu:</h3>
          <p><strong>Ime i prezime:</strong> ${order.address.name} ${order.address.surname}</p>
          <p><strong>Email:</strong> ${order.address.email}</p>
          <p><strong>Telefon:</strong> ${order.address.phoneNumber}</p>
          <p><strong>Adresa:</strong> ${order.address.city}, ${order.address.postalCode}, ${order.address.country}</p>
          ${order.address.note ? `<p><strong>Napomena:</strong> ${order.address.note}</p>` : ''}
          
          <h3 style="color: #555;">Detalji narudžbe:</h3>
          <p><strong>Način dostave:</strong> ${order.deliveryMethod === 'pickup' ? 'Preuzimanje' : 'Dostava'}</p>
          <p><strong>Način plaćanja:</strong> ${order.paymentMethod === 'card' ? 'Kartica' : 'Gotovina'}</p>
          ${order.selectedStore ? `<p><strong>Odabrana trgovina:</strong> ${order.selectedStore}</p>` : ''}
          ${generateItemsList(order)}
          <p style="margin-top: 20px;">Molimo pregledajte i odobrite ovu narudžbu u administratorskom panelu.</p>
        </div>
      `,
    });
}

export async function notifyCustomerAboutOrderCreation(
  order: Order
): Promise<void> {
  await strapi
    .plugin('email')
    .service('email')
    .send({
      to: order.address.email,
      from: process.env.DEFAULT_FROM,
      subject: `Potvrda narudžbe #${order.orderNumber}`,
      text: `Hvala Vam na narudžbi #${order.orderNumber}!

      Kupac: ${order.address.name} ${order.address.surname}
      Način dostave: ${order.deliveryMethod === 'pickup' ? 'Preuzimanje u trgovini' : 'Dostava na adresu'}
      Način plaćanja: ${order.paymentMethod === 'card' ? 'Kartica' : 'Gotovina'}

      Ako imate bilo kakvih pitanja, slobodno nas kontaktirajte.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #2e7d32;">✅ Hvala na Vašoj narudžbi!</h2>
          <p>Vaša narudžba <strong>#${order.orderNumber}</strong> je uspješno zaprimljena.</p>

          <h3 style="color: #555;">Podaci o narudžbi:</h3>
          <p><strong>Ime i prezime:</strong> ${order.address.name} ${order.address.surname}</p>
          <p><strong>Telefon:</strong> ${order.address.phoneNumber}</p>
          <p><strong>Način dostave:</strong> ${order.deliveryMethod === 'pickup' ? 'Preuzimanje u trgovini' : 'Dostava na adresu'}</p>
          <p><strong>Način plaćanja:</strong> ${order.paymentMethod === 'card' ? 'Kartica' : 'Gotovina'}</p>
          ${order.selectedStore ? `<p><strong>Odabrana trgovina:</strong> ${order.selectedStore}</p>` : ''}
          ${order.address.note ? `<p><strong>Napomena:</strong> ${order.address.note}</p>` : ''}

          ${generateItemsList(order)}

          <p style="margin-top: 20px;">Ukoliko imate pitanja ili trebate pomoć, slobodno nas kontaktirajte putem e-pošte ili telefona.</p>

          <p style="color: #777;">Hvala što kupujete kod nas!</p>
        </div>
      `,
    });
}

/* Failure Scenario */
// Notify admin about order failure
// This function is called when the order creation fails (payment succeeded but order creation failed)
export async function notifyAdminAboutOrderFailure(
  order: Order
): Promise<void> {
  await strapi
    .plugin('email')
    .service('email')
    .send({
      to: process.env.ORDERS_EMAIL,
      from: process.env.DEFAULT_FROM,
      subject: 'GREŠKA: Problem s kreiranjem narudžbe',
      text: `HITNO: Plaćanje je uspjelo, ali kreiranje narudžbe #${order.orderNumber} je neuspjelo.
      Kupac: ${order.address.name} ${order.address.surname}
      Email: ${order.address.email}
      Telefon: ${order.address.phoneNumber}
      Način dostave: ${order.deliveryMethod === 'pickup' ? 'Preuzimanje' : 'Dostava'}
      Način plaćanja: ${order.paymentMethod === 'card' ? 'Kartica' : 'Gotovina'}
      
      Potrebna je hitna intervencija. Plaćanje je primljeno, ali narudžba nije pravilno zabilježena u sustavu.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #d32f2f; border-bottom: 1px solid #eee; padding-bottom: 10px;">⚠️ GREŠKA: Problem s kreiranjem narudžbe #${order.orderNumber}</h2>
          
          <div style="background-color: #ffebee; border-left: 4px solid #d32f2f; padding: 15px; margin-bottom: 20px;">
            <p style="color: #d32f2f; font-weight: bold;">HITNO: Plaćanje je uspjelo, ali kreiranje narudžbe nije. Potrebna je hitna intervencija.</p>
          </div>
          
          <h3 style="color: #555;">Podaci o kupcu:</h3>
          <p><strong>Ime i prezime:</strong> ${order.address.name} ${order.address.surname}</p>
          <p><strong>Email:</strong> ${order.address.email}</p>
          <p><strong>Telefon:</strong> ${order.address.phoneNumber}</p>
          <p><strong>Adresa:</strong> ${order.address.city}, ${order.address.postalCode}, ${order.address.country}</p>
          ${order.address.note ? `<p><strong>Napomena:</strong> ${order.address.note}</p>` : ''}
          
          <h3 style="color: #555;">Detalji narudžbe:</h3>
          <p><strong>Način dostave:</strong> ${order.deliveryMethod === 'pickup' ? 'Preuzimanje' : 'Dostava'}</p>
          <p><strong>Način plaćanja:</strong> ${order.paymentMethod === 'card' ? 'Kartica' : 'Gotovina'}</p>
          ${order.selectedStore ? `<p><strong>Odabrana trgovina:</strong> ${order.selectedStore}</p>` : ''}
          
          ${generateItemsList(order)}
            
          <p style="margin-top: 20px; color: #d32f2f; font-weight: bold;">
            Potrebno je hitno riješiti ovaj problem. Kupčevo plaćanje je primljeno, ali narudžba nije pravilno zabilježena u sustavu.
          </p>
        </div>
      `,
    });
}

export async function notifyCustomerAboutOrderFailure(
  order: Order
): Promise<void> {
  await strapi
    .plugin('email')
    .service('email')
    .send({
      to: order.address.email,
      from: process.env.DEFAULT_FROM,
      subject: `⚠️ Problem s narudžbom #${order.orderNumber}`,
      text: `Poštovani ${order.address.name},

    Vaša uplata za narudžbu #${order.orderNumber} je uspješno zaprimljena, no došlo je do tehničkog problema pri obradi narudžbe.

    Naš tim je već obaviješten i rješava problem što je brže moguće. Ukoliko imate dodatna pitanja, slobodno nas kontaktirajte.

    Hvala na razumijevanju!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #d32f2f;">⚠️ Problem s Vašom narudžbom</h2>
          <p>Poštovani <strong>${order.address.name}</strong>,</p>
          <p>Vaša uplata za narudžbu <strong>#${order.orderNumber}</strong> je uspješno zaprimljena, no došlo je do tehničkog problema prilikom obrade narudžbe.</p>
          
          <p>Naš tim je već obaviješten i aktivno radi na rješavanju problema. Nema potrebe za dodatnim koracima s Vaše strane u ovom trenutku.</p>

          <h3 style="color: #555;">Podaci o narudžbi:</h3>
          <p><strong>Telefon:</strong> ${order.address.phoneNumber}</p>
          <p><strong>Email:</strong> ${order.address.email}</p>
          <p><strong>Način dostave:</strong> ${order.deliveryMethod === 'pickup' ? 'Preuzimanje u trgovini' : 'Dostava na adresu'}</p>
          <p><strong>Način plaćanja:</strong> ${order.paymentMethod === 'card' ? 'Kartica' : 'Gotovina'}</p>
          ${order.selectedStore ? `<p><strong>Trgovina:</strong> ${order.selectedStore}</p>` : ''}
          ${order.address.note ? `<p><strong>Napomena:</strong> ${order.address.note}</p>` : ''}

          ${generateItemsList(order)}

          <p style="margin-top: 20px; color: #d32f2f;"><strong>Ispričavamo se na neugodnosti i zahvaljujemo na strpljenju.</strong></p>
          <p style="color: #777;">Ako imate pitanja, kontaktirajte nas putem e-pošte ili telefona.</p>
        </div>
      `,
    });
}

const generateItemsList = (order: Order) => {
  return `
    <h3 style="color: #555;">Proizvodi:</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="background-color: #f8f8f8;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Naziv proizvoda</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Šifra Artikla</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Količina</th>
        </tr>
      </thead>
      <tbody>
        ${order.items
          .map(
            (item) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.name || 'N/A'}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${item.productVariantId}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
          </tr>`
          )
          .join('')}
      </tbody>
    </table>
  `;
};
