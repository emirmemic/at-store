import { AT_STORE_INFO, CURRENCY } from '@/lib/constants';
import type {
  InvoiceData,
  ShoppingCartItem,
  UserInformation,
} from '@/lib/types';

export const generateInvoiceHTML = ({
  organization,
  cart,
  invoiceNumber,
  totalPrice,
}: InvoiceData) => {
  const businessEmail = AT_STORE_INFO.businessEmail;
  return `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 2rem; color:#121212; font-size: 12px; }
       
      </style>
    </head>
    <body>
      ${makeHeader()}
      <div style="margin-top: 3rem; display: flex; justify-content: space-between; gap: 1rem;">
      ${organization ? makeOrganizationInfo(organization) : ''}
      ${makeInvoiceInfo(
        invoiceNumber,
        formatDate(new Date()),
        'Sarajevo',
        'Virman­sko plaćanje',
        'Veleprodaja'
      )}
      </div>

      <div style="margin-top: 3rem;">
        ${makeProductsTable(cart, totalPrice)}
      </div>

      <div style="margin-top: 4rem; font-size: 12px; color: #444;">
        <strong>Napomena:</strong><br/>
        Ova ponuda važi 24 sata. Nakon izvršene uplate, pošaljite potvrdu o uplati na email adresu <a href="mailto:${businessEmail}">${businessEmail}</a>.
      </div>
    </body>
  </html>
`;
};

const makeHeader = () => {
  const {
    logoUrl,
    name,
    address,
    id,
    pdv,
    registry,
    email,
    phone,
    website,
    bankAccounts,
  } = AT_STORE_INFO;
  const bankAccountsHtml = bankAccounts
    .map((acc) => `${acc.account} ${acc.bank}<br/>`)
    .join('');
  return `
    <div
      class="header"
      style="display: flex; justify-content: space-between; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #cac3c3;"
    >
      <div style="display: flex; align-items: center;">
        <img
          alt="Logo"
          src="${logoUrl}"
          style="height: 50px; width: 120px; margin-right: 1rem; object-fit: contain;"
        />
        <div style="border-left: 3px solid #c81b1b; padding-left: 10px;">
          <strong>${name}</strong><br />
          ${address}<br />
          ID: ${id}<br />
          PDV: ${pdv}<br />
          Sudski registar: ${registry}<br />
          <div style="display: flex; gap: 8px;">
            <a href="https://${website}">${website}</a> |
            <a href="mailto:${email}">${email}</a> |
            ${phone}
          </div>
        </div>
      </div>
      <div style="margin-top: 1rem;">
        <strong>Žiro računi:</strong><br />
        ${bankAccountsHtml}
      </div>
    </div>
  `;
};

const makeOrganizationInfo = (organization: UserInformation) => {
  const accountDetails = organization?.accountDetails;
  if (!accountDetails) return '';
  const { companyName, address, companyIdNumber } = accountDetails;
  return `
    <div style="border-left: 3px solid #c81b1b; padding-left: 10px; display: flex; flex-direction: column; gap: 5px;">
      <div style="font-size: 10px; color:#2e2e30;">KUPAC:</div>
      <div style="font-size: 14px; font-weight: bold;">${companyName || ''}</div>
      <div>${address || ''}</div>
      <div style="font-size: 11px; color: #444;">ID: ${companyIdNumber || ''}</div>
    </div>
  `;
};

const makeInvoiceInfo = (
  invoiceNumber: string,
  issueDate: string,
  location = 'Sarajevo',
  paymentMethod = 'Virman­sko plaćanje',
  businessUnit = 'Veleprodaja'
) => {
  return `
    <div style="text-align: right; font-size: 12px;">
      <div style="color:#c81b1b; font-weight: bold; font-size: 16px; margin-bottom: 0.5rem;">
        Predračun/Ponuda - ${invoiceNumber}
      </div>
      <div>
        Poslovna jedinica: ${businessUnit}<br />
        ${location}, ${issueDate}<br />
        Način plaćanja: ${paymentMethod}
      </div>
    </div>
  `;
};

const makeProductsTable = (cart: ShoppingCartItem[], totalPrice: number) => {
  const vatPercent = 17;

  const rows = cart
    .map((item, index) => {
      const { product } = item;
      const quantity = item.quantity;
      const quantityFormatted = quantity.toFixed(3);

      const originalGrossUnitPrice = product.originalPrice; // Includes VAT
      const discountedGrossUnitPrice =
        product.discountedPrice ?? originalGrossUnitPrice;

      // Values per unit
      const grossTotal = discountedGrossUnitPrice * quantity;
      const netUnitPrice = discountedGrossUnitPrice / (1 + vatPercent / 100);
      const vatPerUnit = discountedGrossUnitPrice - netUnitPrice;

      const netTotal = netUnitPrice * quantity;
      const vatTotal = vatPerUnit * quantity;

      const discountAmountPerUnit =
        originalGrossUnitPrice - discountedGrossUnitPrice;
      const discountPercent =
        originalGrossUnitPrice > 0
          ? (discountAmountPerUnit / originalGrossUnitPrice) * 100
          : 0;

      return `
        <tr style="text-align: center; vertical-align: middle; border-bottom: 1px solid #ccc; height: 48px;">
          <td style="background: #c62828; color: white; font-weight: bold;">${index + 1}</td>
          <td style="text-align: left; padding: 0.5rem; display: flex; gap: 4px; flex-direction: column;">
            <strong>${product.displayName}</strong>
            <span style="font-size: 10px; color: #999;">${product.productVariantId}</span>
          </td>
          <td>KOM</td>
          <td>${quantityFormatted}</td>
          <td>${formatPrice(originalGrossUnitPrice / 1.17)}</td>
          <td>${formatPrice((originalGrossUnitPrice / 1.17) * quantity)}</td>
          <td>${discountPercent > 0 ? formatPrice(discountPercent) : '0,00'}</td>
          <td>${discountAmountPerUnit > 0 ? formatPrice(discountAmountPerUnit * quantity) : '0,00'}</td>
          <td>${formatPrice(netUnitPrice)}</td>
          <td>${formatPrice(netTotal)}</td>
          <td>${vatPercent}</td>
          <td>${formatPrice(vatTotal)}</td>
          <td style="background: #c62828; color: white; font-weight: bold;">
            ${formatPrice(grossTotal)}
          </td>
        </tr>
      `;
    })
    .join('');

  const totalGross = totalPrice;
  const totalNet = totalGross / (1 + vatPercent / 100);
  const vatTotal = totalGross - totalNet;

  return `
    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
      <thead>
        <tr style="background: #f5f5f5; text-align: center; vertical-align: middle; height: 48px;">
          <th>RB</th>
          <th>OPIS</th>
          <th>JED. MJ</th>
          <th>KOL</th>
          <th>CIJENA BEZ PDV</th>
          <th>VRIJ. BEZ PDV</th>
          <th>% RAB.</th>
          <th>IZN. RAB.</th>
          <th>CIJENA POSLIJE RABATA</th>
          <th>VELEP. VRIJ.</th>
          <th>% PDV</th>
          <th>IZN. PDV</th>
          <th>PROD. VRIJ. SA PDV</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr style="font-weight: bold; text-align: center; vertical-align: middle; height: 48px;">
          <td colspan="5"></td>
          <td style="text-align: right;">${formatPrice(totalNet)}</td>
          <td colspan="2"></td>
          <td></td>
          <td>${formatPrice(totalNet)}</td>
          <td></td>
          <td>${formatPrice(vatTotal)}</td>
          <td>${formatPrice(totalGross)}</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 2rem; width: 100%; font-size: 14px;">
      <table style="width: 100%;">
        <tr style="font-weight: bold;">
          <td style="text-align: right; padding: 0.5rem 0;">Vrijednost bez PDV:</td>
          <td style="text-align: right; width: 100px; padding: 0.5rem 0;">${formatPrice(totalNet)}</td>
        </tr>
        <tr style="font-weight: bold;">
          <td style="text-align: right; padding: 0.5rem 0;">PDV ${vatPercent}%:</td>
          <td style="text-align: right; padding: 0.5rem 0;">${formatPrice(vatTotal)}</td>
        </tr>
        <tr style="font-weight: bold; color: #c62828;">
          <td style="text-align: right; padding: 0.5rem 0;">Vrijednost sa PDV:</td>
          <td style="text-align: right; padding: 0.5rem 0;">${CURRENCY} ${formatPrice(totalGross)}</td>
        </tr>
      </table>
    </div>
  `;
};

const formatDate = (date: Date) => {
  return date.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const formatPrice = (price: number) => {
  return price.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
