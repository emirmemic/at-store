import { CURRENCY } from '../../utils/constants';
import {
  contactInfoBlock,
  contactInfoText,
} from '../../utils/contact-email-template';
import { ProductStockResponse } from '../product/types';
import { OrderPopulated } from './types';

const ordersEmail = process.env.ORDERS_EMAIL || 'orders@atstore.ba';
const defaultFrom = process.env.DEFAULT_FROM || 'noreply@atstore.ba';
const strapiUrl = process.env.PUBLIC_URL || 'https://admin.atstore.ba';
const logoUrl = `${strapiUrl}/logo-black.jpg`;

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
export async function notifyCustomerAboutOrderCreation(order) {
  await strapi
    .plugin('email')
    .service('email')
    .send({
      to: order.address.email,
      from: defaultFrom,
      subject: `Potvrda narudžbe #${order.orderNumber}`,
      text: userOrderSuccessText(order),
      html: renderUserOrderSuccessEmail(order),
    });
}

export async function notifyAdminAboutOrderCreation(order) {
  await strapi
    .plugin('email')
    .service('email')
    .send({
      to: ordersEmail,
      from: defaultFrom,
      subject: 'Nova narudžba je napravljena',
      text: adminOrderSuccessText(order),
      html: renderAdminOrderSuccessEmail(order),
    });
}

/* Failure Scenario */
// This function is called when the order creation fails (payment succeeded but order creation failed)
export async function notifyCustomerAboutOrderFailure(order) {
  await strapi
    .plugin('email')
    .service('email')
    .send({
      to: order.address.email,
      from: process.env.DEFAULT_FROM,
      subject: `⚠️ Problem s narudžbom #${order.orderNumber}`,
      text: userOrderFailureText(order),
      html: renderUserOrderFailureEmail(order),
    });
}

export async function notifyAdminAboutOrderFailure(order) {
  await strapi
    .plugin('email')
    .service('email')
    .send({
      to: process.env.ORDERS_EMAIL,
      from: process.env.DEFAULT_FROM,
      subject: 'GREŠKA: Problem s kreiranjem narudžbe',
      text: adminOrderFailureText(order),
      html: renderAdminOrderFailureEmail(order),
    });
}

// Email templates for user and admin notifications
function renderUserOrderSuccessEmail(order) {
  return renderWrapper(`
    ${renderLogo()}
    <div style="padding: 20px 24px 0 24px;">
      <h2 style="color: #2e7d32; margin:0 0 8px 0; font-size: 20px;">✅ Hvala na Vašoj narudžbi!</h2>
      <p style="margin:0 0 18px 0; color:#222;">
        Poštovani ${order.address.name},<br>
        Vaša narudžba <strong>#${order.orderNumber}</strong> je uspješno zaprimljena.
      </p>
      ${renderOrderDetails(order)}
      ${renderDeliveryAddress(order)}
      <div style="margin-top: 24px; color:#888; font-size:13px;">
        ${contactInfoBlock()}
        Hvala što kupujete kod nas!
      </div>
    </div>
  `);
}
const userOrderSuccessText = (order) =>
  `Poštovani ${order.address.name},

  Vaša narudžba #${order.orderNumber} je uspješno zaprimljena!

  ${contactInfoText()}

  Hvala što kupujete kod nas!`;

function renderAdminOrderSuccessEmail(order) {
  return renderWrapper(`
    ${renderLogo()}
    <div style="padding: 20px 24px 0 24px;">
      <h2 style="color: #333; margin:0 0 8px 0; font-size: 20px;">Nova narudžba!</h2>
      <p style="margin:0 0 18px 0; color:#222;">
        Primljena je nova narudžba od ${order.address.name} ${order.address.surname}.<br>
        Broj narudžbe: <strong>${order.orderNumber}</strong>
      </p>
      ${renderOrderDetails(order)}
      ${renderDeliveryAddress(order)}
      <div style="margin-top: 24px; color:#888; font-size:13px;">
        Pogledajte i obradite narudžbu u administraciji.
      </div>
    </div>
  `);
}
const adminOrderSuccessText = (order) =>
  `Nova narudžba #${order.orderNumber} je napravljena.

Kupac: ${order.address.name} ${order.address.surname}
Email: ${order.address.email}
Telefon: ${order.address.phoneNumber}
Način dostave: ${order.deliveryMethod === 'pickup' ? 'Preuzimanje' : 'Dostava'}
Način plaćanja: ${order.paymentMethod === 'card' ? 'Kartica' : 'Gotovina'}
`;
function renderAdminOrderFailureEmail(order) {
  return renderWrapper(`
    ${renderLogo()}
    <div style="padding: 20px 24px 0 24px;">
      <h2 style="color: #d32f2f; margin:0 0 8px 0; font-size: 20px;">⚠️ GREŠKA: Problem s narudžbom</h2>
      <div style="background-color: #ffebee; border-left: 4px solid #d32f2f; padding: 15px; margin-bottom: 20px;">
        <p style="color: #d32f2f; font-weight: bold;">
          HITNO: Plaćanje je uspjelo, ali narudžba #${order.orderNumber} nije pravilno zabilježena u sustavu.<br>
          Potrebna je hitna intervencija!
        </p>
      </div>
      ${renderOrderDetails(order)}
      ${renderDeliveryAddress(order)}
      <div style="margin-top: 24px; color:#888; font-size:13px;">
        Kontaktirajte kupca što prije!
      </div>
    </div>
  `);
}

const adminOrderFailureText = (order) =>
  `HITNO: Plaćanje je uspjelo, ali kreiranje narudžbe #${order.orderNumber} nije uspjelo.

Kupac: ${order.address.name} ${order.address.surname}
Email: ${order.address.email}
Telefon: ${order.address.phoneNumber}
Način dostave: ${order.deliveryMethod === 'pickup' ? 'Preuzimanje' : 'Dostava'}
Način plaćanja: ${order.paymentMethod === 'card' ? 'Kartica' : 'Gotovina'}

Potrebna je hitna intervencija! Plaćanje je primljeno, ali narudžba nije pravilno zabilježena u sustavu.`;
function renderUserOrderFailureEmail(order) {
  return renderWrapper(`
    ${renderLogo()}
    <div style="padding: 20px 24px 0 24px;">
      <h2 style="color: #d9534f; margin:0 0 8px 0; font-size: 20px;">⚠️ Problem s narudžbom</h2>
      <div style="background-color: #ffebee; border-left: 4px solid #d9534f; padding: 15px; margin-bottom: 20px;">
        <p style="color: #d32f2f;">
          Poštovani ${order.address.name},<br><br>
          Vaša uplata za narudžbu <strong>#${order.orderNumber}</strong> je zaprimljena, ali došlo je do tehničkog problema pri obradi narudžbe.<br>
          Naš tim je obaviješten i rješava problem što je brže moguće.
        </p>
      </div>
      <div style="margin-top: 24px; color:#888; font-size:13px;">
        ${contactInfoBlock()}
      </div>
    </div>
  `);
}
const userOrderFailureText = (order) =>
  `Poštovani ${order.address.name},

  Vaša uplata za narudžbu #${order.orderNumber} je uspješno zaprimljena, no došlo je do tehničkog problema pri obradi narudžbe.

  Naš tim je već obaviješten i rješava problem što je brže moguće. 

  ${contactInfoText()}

  Hvala na razumijevanju!`;

// Helper for the top wrapper
function renderWrapper(content) {
  return `
    <div style="max-width: 600px; margin:0 auto; font-family: Arial, sans-serif; background:#fff; border: 1px solid #eee; border-radius:10px; overflow:hidden;">
      ${content}
    </div>
  `;
}

const formatPrice = (price: number) => {
  return price.toLocaleString('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
function renderOrderDetails(order: OrderPopulated) {
  const formatPriceWithCurrency = (price: number) =>
    `${formatPrice(price)} ${CURRENCY}`;
  const date = new Date(order.createdAt);

  const priceWithoutDelivery = order.totalPrice - (order.deliveryPrice || 0);
  // Gift section (show only if isGift is true)
  const giftHtml = order.isGift
    ? `<div style="margin: 14px 0 10px 0; padding: 10px; background: #fff3cd; border-radius: 8px; color: #856404; font-size: 15px; border:1.5px solid #ffe08c;">
         🎁 Ova narudžba je označena kao poklon!<br>
       </div>`
    : '';

  // Items table
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr style="border-bottom:1px solid #e2e2e2;">
      <td style="padding: 7px 0; vertical-align: middle; border-right:1px solid #e2e2e2;">
  ${
    item.product.images &&
    item.product.images.length &&
    item.product.images[0].url
      ? `<img src="${strapiUrl}${item.product.images[0].url}"
             alt="${item.product.name}"
             style="height: 38px; vertical-align: middle; margin-right: 8px; border-radius:6px; width: 38px; object-fit: contain;">`
      : `<span style="
            display: inline-block;
            width: 38px;
            height: 38px;
            background: #cac3c3;
            color: #bbb;
            vertical-align: middle;
            margin-right: 8px;
            text-align: center;
            border-radius: 10px;
            line-height: 38px;
            font-size: 12px;
            font-family: Arial, sans-serif;
          ">
         </span>`
  }
  <span style="font-weight: 600;">${item.product.name}</span>
</td>

      <td style="text-align: center; min-width:30px; border-right:1px solid #e2e2e2;">${item.quantity}</td>
      <td style="text-align: right;">${formatPriceWithCurrency(item.product.originalPrice)}</td>
    </tr>
  `
    )
    .join('');

  return `
  <div style="margin: 10px 0 0 0; font-size:14px; font-family:Arial,sans-serif; background:#fff; border:1.5px solid #e2e2e2; border-radius:8px; max-width:530px; box-shadow:0 1px 4px #eee;">
    <div style="margin: 14px 0 4px 0; text-align:center; font-weight:500; font-size:17px;">
      DETALJI NARUDŽBE
    </div>
    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px; border-bottom:1.5px solid #e2e2e2; padding-bottom:10px;">
      <span>
        Broj narudžbe: <span style="color:#368bf4;">${order.orderNumber}</span>
      </span>
      <span>
        Datum: <span style="color:#368bf4; text-decoration:none;">
          ${date.toLocaleDateString('de-DE')}
        </span>
      </span>
    </div>
    <table style="width:100%; border-collapse:collapse; margin-bottom: 13px; border:1.5px solid #e2e2e2; border-radius:6px; overflow:hidden;">
      <thead>
        <tr style="background:#f7f7f7; border-bottom:1.5px solid #e2e2e2;">
          <th style="text-align:left; font-size:13px; padding-bottom:8px; font-weight: 400; border-right:1px solid #e2e2e2;">PROIZVOD</th>
          <th style="text-align:center; font-size:13px; padding-bottom:8px; font-weight: 400; border-right:1px solid #e2e2e2;">KOLIČINA</th>
          <th style="text-align:right; font-size:13px; padding-bottom:8px; font-weight: 400;">CIJENA</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <div style="border-top: 2px solid #e2e2e2; margin: 18px 0 10px 0;"></div>
    <table style="width:100%; font-size:14px; border-collapse:collapse;">
      <tr style="border-bottom:1px solid #e2e2e2;">
        <td style="font-weight:600; padding:7px 0;">UKUPNO:</td>
        <td style="text-align:right; padding:7px 0;">${formatPriceWithCurrency(priceWithoutDelivery)}</td>
      </tr>
      ${
        order.deliveryPrice
          ? `
      <tr style="border-bottom:1px solid #e2e2e2;">
        <td style="font-weight:600; padding:7px 0;">DOSTAVA:</td>
        <td style="text-align:right; padding:7px 0;">${formatPriceWithCurrency(order.deliveryPrice)} PUTEM BRZA POŠTA</td>
      </tr>
      `
          : '0'
      }
      <tr style="border-bottom:1px solid #e2e2e2;">
        <td style="font-weight:600; padding:7px 0;">NAČIN PLAĆANJA:</td>
        <td style="text-align:right; padding:7px 0;">
          ${order.paymentMethod === 'cash' ? 'PLAĆANJE PRILIKOM PREUZIMANJA' : 'KARTICA'}
        </td>
      </tr>
      <tr>
        <td style="font-weight:600; padding:7px 0;">UKUPNO:</td>
        <td style="text-align:right; padding:7px 0;">${formatPrice(order.totalPrice)}</td>
      </tr>
    </table>
    ${giftHtml}
  </div>
  `;
}

function renderDeliveryAddress(order: OrderPopulated) {
  const addr = order.address;
  return `
    <div style="margin-top: 22px; font-size: 14px;">
      <div style="font-weight: bold; margin-bottom: 2px;">ADRESA ZA ISPORUKU:</div>
      <div>
        ${addr.name ? addr.name : ''} ${addr.surname ? addr.surname : ''}<br>

        ${addr.city ? addr.city + '<br>' : ''}
        ${addr.postalCode ? addr.postalCode + '<br>' : ''}
        ${addr.phoneNumber ? addr.phoneNumber + '<br>' : ''}
        ${addr.email ? `<a href="mailto:${addr.email}" style="color:#337ab7; text-decoration:underline;">${addr.email}</a><br>` : ''}
      </div>
    </div>
  `;
}

function renderLogo() {
  return `
    <div style="text-align: center; padding: 48px 0;">
      <img src="${logoUrl}" alt="Logo" style="max-width: 240px; height: auto;">
    </div>
  `;
}
