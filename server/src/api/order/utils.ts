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

export async function notifyAdminAboutOrderCreation(
  order: Order
): Promise<void> {
  // Create a formatted list of items
  const itemsList = order.items
    .map(
      (item) =>
        `<tr>
      <td style="border: 1px solid #ddd; padding: 8px;">${item.productVariantId}</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
    </tr>`
    )
    .join('');

  await strapi
    .plugin('email')
    .service('email')
    .send({
      to: process.env.ADMIN_EMAIL,
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
          
          <h3 style="color: #555;">Proizvodi:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f8f8f8;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">ID varijante</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Količina</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
          </table>
          
          <p style="margin-top: 20px;">Molimo pregledajte i odobrite ovu narudžbu u administratorskom panelu.</p>
        </div>
      `,
    });
}

// Notify admin about order failure
// This function is called when the order creation fails (payment succeeded but order creation failed)
export async function notifyAdminAboutOrderFailure(
  order: Order
): Promise<void> {
  // Create a formatted list of items
  const itemsList = order.items
    .map(
      (item) =>
        `<tr>
      <td style="border: 1px solid #ddd; padding: 8px;">${item.productVariantId}</td>
      <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
    </tr>`
    )
    .join('');

  await strapi
    .plugin('email')
    .service('email')
    .send({
      to: process.env.ADMIN_EMAIL,
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
          
          <h3 style="color: #555;">Proizvodi:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f8f8f8;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">ID varijante</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Količina</th>
              </tr>
            </thead>
            <tbody>
              ${itemsList}
            </tbody>
          </table>
          
          <p style="margin-top: 20px; color: #d32f2f; font-weight: bold;">
            Potrebno je hitno riješiti ovaj problem. Kupčevo plaćanje je primljeno, ali narudžba nije pravilno zabilježena u sustavu.
          </p>
        </div>
      `,
    });
}
