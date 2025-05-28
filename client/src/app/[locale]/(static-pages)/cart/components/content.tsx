'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useCartProvider } from '@/app/providers';
import { useUserProvider } from '@/app/providers/user-provider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { useLoader } from '@/lib/hooks';
import {
  CreateInvoiceResponse,
  InvoiceData,
  InvoiceGenerateResponse,
} from '@/lib/types';
import { generateIdFromDate } from '@/lib/utils/utils';

import CartItemsList from './cart-items-list';
import EmptyCart from './empty-cart';
import TotalPriceSection from './total-price-section';

const generatePdf = async (
  invoiceData: InvoiceData
): Promise<InvoiceGenerateResponse> => {
  const path = '/api/generate-invoice';
  const body = JSON.stringify({ invoiceData });
  const res = await fetch(path, {
    method: 'POST',
    body,
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.error?.message || 'Failed to generate PDF');
  }

  const data: InvoiceGenerateResponse = await res.json();
  return data;
};

const createInvoice = async (
  fileId: string,
  invoiceNumber: string,
  totalPrice: number
) => {
  const path = `${STRAPI_BASE_URL}/api/organization-pre-invoices/create-from-cart`;
  const res = await fetchAPI<CreateInvoiceResponse>(path, {
    method: 'POST',
    body: { fileId, invoiceNumber, totalPrice },
  });
  return res;
};

export default function Content() {
  const t = useTranslations();
  const { cart, clearCart, getTotalPrice } = useCartProvider();
  const { user } = useUserProvider();

  // States and Variables
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  // Handlers
  const handleInvoice = async () => {
    const invoiceNumber = `INV-${generateIdFromDate()}`;
    const data: InvoiceData = {
      organization: user,
      cart,
      invoiceNumber,
      totalPrice: getTotalPrice(),
    };
    const pdfData = await generatePdf(data);
    if ('error' in pdfData) {
      setErrorMessage(pdfData.error.message);
      return null;
    }
    const fileId = String(pdfData.file.id);
    const response = await createInvoice(
      fileId,
      invoiceNumber,
      data.totalPrice
    );
    const finalUrl = `${STRAPI_BASE_URL}${response.data?.pdfFile.url}`;
    setPdfUrl(finalUrl);
    return response ?? null;
  };

  const handleSuccess = () => {
    setSuccessMessage(t('cartPage.preInvoiceSuccess'));
    clearCart();
  };

  const { isLoading, execute } = useLoader({
    apiCall: () => handleInvoice(),
    onSuccess: () => {
      handleSuccess();
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });
  return (
    <>
      {cart && cart.length > 0 ? (
        <>
          <CartItemsList />
          <TotalPriceSection handleInvoice={execute} isLoading={isLoading} />
        </>
      ) : (
        <EmptyCart />
      )}
      <div className="flex flex-col items-center justify-center gap-3 py-4">
        {errorMessage && (
          <Alert
            dismissible
            variant="destructive"
            onClose={() => {
              setErrorMessage('');
            }}
          >
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        {successMessage && (
          <Alert
            dismissible
            variant="success"
            onClose={() => {
              setSuccessMessage('');
            }}
          >
            <AlertDescription className="flex flex-col gap-2">
              {successMessage}
              {pdfUrl && (
                <Link
                  className="text-blue underline transition-colors paragraph-2 hover:text-blue-dark"
                  href={pdfUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {t('cartPage.clickToDownloadInvoice')}
                </Link>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </>
  );
}
