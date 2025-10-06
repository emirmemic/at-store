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
  const timeoutMs = Number(process.env.PDF_GENERATION_TIMEOUT ?? 45000);
  let browser: Browser | null = null;
  let page: Page | null = null;

  const stepPrefix = `PuppeteerPDF [Invoice: ${invoiceNumber}]`;

  const withTimeout = async <T>(promise: Promise<T>, label: string) => {
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(
          new Error(`${label} timed out after ${timeoutMs} ms (PuppeteerPDF)`)
        );
      }, timeoutMs);

      promise
        .then((result) => {
          clearTimeout(timer);
          resolve(result);
        })
        .catch((error) => {
          clearTimeout(timer);
          reject(error);
        });
    });
  };

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    page = await browser.newPage();
    page.setDefaultNavigationTimeout(timeoutMs);
    page.setDefaultTimeout(timeoutMs);

    const html = generateInvoiceHTML({
      organization,
      cart,
      invoiceNumber,
      totalPrice,
    });

    // Avoid waiting for external resources that may be blocked in production
    await withTimeout(
      page.setContent(html, {
        waitUntil: 'domcontentloaded',
        timeout: timeoutMs,
      }),
      'page.setContent'
    );

    const pdfBuffer = await withTimeout(
      page.pdf({
        format: 'A4',
        printBackground: true,
      }),
      'page.pdf'
    );

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
