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
      subject: 'Nova narudžba je kreirana',
      text: adminOrderSuccessText(order),
      html: renderAdminOrderSuccessEmail(order),
    });
}

/* Failure Scenario */
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

/**
 * Renders the primary order confirmation email sent to the user.
 * This is the main updated template with the new design.
 */
function renderUserOrderSuccessEmail(order: OrderPopulated) {
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return renderWrapper(`
        <div style="padding: 0 32px 32px 32px;">
            ${renderLogo()}
            <h1 style="font-size: 28px; font-weight: 600; color: #1d1d1f; margin: 0 0 16px 0;">Hvala na Vašoj narudžbi.</h1>
            <p style="font-size: 16px; color: #515154; margin: 0 0 24px 0;">Obavijestit ćemo Vas kada Vaši artikli budu na putu.</p>
            
            <div style="font-size: 14px; color: #515154; padding: 16px 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">
                <span style="padding-right: 24px;">Broj narudžbe: <span style="color: #0066cc; text-decoration: none;">${order.orderNumber}</span></span>
                <span>Naručeno: ${orderDate}</span>
            </div>

            ${renderOrderDetails(order)}
            ${renderDeliveryAddress(order)}
            ${renderBillingAndPaymentSection(order)}

            <div style="margin-top: 40px; border-top: 1px solid #e5e5e5; padding-top: 20px; color:#888; font-size:12px;">
                ${contactInfoBlock()}
                <p style="margin-top: 16px;">Hvala što kupujete kod nas!</p>
            </div>
        </div>
    `);
}

const userOrderSuccessText = (order) => `Poštovani ${order.address.name},

  Vaša narudžba #${order.orderNumber} je uspješno zaprimljena!

  ${contactInfoText()}

  Hvala što kupujete kod nas!`;

function renderAdminOrderSuccessEmail(order) {
  return renderWrapper(`
    <div style="padding: 32px;">
        ${renderLogo()}
        <h1 style="font-size: 24px; color: #1d1d1f;">Nova narudžba.</h1>
        <p style="margin:0 0 18px 0; color:#222;">
            Primljena je nova narudžba od ${order.address.name} ${order.address.surname}.<br>
            Broj narudžbe: <strong>${order.orderNumber}</strong>
        </p>
        ${renderOrderDetails(order)}
        ${renderDeliveryAddress(order)}
        ${renderBillingAndPaymentSection(order)}
        <div style="margin-top: 24px; color:#888; font-size:13px; border-top: 1px solid #e5e5e5; padding-top: 20px;">
            Pogledajte i obradite narudžbu u administraciji.
        </div>
    </div>
  `);
}
const adminOrderSuccessText = (
  order
) => `Nova narudžba #${order.orderNumber} je napravljena.

Kupac: ${order.address.name} ${order.address.surname}
Adresa: ${order.address.address}
Email: ${order.address.email}
Telefon: ${order.address.phoneNumber}
Način dostave: ${order.deliveryMethod === 'pickup' ? 'Preuzimanje' : 'Dostava'}
Način plaćanja: ${order.paymentMethod === 'card' ? 'Kartica' : 'Gotovina'}
`;
function renderAdminOrderFailureEmail(order) {
  return renderWrapper(`
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

const adminOrderFailureText = (
  order
) => `HITNO: Plaćanje je uspjelo, ali kreiranje narudžbe #${order.orderNumber} nije uspjelo.

Kupac: ${order.address.name} ${order.address.surname}
Adresa: ${order.address.address}
Email: ${order.address.email}
Telefon: ${order.address.phoneNumber}
Način dostave: ${order.deliveryMethod === 'pickup' ? 'Preuzimanje' : 'Dostava'}
Način plaćanja: ${order.paymentMethod === 'card' ? 'Kartica' : 'Gotovina'}

Potrebna je hitna intervencija! Plaćanje je primljeno, ali narudžba nije pravilno zabilježena u sustavu.`;
function renderUserOrderFailureEmail(order) {
  return renderWrapper(`
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
const userOrderFailureText = (order) => `Poštovani ${order.address.name},

  Vaša uplata za narudžbu #${order.orderNumber} je uspješno zaprimljena, no došlo je do tehničkog problema pri obradi narudžbe.

  Naš tim je već obaviješten i rješava problem što je brže moguće. 

  ${contactInfoText()}

  Hvala na razumijevanju!`;

/**
 * Renders the main wrapper for all emails with a modern look.
 */
function renderWrapper(content) {
  return `
      <div style="background-color: #f5f5f7; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';">
        <div style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          ${content}
        </div>
      </div>
    `;
}

const formatPrice = (price: number) => {
  return price.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/**
 * Renders the billing and payment section, including totals.
 */
function renderBillingAndPaymentSection(order: OrderPopulated) {
  const addr = order.address;
  const priceWithoutDelivery = order.totalPrice - (order.deliveryPrice || 0);
  const formatPriceWithCurrency = (price: number) =>
    `${formatPrice(price)} ${CURRENCY}`;

  const giftHtml = order.isGift
    ? `<div style="margin: 20px 0 0 0; padding: 12px; background: #fff3cd; border-radius: 8px; color: #856404; font-size: 14px; border:1px solid #ffe08c;">
             🎁 Ova narudžba je označena kao poklon!
           </div>`
    : '';

  const totals = `
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border-top: 1px solid #e5e5e5; padding-top: 20px;">
            <tbody>
                <tr>
                    <td style="padding: 8px 0; font-size: 15px; color: #1d1d1f;">Međuzbroj</td>
                    <td style="padding: 8px 0; font-size: 15px; color: #1d1d1f; text-align: right;">${formatPriceWithCurrency(priceWithoutDelivery)}</td>
                </tr>
                <tr>
                    <td style="padding: 8px 0; font-size: 15px; color: #1d1d1f;">Dostava</td>
                    <td style="padding: 8px 0; font-size: 15px; color: #1d1d1f; text-align: right;">${order.deliveryPrice > 0 ? formatPriceWithCurrency(order.deliveryPrice) : 'Besplatna'}</td>
                </tr>
                <tr style="border-top: 1px solid #e5e5e5;">
                    <td style="padding: 15px 0 8px 0; font-size: 17px; color: #1d1d1f; font-weight: 600;">Ukupno</td>
                    <td style="padding: 15px 0 8px 0; font-size: 17px; color: #1d1d1f; font-weight: 600; text-align: right;">${formatPriceWithCurrency(order.totalPrice)}</td>
                </tr>
                 <tr>
                    <td colspan="2" style="padding: 10px 0; font-size: 15px; color: #515154;">
                        Način plaćanja: ${
                          order.paymentMethod === 'cash'
                            ? 'Pouzećem'
                            : order.paymentMethod === 'virman'
                              ? 'Virman'
                              : 'Kartica'
                        }
                    </td>
                </tr>
            </tbody>
        </table>
    `;

  return `
        <h2 style="font-size: 20px; color: #1d1d1f; margin: 40px 0 10px 0;">Naplata i plaćanje</h2>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin-bottom: 20px;" />
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="vertical-align: top; padding-right: 10px;">
                    <p style="font-size: 16px; color: #1d1d1f; font-weight: 500; margin-bottom: 5px;">Kontakt za naplatu</p>
                    <p style="font-size: 16px; color: #515154; line-height: 1.5; margin: 0;">
                        ${addr.name || ''} ${addr.surname || ''}<br>
                        ${addr.email ? `<a href="mailto:${addr.email}" style="color:#0066cc; text-decoration:none;">${addr.email}</a><br>` : ''}
                        ${addr.phoneNumber || ''}
                    </p>
                </td>
                <td style="width: 50%; vertical-align: top; padding-left: 10px;">
                    <p style="font-size: 16px; color: #1d1d1f; font-weight: 500; margin-bottom: 5px;">Adresa za naplatu</p>
                    <p style="font-size: 16px; color: #515154; line-height: 1.5; margin: 0;">
                         ${addr.name || ''} ${addr.surname || ''}<br>
                         ${addr.city || ''} ${addr.postalCode || ''}
                    </p>
                </td>
            </tr>
        </table>
        ${giftHtml}
        ${totals}
    `;
}

/**
 * Renders the "Items to be Shipped" section of the email.
 */
function renderOrderDetails(order: OrderPopulated) {
  const formatPriceWithCurrency = (price: number) =>
    `${formatPrice(price)} ${CURRENCY}`;

  const itemsHtml = order.items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #e5e5e5;">
        <td style="padding: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="width: 80px; padding-right: 20px;">
                         ${
                           item.product.images &&
                           item.product.images.length &&
                           item.product.images[0].url
                             ? `<img src="${strapiUrl}${item.product.images[0].url}"
                                     alt="${item.product.name}"
                                     style="width: 60px; height: 60px; object-fit: contain; border-radius: 8px; border: 1px solid #e5e5e5;">`
                             : `<div style="width: 60px; height: 60px; background: #f5f5f5; border-radius: 8px;"></div>`
                         }
                    </td>
                    <td style="vertical-align: top;">
                        <p style="margin: 0; font-size: 16px; font-weight: 600; color: #1d1d1f;">${item.product.name}</p>
                        <p style="margin: 5px 0 0 0; font-size: 14px; color: #515154;">Količina: ${item.quantity}</p>
                    </td>
                    <td style="vertical-align: top; text-align: right; font-size: 16px; color: #1d1d1f; font-weight: 500;">
                        ${formatPriceWithCurrency(item.product.originalPrice * item.quantity)}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
  `
    )
    .join('');

  return `
    <h2 style="font-size: 20px; color: #1d1d1f; margin: 40px 0 10px 0;">Artikli za slanje</h2>
    <table style="width: 100%; border-collapse: collapse;">
        <tbody>
            ${itemsHtml}
        </tbody>
    </table>
  `;
}

/**
 * Renders the "Shipping Address" section of the email.
 */
function renderDeliveryAddress(order: OrderPopulated) {
  const addr = order.address;
  return `
    <h2 style="font-size: 20px; color: #1d1d1f; margin: 40px 0 10px 0;">Adresa za dostavu</h2>
    <hr style="border: none; border-top: 1px solid #e5e5e5; margin-bottom: 20px;" />
    <p style="font-size: 16px; color: #515154; line-height: 1.5; margin: 0;">
        ${addr.name || ''} ${addr.surname || ''}<br>
        ${addr.address || ''}
        ${addr.city || ''} ${addr.postalCode || ''}<br>
        ${addr.phoneNumber || ''}<br>
        ${order.deliveryMethod === 'pickup' && (order as any).storeName ? `<br>${(order as any).storeName}` : ''}
    </p>
  `;
}

/**
 * Renders the logo with updated styling.
 */
function renderLogo() {
  return `
    <div style="text-align: left; padding: 32px 0 24px 0;">
      <img src="${logoUrl}" alt="Logo" style="max-width: 120px; height: auto;">
    </div>
  `;
}
