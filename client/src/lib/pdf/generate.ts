import puppeteer, { Browser, Page } from 'puppeteer';

import { ShoppingCartItem, UserInformation } from '../types';

import { generateInvoiceHTML } from './invoiceHtml';

export async function generatePreInvoicePdf(
  organization: UserInformation,
  cart: ShoppingCartItem[],
  invoiceNumber: string,
  totalPrice: number
) {
  let browser: Browser | null = null;
  let page: Page | null = null;

  const stepPrefix = `PuppeteerPDF [Invoice: ${invoiceNumber}]`;
  console.log(`[${stepPrefix}] Launching puppeteer browser`);
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  page = await browser.newPage();
  console.log(`[${stepPrefix}] Browser page created`);
  const html = generateInvoiceHTML({
    organization,
    cart,
    invoiceNumber,
    totalPrice,
  });

  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });
  console.log(`[${stepPrefix}] PDF generated`);

  await browser.close();
  console.log(`[${stepPrefix}] Browser closed`);
  if (!pdfBuffer) {
    throw new Error('Failed to generate PDF buffer');
  }
  console.log(`[${stepPrefix}] PDF buffer ready`);
  if (pdfBuffer.length === 0) {
    throw new Error('Generated PDF buffer is empty');
  }
  console.log(`[${stepPrefix}] PDF buffer size: ${pdfBuffer.length} bytes`);
  return pdfBuffer;
}
