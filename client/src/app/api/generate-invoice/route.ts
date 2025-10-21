import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { generatePreInvoicePdf } from '@/lib/pdf/generate';
import type { InvoiceData } from '@/lib/types';

export async function POST(req: NextRequest) {
  const stepPrefix = `POST /api/pre-invoice`;

  try {
    const body = await req.json();
    const { invoiceData } = body as { invoiceData: InvoiceData };

    if (!invoiceData) {
      throw {
        status: 400,
        name: 'MissingInvoiceData',
        message: 'Missing invoiceData in request body.',
      };
    }
    if (!invoiceData.organization) {
      throw {
        status: 400,
        name: 'MissingOrganization',
        message: 'Organization information is missing.',
      };
    }

    // PDF GENERATION
    let pdfBuffer;
    try {
      pdfBuffer = await generatePreInvoicePdf(
        invoiceData.organization,
        invoiceData.cart,
        invoiceData.invoiceNumber,
        invoiceData.totalPrice
      );
    } catch {
      throw {
        status: 500,
        name: 'PdfGenerationError',
        message: 'Failed to generate PDF.',
      };
    }
    if (!pdfBuffer || !pdfBuffer.length) {
      throw {
        status: 500,
        name: 'PdfGenerationError',
        message: 'PDF buffer is empty.',
      };
    }

    // FORM DATA / BLOB
    let pdfBlob, formData;
    try {
      pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
      formData = new FormData();
      formData.append(
        'files',
        pdfBlob,
        `invoice-${invoiceData.invoiceNumber}.pdf`
      );
    } catch {
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
    }, fetchTimeoutMs);

    try {
      uploadRes = await fetch(`${STRAPI_BASE_URL}/api/upload`, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeout);
    } catch {
      clearTimeout(timeout);
      throw {
        status: 502,
        name: 'UploadNetworkError',
        message: 'Network error during upload to Strapi.',
      };
    }

    if (!uploadRes) {
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
      } catch {
        console.error(
          `${stepPrefix} - Failed to parse error response from Strapi upload`
        );
      }
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
      uploaded = await uploadRes.json();
    } catch {
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
      throw {
        status: 502,
        name: 'UploadMalformedResponse',
        message: 'Invalid response from Strapi upload endpoint.',
      };
    }
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
    return NextResponse.json(
      {
        error: { status, name, message },
      },
      { status }
    );
  }
}
