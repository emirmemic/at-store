import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { generatePreInvoicePdf } from '@/lib/pdf/generate';
import type { InvoiceData } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const { invoiceData } = (await req.json()) as {
      invoiceData: InvoiceData;
    };

    if (!invoiceData.organization) {
      return NextResponse.json(
        {
          error: {
            status: 400,
            name: 'MissingOrganization',
            message: 'Organization information is missing.',
          },
        },
        { status: 400 }
      );
    }
    const pdfBuffer = await generatePreInvoicePdf(
      invoiceData.organization,
      invoiceData.cart,
      invoiceData.invoiceNumber,
      invoiceData.totalPrice
    );
    const formData = new FormData();
    formData.append(
      'files',
      new Blob([pdfBuffer], { type: 'application/pdf' }),
      `invoice-${invoiceData.invoiceNumber}.pdf`
    );
    const uploadRes = await fetch(`${STRAPI_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!uploadRes.ok) {
      const errBody = await uploadRes.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: {
            status: uploadRes.status,
            name: 'UploadError',
            message: errBody?.error?.message ?? uploadRes.statusText,
          },
        },
        { status: uploadRes.status }
      );
    }

    const uploaded = await uploadRes.json();
    if (!uploaded || !Array.isArray(uploaded) || uploaded.length === 0) {
      return NextResponse.json(
        {
          error: {
            status: 500,
            name: 'UploadError',
            message: 'No files were uploaded successfully.',
          },
        },
        { status: 500 }
      );
    }
    // Assuming the first item in the array is the uploaded file
    const uploadedFile = uploaded[0];

    return NextResponse.json(
      {
        message: 'Invoice PDF generated successfully.',
        file: uploadedFile,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        error: {
          status: 500,
          name: 'ServerError',
          message:
            err instanceof Error ? err.message : 'Internal server error.',
        },
      },
      { status: 500 }
    );
  }
}
