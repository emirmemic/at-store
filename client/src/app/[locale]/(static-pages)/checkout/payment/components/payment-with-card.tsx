/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// This tells TS “trust me, Monri exists at runtime”
declare const Monri: any;

import { redirect } from 'next/navigation';
import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { useCartProvider } from '@/app/providers';
import { IconLoader } from '@/components/icons';
import { OutOfStockPopup } from '@/components/popup';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { CURRENCY_ISO } from '@/lib/constants';
import { toast } from '@/lib/hooks';
import { getMonriUrl } from '@/lib/utils/utils';

import { useCheckoutProvider } from '../../providers/checkout-provider';
import { OrderSuccessData } from '../../types';
import { generateOrderNumber } from '../../utils';
import { createOrder, getProductsStatus, OrderPayload } from '../actions';
import { PaymentResult, Result } from '../types';

const orderInfo = 'Purchase products';

export default function PaymentWithCard() {
  const t = useTranslations();
  // PROVIDERS
  const { getTotalPrice, cart, clearCart } = useCartProvider();
  const {
    deliveryForm,
    deliveryMethod,
    selectedStore,
    isGift,
    setOrderSuccessData,
    getDeliveryPrice,
  } = useCheckoutProvider();
  // STATES
  const [clientSecret, setClientSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [outOfStockDialog, setOutOfStockDialog] = useState(false);
  const [outOfStockProducts, setOutOfStockProducts] = useState<string[]>([]);
  const [installmentOptions, setInstallmentOptions] = useState<any[]>([]);
  const [selectedInstallment, setSelectedInstallment] = useState<string | null>(
    null
  );
  // REFS
  const cardRef = useRef<any>(null);
  const monriRef = useRef<any>(null);

  // CONSTANTS
  const deliveryPrice = getDeliveryPrice();
  const totalPrice = getTotalPrice() + deliveryPrice;

  useEffect(() => {
    const orderNumber = generateOrderNumber();

    // Check if products are in stock
    async function checkProductsStatus() {
      const productsIds = cart.map((item) => item.product.productVariantId);
      const res = await getProductsStatus(productsIds);
      if (res.error) {
        setOutOfStockDialog(true);
      } else if (res.data) {
        const stockProducts = res.data;
        const isOutOfStock = cart.some((cartItem) => {
          const stockItem = stockProducts.find(
            (item) =>
              item.productVariantId === cartItem.product.productVariantId
          );
          const isOut =
            stockItem && cartItem.quantity > stockItem.amountInStock;

          if (isOut) {
            setOutOfStockProducts((prev) => [...prev, cartItem.product.name]);
          }
          return isOut;
        });
        if (isOutOfStock) {
          setOutOfStockDialog(true);
        } else {
          createPayment();
        }
      }
    }
    if (cart && cart.length > 0) {
      checkProductsStatus();
    }

    // Fetch clientSecret from our backend
    async function createPayment() {
      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice,
          currency: CURRENCY_ISO,
          order_info: orderInfo,
          transaction_type: 'purchase',
          order_number: orderNumber,
        }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    }
  }, [totalPrice, t, cart]);

  useEffect(() => {
    if (!clientSecret) return;
    setIsLoading(false);

    // Load Monri and mount card
    monriRef.current = Monri(process.env.NEXT_PUBLIC_MONRI_AUTH_TOKEN, {
      locale: 'hr',
    });

    const components = monriRef.current.components({
      clientSecret,
    });
    cardRef.current = components.create('card', {
      showInstallmentsSelection: true,
    });

    const cardElement = document.getElementById('card-element');
    if (cardElement) {
      cardElement.innerHTML = ''; // Clear previous Monri component if exists
    }

    cardRef.current.mount('card-element');

    cardRef.current.onChange((e: { error: { message: string | null } }) => {
      const displayError = document.getElementById('card-errors');
      if (e.error && displayError) {
        displayError.textContent = e.error.message;
      } else {
        if (displayError) {
          displayError.textContent = '';
        }
      }
    });
  }, [clientSecret]);

  useEffect(() => {
    function handleInstallmentsEvent(event: any) {
      const options = event.detail.installments;
      setInstallmentOptions(options);
    }

    window.addEventListener('installments-event', handleInstallmentsEvent);
    return () => {
      window.removeEventListener('installments-event', handleInstallmentsEvent);
    };
  }, []);

  useEffect(() => {
    if (!clientSecret) return;
  }, [clientSecret]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const transactionParams = {
      address: deliveryForm?.address,
      fullName: `${deliveryForm?.name} ${deliveryForm?.surname}`,
      city: deliveryForm?.city,
      zip: deliveryForm?.postalCode,
      phone: deliveryForm?.phoneNumber,
      country: deliveryForm?.country,
      email: deliveryForm?.email,
      orderInfo: orderInfo,
      ...(selectedInstallment ? { installments: selectedInstallment } : {}),
    };

    monriRef.current
      .confirmPayment(cardRef.current, transactionParams)
      .then(function (result: Result<PaymentResult>) {
        setIsLoading(false);
        if (result.error) {
          // Inform the customer that there was an error.
          const errorElement = document.getElementById('card-errors');
          if (errorElement) {
            errorElement.textContent = result.error.message;
          }
        } else {
          handlePaymentResult(result.result);
        }
      });

    async function handlePaymentResult(paymentResult: PaymentResult | null) {
      // Handle PaymentResult
      if (paymentResult?.response_code === '5000') {
        // Payment is pending
      } else if (paymentResult?.status === 'approved') {
        // Create order
        const orderPayload: OrderPayload = {
          items: cart.map((item) => ({
            productVariantId: item.product.productVariantId,
            productDocumentId: item.product.documentId,
            quantity: item.quantity,
            name: item.product.name,
          })),
          isGift,
          address: deliveryForm,
          deliveryMethod,
          deliveryPrice,
          selectedStore: deliveryMethod === 'pickup' ? selectedStore : null,
          totalPrice: totalPrice,
          orderNumber: paymentResult?.order_number,
          paymentMethod: 'card',
        };

        try {
          await createOrder(orderPayload);
        } catch {
          setIsLoading(false);
          return;
        }
        clearCart();
        const orderSuccessData: OrderSuccessData = {
          items: cart.map((item) => ({
            name: item.product.name,
            image: item.product?.images?.[0] || null,
            price: item.product.discountedPrice || item.product.originalPrice,
            quantity: item.quantity,
          })),
          isGift,
          deliveryMethod: deliveryMethod,
          paymentMethod: 'card',
          orderNumber: paymentResult?.order_number,
          totalPrice: totalPrice,
        };
        setOrderSuccessData(orderSuccessData);
        redirect(PAGE_NAMES.CHECKOUT_SUCCESS);
      } else if (paymentResult?.status === 'declined') {
        toast({
          title: t('checkoutPage.paymentDeclined'),
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('common.somethingWentWrong'),
          variant: 'destructive',
        });
        redirect(PAGE_NAMES.CHECKOUT);
      }
    }
  }

  return (
    <>
      <Script
        src={`${getMonriUrl()}/dist/components.js`}
        strategy="afterInteractive"
      />
      <form
        className="relative flex flex-col gap-3"
        method="post"
        onSubmit={handleSubmit}
      >
        {isLoading && (
          <div className="absolute right-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-md bg-white">
            <IconLoader size={32} />
          </div>
        )}
        <label htmlFor="card-element">
          {t('checkoutPage.paymentPage.enterCard')}
        </label>
        <div id="card-element">
          {/* <!-- A Monri Component will be inserted here. --> */}
        </div>

        {/* <!-- Used to display Component errors. --> */}
        <div id="card-errors" role="alert" style={{ color: 'red' }}></div>

        {installmentOptions.length > 0 && (
          <div>
            <label htmlFor="installments">Plaćanje na rate:</label>
            <select
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              id="installments"
              value={selectedInstallment ?? ''}
              onChange={(e) => setSelectedInstallment(e.target.value)}
            >
              <option value="">Odaberi broj rata</option>
              {installmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <Button
          className="mt-3 self-end"
          disabled={!clientSecret}
          size={'lg'}
          type="submit"
          typography={'button1'}
          variant={'filled'}
        >
          {t('common.continue')}
        </Button>
      </form>
      {outOfStockDialog && (
        <OutOfStockPopup
          isOpen={outOfStockDialog}
          outOfStockProducts={outOfStockProducts}
          onOpenChange={(open) => {
            setOutOfStockDialog(open);
            if (!open) {
              redirect(PAGE_NAMES.ABOUT);
            }
          }}
        />
      )}
    </>
  );
}
