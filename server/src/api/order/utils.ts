import {
  contactInfoBlock,
  contactInfoText,
} from '../../utils/contact-email-template';

import { CURRENCY } from '../../utils/constants';
import { OrderPopulated } from './types';
import { ProductStockResponse } from '../product/types';

const ordersEmail = process.env.ORDERS_EMAIL || 'orders@atstore.ba';
const defaultFrom = process.env.DEFAULT_FROM || 'noreply@atstore.ba';
const strapiUrl = process.env.PUBLIC_URL || 'https://admin.atstore.ba';
const logoUrl = `${strapiUrl}/logo-black.jpg`;
const storefrontBaseUrl = (
  process.env.STOREFRONT_URL ||
  process.env.FRONTEND_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://atstore.ba'
).replace(/\/+$/, '');

const buildStorefrontUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${storefrontBaseUrl}${normalizedPath}`;
};

const getProductPath = (product: {
  category?: { link?: string } | null;
  productTypeId?: string;
  productLink?: string;
}) => {
  const categoryLink = product?.category?.link;
  const productTypeId = product?.productTypeId;
  const productLink = product?.productLink;

  if (!categoryLink || !productTypeId || !productLink) {
    return '/proizvodi';
  }

  const encodedCategory = encodeURIComponent(categoryLink);
  const encodedType = encodeURIComponent(productTypeId.toLowerCase());
  const encodedProduct = encodeURIComponent(productLink);

  return `/proizvodi/${encodedCategory}/${encodedType}/${encodedProduct}`;
};

const getOrderSummaryPath = (orderToken: string) =>
  `/narudzba/${encodeURIComponent(orderToken)}`;

const resolveOrderAccessToken = (order: {
  publicToken?: string | null;
  documentId?: string;
  orderNumber: string;
}) => order.publicToken ?? order.documentId ?? order.orderNumber;

const getOrderSummaryUrl = (order: {
  publicToken?: string | null;
  documentId?: string;
  orderNumber: string;
}) => buildStorefrontUrl(getOrderSummaryPath(resolveOrderAccessToken(order)));

const formatNoteText = (note?: string) => {
  const value = note?.trim();
  return value ? `Napomena: ${value}` : '';
};

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

export async function notifyCustomerAboutOrderCompletion(
  order: OrderPopulated
) {
  if (!order?.address?.email) {
    return;
  }

  await strapi
    .plugin('email')
    .service('email')
    .send({
      to: order.address.email,
      from: defaultFrom,
      subject: `Narudžba #${order.orderNumber} je kompletirana`,
      text: orderCompletionText(order),
      html: renderOrderCompletionEmail(order),
    });
}

export async function notifyCustomerAboutOrderCancellation(
  order: OrderPopulated
) {
  if (!order?.address?.email) {
    return;
  }

  await strapi
    .plugin('email')
    .service('email')
    .send({
      to: order.address.email,
      from: defaultFrom,
      subject: `Narudžba #${order.orderNumber} je otkazana`,
      text: orderCancellationText(order),
      html: renderOrderCancellationEmail(order),
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

function renderUserOrderSuccessEmail(order: OrderPopulated) {
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const orderSummaryUrl = getOrderSummaryUrl(order);
  const orderSummaryButton = `<div style="margin:40px 0;text-align:center;"><div style="background-color:#f2f2f2;padding:48px 0;border-radius:6px;"><a href="${orderSummaryUrl}" style="display:inline-block;padding:16px 52px;background-color:#000000;color:#ffffff;text-decoration:none;letter-spacing:1px;font-weight:600;font-size:13px;border:1px solid #000000;text-transform:uppercase;transition:all 0.3s ease;">POGLEDAJ DETALJE NARUDŽBE</a></div></div>`;

  return renderWrapper(`<div style="padding: 0 32px 32px 32px;">
${renderLogo()}
<h1 style="font-size: 28px; font-weight: 600; color: #1d1d1f; margin: 0 0 16px 0;">Hvala na Vašoj narudžbi.</h1>
<p style="font-size: 16px; color: #515154; margin: 0 0 24px 0;">Vaša narudžba je u obradi. <br/> Obavijestit ćemo Vas kada narudžba bude predana kurirskoj službi.<br/><br/> Ukoliko ste poručili artikal koji trenutačno nije dostupan na stanju, naknadno ćemo Vas obavijestiti o egzaktnom roku isporuke.</p>
<div style="font-size: 14px; color: #515154; padding: 16px 0; border-top: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;">
<span style="padding-right: 24px;">Broj narudžbe: <span style="color: #0066cc; text-decoration: none;">${order.orderNumber}</span></span>
<span>Naručeno: ${orderDate}</span>
</div>
${orderSummaryButton}
${renderOrderDetails(order)}
${renderDeliveryAddress(order)}
${renderBillingAndPaymentSection(order)}
<div style="margin-top: 40px; border-top: 1px solid #e5e5e5; padding-top: 20px; color:#888; font-size:12px;">
${contactInfoBlock()}
</div>
</div>`);
}

const userOrderSuccessText = (order) => {
  const noteText = formatNoteText(order.address?.note);
  const orderSummaryUrl = getOrderSummaryUrl(order);
  return `Poštovani ${order.address.name},

Vaša narudžba #${order.orderNumber} je uspješno zaprimljena!
${noteText ? `\n${noteText}` : ''}

Pregled narudžbe: ${orderSummaryUrl}

${contactInfoText()}`;
};

const orderCompletionText = (order: OrderPopulated) => {
  const orderSummaryUrl = getOrderSummaryUrl(order);
  return `Poštovani ${order.address.name},

Vaša narudžba #${order.orderNumber} je završena.

Pregled narudžbe: ${orderSummaryUrl}

${contactInfoText()}
`;
};

function renderOrderCompletionEmail(order: OrderPopulated) {
  const orderSummaryUrl = getOrderSummaryUrl(order);
  const orderSummaryButton = `<div style="margin:40px 0;text-align:center;"><div style="background-color:#f2f2f2;padding:48px 0;border-radius:6px;"><a href="${orderSummaryUrl}" style="display:inline-block;padding:16px 52px;background-color:#000000;color:#ffffff;text-decoration:none;letter-spacing:1px;font-weight:600;font-size:13px;border:1px solid #000000;text-transform:uppercase;transition:all 0.3s ease;">POGLEDAJ DETALJE NARUDŽBE</a></div></div>`;

  return renderWrapper(`<div style="padding: 0 32px 32px 32px;">
${renderLogo()}
<h1 style="font-size: 28px; font-weight: 600; color: #1d1d1f; margin: 0 0 16px 0;">Vaša narudžba je kompletirana</h1>
<p style="font-size: 16px; color: #515154; margin: 0 0 24px 0;">
  ${
    order.deliveryMethod === 'delivery'
      ? 'Poštovani, <br/> <br/> Hvala što se odabrali AT Store. <br/> Vaša narudžba je procesuirana i predana kurirskoj službi. <br/> Isporuka se očekuje u roku od 2–3 radna dana. <br/> <br/>Ukoliko imate pitanja, pošaljite upit na orders@atstore.com ili kontaktirajte podršku na 033 872 000. <br/> <br/> Ako želite otkazati kupovinu, to možete učiniti u roku od 15 minuta slanjem e-maila na orders@atstore.ba. <br/> <br/> Srdačno, <br/> AT Store'
      : `Poštovani, <br/> <br/> Hvala Vam što ste odabrali AT Store. <br/> Vaša narudžba je procesuirana i spremna za preuzimanje u ${order.selectedStore}. Molimo pokažite broj narudžbe ili potvrdu prilikom preuzimanja. <br /> <br/> Ako imate pitanja, nazovite podršku na 033 872 000 ili nas kontaktirajte na orders@atstore.ba. <br/> <br/> Srdačno, <br/> AT Store`
  }
</p>
${orderSummaryButton}
${renderOrderDetails(order)}
${renderDeliveryAddress(order)}
<div style="margin-top: 40px; border-top: 1px solid #e5e5e5; padding-top: 20px; color:#888; font-size:12px;">
${contactInfoBlock()}
</div>
</div>`);
}

const orderCancellationText = (order: OrderPopulated) => {
  const orderSummaryUrl = getOrderSummaryUrl(order);
  return `Poštovani ${order.address.name},

Vaša narudžba #${order.orderNumber} je otkazana.

Pregled narudžbe: ${orderSummaryUrl}

${contactInfoText()}

Ako imate dodatna pitanja, slobodno nas kontaktirajte.`;
};

function renderOrderCancellationEmail(order: OrderPopulated) {
  const orderSummaryUrl = getOrderSummaryUrl(order);
  const orderSummaryButton = `<div style="margin:40px 0;text-align:center;"><div style="background-color:#fef4f4;padding:32px 0;border-radius:6px;"><a href="${orderSummaryUrl}" style="display:inline-block;padding:16px 52px;background-color:#d32f2f;color:#ffffff;text-decoration:none;letter-spacing:1px;font-weight:600;font-size:13px;border:1px solid #d32f2f;text-transform:uppercase;transition:all 0.3s ease;">POGLEDAJ DETALJE NARUDŽBE</a></div></div>`;
  return renderWrapper(`<div style="padding: 0 32px 32px 32px;">
${renderLogo()}
<h1 style="font-size: 28px; font-weight: 600; color: #d32f2f; margin: 0 0 16px 0;">Vaša narudžba je otkazana</h1>
<p style="font-size: 16px; color: #515154; margin: 0 0 24px 0;">
Poštovani, <br/> <br/>
Vaša narudžba je otkazana. <br/> <br/>
Ukoliko ste platili kartično, povrat sredstava će biti pokrenut odmah.<br/>
Očekivano knjiženje: 5–7 radnih dana od potvrde povrata (za kartična plaćanja vremenski rok može biti 5–15 radnih dana ovisno o banci). <br/>
<br/>
<br/>Želite ponovno naručiti? Posjetite <a href="https://atstore.ba">AT Store</a>.
<br/>Ako imate pitanja, pišite na orders@atstore.ba ili nazovite 033 872 000. <br/>
<br/>Srdačan pozdrav,<br/>
AT Store
</p>
${orderSummaryButton}
${renderOrderDetails(order)}
${contactInfoBlock()}
<p style="margin-top: 16px;">Ako imate dodatnih pitanja, javite nam se.</p>
</div>
</div>`);
}

function renderAdminOrderSuccessEmail(order) {
  return renderWrapper(`<div style="padding: 32px;">
${renderLogo()}
<h1 style="font-size: 24px; color: #1d1d1f;">Nova narudžba!</h1>
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
</div>`);
}
const adminOrderSuccessText = (order) => {
  const noteText = formatNoteText(order.address?.note);
  return `Nova narudžba #${order.orderNumber} je napravljena.

Kupac: ${order.address.name} ${order.address.surname} 
Email: ${order.address.email}
Telefon: ${order.address.phoneNumber}
Način dostave: ${order.deliveryMethod === 'pickup' ? 'Preuzimanje' : 'Dostava'}
Način plaćanja: ${order.paymentMethod === 'card' ? 'Kartica' : order.paymentMethod === 'virman' ? 'Virman' : 'Gotovina'}
${noteText ? `\n${noteText}` : ''}
`;
};
function renderAdminOrderFailureEmail(order: OrderPopulated) {
  return renderWrapper(`<div style="padding: 20px 24px 0 24px;">
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
</div>`);
}

const adminOrderFailureText = (order: {
  orderNumber: any;
  address: {
    name: any;
    surname: any;
    email: any;
    phoneNumber: any;
    note?: string;
  };
  deliveryMethod: string;
  paymentMethod: string;
}) => {
  const noteText = formatNoteText(order.address?.note);
  return `HITNO: Plaćanje je uspjelo, ali kreiranje narudžbe #${order.orderNumber} nije uspjelo.

Kupac: ${order.address.name} ${order.address.surname}
Email: ${order.address.email}
Telefon: ${order.address.phoneNumber}
Način dostave: ${order.deliveryMethod === 'pickup' ? 'Preuzimanje' : 'Dostava'}
Način plaćanja: ${order.paymentMethod === 'card' ? 'Kartica' : order.paymentMethod === 'virman' ? 'Virman' : 'Gotovina'}
${noteText ? `\n${noteText}` : ''}

Potrebna je hitna intervencija! Plaćanje je primljeno, ali narudžba nije pravilno zabilježena u sustavu.`;
};
function renderUserOrderFailureEmail(order: {
  address: { name: any };
  orderNumber: any;
}) {
  return renderWrapper(`<div style="padding: 20px 24px 0 24px;">
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
</div>`);
}
const userOrderFailureText = (order) => {
  const noteText = formatNoteText(order.address?.note);
  return `Poštovani ${order.address.name},

Vaša uplata za narudžbu #${order.orderNumber} je uspješno zaprimljena, no došlo je do tehničkog problema pri obradi narudžbe.

Naš tim je već obaviješten i rješava problem što je brže moguće. 
${noteText ? `\n\n${noteText}` : ''}

${contactInfoText()}

Hvala na razumijevanju!`;
};

function renderWrapper(content) {
  return `<div style="background-color: #f5f5f7; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';">
<div style="max-width: 720px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
${content}
</div>
</div>`;
}

const formatPrice = (price: number) => {
  return price.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

function renderBillingAndPaymentSection(order: OrderPopulated) {
  const totalPrice = order.items.reduce((acc, item: any) => {
    const price = item.product.discountedPrice
      ? item.product.discountedPrice * item.quantity
      : item.product.originalPrice * item.quantity;
    return acc + price;
  }, 0);

  const addr = order.address;
  const priceWithoutDelivery = order.totalPrice - (order.deliveryPrice || 0);
  const formatPriceWithCurrency = (price: number) =>
    `${formatPrice(price)} ${CURRENCY}`;

  const giftHtml = order.isGift
    ? `<div style="margin: 20px 0 0 0; padding: 12px; background: #fff3cd; border-radius: 8px; color: #856404; font-size: 14px; border:1px solid #ffe08c;">🎁 Ova narudžba je označena kao poklon!</div>`
    : '';

  const totals = `<table style="width: 100%; border-collapse: collapse; margin-top: 20px; border-top: 1px solid #e5e5e5; padding-top: 20px;">
<tbody>
<tr>
<td style="padding: 8px 0; font-size: 15px; color: #1d1d1f;">Cijena artikala</td>
<td style="padding: 8px 0; font-size: 15px; color: #1d1d1f; text-align: right;">${formatPriceWithCurrency(totalPrice)}</td>
</tr>
${
  totalPrice != priceWithoutDelivery
    ? `<tr>
<td style="padding: 8px 0; font-size: 15px; color: #1d1d1f;">Naknada za plaćanje na rate</td>
<td style="padding: 8px 0; font-size: 15px; color: #1d1d1f; text-align: right;">${formatPriceWithCurrency(priceWithoutDelivery - totalPrice)}</td>
</tr>`
    : ``
}
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
Način plaćanja: ${order.paymentMethod === 'cash' ? 'Pouzećem' : order.paymentMethod === 'virman' ? 'Virman' : 'Kartica'}
</td>
</tr>
</tbody>
</table>`;

  return `<h2 style="font-size: 20px; color: #1d1d1f; margin: 40px 0 10px 0;">Naplata i plaćanje</h2>
<hr style="border: none; border-top: 1px solid #e5e5e5; margin-bottom: 20px;" />
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="width: 50%; vertical-align: top; padding-right: 10px;">
<p style="font-size: 16px; color: #1d1d1f; font-weight: 500; margin: 0 0 5px 0;">Kontakt za naplatu</p>
<p style="font-size: 16px; color: #515154; line-height: 1.5; margin: 0;">
${addr.name || ''} ${addr.surname || ''}<br>
${addr.email ? `<a href="mailto:${addr.email}" style="color:#0066cc; text-decoration:none;">${addr.email}</a><br>` : ''}
${addr.phoneNumber || ''}
</p>
</td>
<td style="width: 50%; vertical-align: top; padding-left: 10px;">
<p style="font-size: 16px; color: #1d1d1f; font-weight: 500; margin: 0 0 5px 0;">Adresa za naplatu</p>
<p style="font-size: 16px; color: #515154; line-height: 1.5; margin: 0;">
${addr.name || ''} ${addr.surname || ''}<br>
${order.selectedStore ? `Preuzimanje u poslovnici ${order.selectedStore}` : addr.address || ''}<br>
${addr.city || ''} ${addr.postalCode || ''}
</p>
</td>
</tr>
</table>
${giftHtml}
${totals}`;
}

function renderOrderDetails(order: OrderPopulated) {
  const formatPriceWithCurrency = (price: number) =>
    `${formatPrice(price)} ${CURRENCY}`;

  const itemsHtml = order.items
    .map((item: any) => {
      const product = item.product || {};
      const productPath = getProductPath(product);
      const productUrl = buildStorefrontUrl(productPath);
      const hasImage =
        product.images && product.images.length && product.images[0].url;
      const imageHtml = hasImage
        ? `<a href="${productUrl}" style="display:block;"><img src="${strapiUrl}${product.images[0].url}"
alt="${product.name}"
width="60"
style="display: block; width: 60px; max-width: 60px; height: auto; border-radius: 8px; border: 1px solid #e5e5e5;"></a>`
        : `<a href="${productUrl}" style="display:block; width: 60px; height: 60px; border-radius: 8px; background: #f5f5f5;"></a>`;
      const basePrice = product.discountedPrice ?? product.originalPrice ?? 0;
      const numericBasePrice = Number(basePrice);
      const itemPrice = numericBasePrice * item.quantity;

      return `<tr style="border-bottom: 1px solid #e5e5e5;">
<td style="padding: 20px 0;">
<table style="width: 100%; border-collapse: collapse;">
<tr>
<td style="width: 80px; padding-right: 20px; vertical-align: top;">
${imageHtml}
</td>
<td style="vertical-align: top;">
<p style="margin: 0; font-size: 16px; font-weight: 600; color: #1d1d1f;"><a href="${productUrl}" style="color: #0066cc; text-decoration: none;">${product.name}</a></p>
<p style="margin: 5px 0 0 0; font-size: 14px; color: #515154;">Količina: ${item.quantity}</p>
</td>
<td style="vertical-align: top; text-align: right; font-size: 16px; color: #1d1d1f; font-weight: 500;">
${formatPriceWithCurrency(itemPrice)}
</td>
</tr>
</table>
</td>
</tr>`;
    })
    .join('');

  return `<h2 style="font-size: 20px; color: #1d1d1f; margin: 40px 0 10px 0;">${order.deliveryMethod === 'delivery' ? 'Artikli za slanje' : 'Artikli'}</h2>
<table style="width: 100%; border-collapse: collapse;">
<tbody>
${itemsHtml}
</tbody>
</table>`;
}

function renderDeliveryAddress(order: OrderPopulated) {
  const addr = order.address;
  const noteHtml = addr.note
    ? `<br><br><strong>Napomena:</strong> ${addr.note}`
    : '';
  return `<h2 style="font-size: 20px; color: #1d1d1f; margin: 40px 0 10px 0;">${order.deliveryMethod === 'delivery' ? 'Adresa za dostavu' : 'Detalji narudžbe'}</h2>
<hr style="border: none; border-top: 1px solid #e5e5e5; margin-bottom: 20px;" />
<p style="font-size: 16px; color: #515154; line-height: 1.5; margin: 0;">
${addr.name || ''} ${addr.surname || ''}<br>
${order.selectedStore ? `Preuzimanje u poslovnici ${order.selectedStore}` : addr.address || ''}<br>
${addr.city || ''} ${addr.postalCode || ''}<br>
${addr.phoneNumber || ''}${noteHtml}
</p>`;
}

function renderLogo() {
  return `<div style="text-align: left; padding: 32px 0 24px 0;">
<img src="${logoUrl}" alt="Logo" style="max-width: 120px; height: auto;">
</div>`;
}
