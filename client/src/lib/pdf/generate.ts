import puppeteer from 'puppeteer';

import { ShoppingCartItem, UserInformation } from '../types';

import { generateInvoiceHTML } from './invoiceHtml';

export async function generatePreInvoicePdf(
  organization: UserInformation,
  cart: ShoppingCartItem[],
  invoiceNumber: string,
  totalPrice: number
) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
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

  await browser.close();
  return pdfBuffer;
}
