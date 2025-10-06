import { ShoppingCartItem, UserInformation } from '../types';
/* eslint-disable no-console */
import puppeteer, { Browser, Page } from 'puppeteer';

import { generateInvoiceHTML } from './invoiceHtml';

export async function generatePreInvoicePdf(
  organization: UserInformation,
  cart: ShoppingCartItem[],
  invoiceNumber: string,
  totalPrice: number
) {
  let browser: Browser | null = null;
  let page: Page | null = null;

  // Set a reasonable timeout for the entire PDF generation process
  const timeoutMs = 30000;
  const stepPrefix = `PuppeteerPDF [Invoice: ${invoiceNumber}]`;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    page = await browser.newPage();

    const html = generateInvoiceHTML({
      organization,
      cart,
      invoiceNumber,
      totalPrice,
    });

    // Set a timeout for setContent, in case of hanging resources
    await Promise.race([
      await page.setContent(html, { waitUntil: 'load' }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('setContent timeout')), timeoutMs)
      ),
    ]);

    const pdfBuffer: Buffer | Uint8Array = await Promise.race([
      page.pdf({
        format: 'A4',
        printBackground: true,
      }),
      new Promise<Buffer | Uint8Array>((_, reject) =>
        setTimeout(() => reject(new Error('pdf() timeout')), timeoutMs)
      ),
    ]);

    return pdfBuffer;
  } catch (err) {
    console.error(`[${stepPrefix}] Error during PDF generation:`, err);
    throw new Error(
      'Failed to generate PDF with Puppeteer: ' +
        (err instanceof Error ? err.message : 'Unknown error')
    );
  } finally {
    // Always close browser and page to avoid resource leaks
    if (page) {
      try {
        await page.close();
      } catch (e) {
        console.warn(`[${stepPrefix}] Error closing Puppeteer page`, e);
      }
    }
    if (browser) {
      try {
        await browser.close();
      } catch (e) {
        console.warn(`[${stepPrefix}] Error closing Puppeteer browser`, e);
      }
    }
  }
}
