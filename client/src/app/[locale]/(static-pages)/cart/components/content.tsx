'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CreateInvoiceResponse,
  InvoiceData,
  InvoiceGenerateResponse,
} from '@/lib/types';

import CartItemsList from './cart-items-list';
import EmptyCart from './empty-cart';
import Link from 'next/link';
import { STRAPI_BASE_URL } from '@/lib/constants';
import TotalPriceSection from './total-price-section';
import { fetchAPI } from '@/lib/fetch-api';
import { generateIdFromDate } from '@/lib/utils/utils';
import { useCartProvider } from '@/app/providers';
import { useLoader } from '@/lib/hooks';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useUserProvider } from '@/app/providers/user-provider';

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

  const totalCartPrice =
    cart.reduce(
      (total, { product: { discountedPrice, originalPrice }, quantity }) =>
        total + (discountedPrice || originalPrice) * quantity,
      0
    ) / 1000;

  return (
    <>
      {cart && cart.length > 0 ? (
        <>
          <section className="mb-12 flex w-full flex-row items-center justify-center gap-2 md:gap-3">
            <h1 className="mb-4 flex flex-col items-center text-center text-xl font-thin tracking-normal md:text-5xl">
              Ukupna cijena korpe iznosi
            </h1>
            <h1 className="mb-4 flex flex-col items-center text-center text-xl font-semibold tracking-normal md:text-5xl">
              {totalCartPrice} KM
            </h1>
          </section>
          <CartItemsList />
          <TotalPriceSection handleInvoice={execute} isLoading={isLoading} />
        </>
      ) : (
        <EmptyCart />
      )}
      {errorMessage && (
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
      )}
    </>
  );
}
