import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { generatePreInvoicePdf } from '@/lib/pdf/generate';
import type { InvoiceData } from '@/lib/types';

function logStep(step: string, ...data: any[]) {
  console.log(`[${new Date().toISOString()}] [${step}]`, ...data);
}
function logError(step: string, ...data: any[]) {
  console.error(`[${new Date().toISOString()}] [${step}][ERROR]`, ...data);
}

export async function POST(req: NextRequest) {
  const stepPrefix = `POST /api/pre-invoice`;

  try {
    logStep(`${stepPrefix} - Parse JSON`);
    const body = await req.json();
    const { invoiceData } = body as { invoiceData: InvoiceData };

    if (!invoiceData) {
      logError(`${stepPrefix} - No invoiceData in body`, body);
      throw {
        status: 400,
        name: 'MissingInvoiceData',
        message: 'Missing invoiceData in request body.',
      };
    }
    if (!invoiceData.organization) {
      logError(`${stepPrefix} - Missing organization`, invoiceData);
      throw {
        status: 400,
        name: 'MissingOrganization',
        message: 'Organization information is missing.',
      };
    }

    // PDF GENERATION
    logStep(`${stepPrefix} - Start PDF generation`);
    let pdfBuffer;
    try {
      pdfBuffer = await generatePreInvoicePdf(
        invoiceData.organization,
        invoiceData.cart,
        invoiceData.invoiceNumber,
        invoiceData.totalPrice
      );
    } catch (e) {
      logError(`${stepPrefix} - PDF generation failed`, e);
      throw {
        status: 500,
        name: 'PdfGenerationError',
        message: 'Failed to generate PDF.',
      };
    }
    if (!pdfBuffer || !pdfBuffer.length) {
      logError(`${stepPrefix} - PDF buffer empty or missing`, pdfBuffer);
      throw {
        status: 500,
        name: 'PdfGenerationError',
        message: 'PDF buffer is empty.',
      };
    }
    logStep(
      `${stepPrefix} - PDF generation completed, size: ${pdfBuffer.length} bytes`
    );

    // FORM DATA / BLOB
    let pdfBlob, formData;
    try {
      logStep(`${stepPrefix} - Creating Blob and FormData`);
      pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
      formData = new FormData();
      formData.append(
        'files',
        pdfBlob,
        `invoice-${invoiceData.invoiceNumber}.pdf`
      );
      logStep(
        `${stepPrefix} - Blob and FormData created`,
        `Blob size: ${pdfBlob.size} bytes`
      );
    } catch (e) {
      logError(`${stepPrefix} - Blob/FormData creation failed`, e);
      throw {
        status: 500,
        name: 'FormDataError',
        message: 'Failed to create PDF blob or form data.',
      };
    }

    // UPLOAD TO STRAPI WITH TIMEOUT
    let uploadRes;
    const controller = new AbortController();
    const fetchTimeoutMs = 12000;
    const timeout = setTimeout(() => {
      controller.abort();
      logError(
        `${stepPrefix} - Strapi upload request timed out after ${fetchTimeoutMs}ms`
      );
    }, fetchTimeoutMs);

    try {
      logStep(`${stepPrefix} - Uploading to Strapi...`);
      uploadRes = await fetch(`${STRAPI_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeout);
    } catch (e) {
      clearTimeout(timeout);
      logError(`${stepPrefix} - Fetch error uploading PDF`, e);
      throw {
        status: 502,
        name: 'UploadNetworkError',
        message: 'Network error during upload to Strapi.',
      };
    }

    if (!uploadRes) {
      logError(`${stepPrefix} - No response from upload endpoint`);
      throw {
        status: 502,
        name: 'UploadNoResponse',
        message: 'No response from Strapi upload endpoint.',
      };
    }
    if (!uploadRes.ok) {
      let errBody: any = {};
      try {
        errBody = await uploadRes.json();
      } catch {}
      logError(
        `${stepPrefix} - Upload failed`,
        uploadRes.status,
        uploadRes.statusText,
        errBody
      );
      throw {
        status: uploadRes.status,
        name: 'UploadError',
        message:
          errBody?.error?.message ||
          uploadRes.statusText ||
          'Failed to upload PDF to Strapi.',
      };
    }

    // PROCESS UPLOAD RESPONSE
    let uploaded;
    try {
      logStep(`${stepPrefix} - Parsing upload response JSON`);
      uploaded = await uploadRes.json();
    } catch (e) {
      logError(`${stepPrefix} - Failed to parse upload response`, e);
      throw {
        status: 502,
        name: 'UploadResponseParseError',
        message: 'Failed to parse Strapi upload response.',
      };
    }
    if (
      !uploaded ||
      !Array.isArray(uploaded) ||
      !uploaded[0] ||
      !uploaded[0].id
    ) {
      logError(`${stepPrefix} - Invalid or empty upload response`, uploaded);
      throw {
        status: 502,
        name: 'UploadMalformedResponse',
        message: 'Invalid response from Strapi upload endpoint.',
      };
    }

    logStep(`${stepPrefix} - PDF uploaded successfully`, uploaded[0].url);
    return NextResponse.json(
      {
        message: 'Invoice PDF generated and uploaded successfully.',
        file: uploaded[0],
      },
      { status: 200 }
    );
  } catch (err: any) {
    // Unified error response and logging
    const status = err?.status || 500;
    const name = err?.name || 'ServerError';
    const message = err?.message || 'Internal server error.';
    logError(`${stepPrefix} - Handler error`, err);
    return NextResponse.json(
      {
        error: { status, name, message },
      },
      { status }
    );
  }
}
