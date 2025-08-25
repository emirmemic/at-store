/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// This tells TS "trust me, Monri exists at runtime"
declare const Monri: any;

import { OrderPayload, createOrder, getProductsStatus } from '../actions';
import { PaymentResult, Result } from '../types';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { CURRENCY_ISO } from '@/lib/constants';
import { IconLoader } from '@/components/icons';
import { OrderSuccessData } from '../../types';
import { OutOfStockPopup } from '@/components/popup';
import { PAGE_NAMES } from '@/i18n/page-names';
import Script from 'next/script';
import { generateOrderNumber } from '../../utils';
import { getMonriUrl } from '@/lib/utils/utils';
import { redirect } from 'next/navigation';
import { toast } from '@/lib/hooks';
import { useCartProvider } from '@/app/providers';
import { useCheckoutProvider } from '../../providers/checkout-provider';
import { useTranslations } from 'next-intl';

const orderInfo = 'Purchase products';

export default function PaymentWithCard() {
  const t = useTranslations();

  // PROVIDERS
  const { getTotalPrice, cart, clearCart, setInstallmentPrice } =
    useCartProvider();
  const {
    deliveryForm,
    deliveryMethod,
    selectedStore,
    isGift,
    setOrderSuccessData,
    getDeliveryPrice,
  } = useCheckoutProvider();

  // STATE
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [outOfStockDialog, setOutOfStockDialog] = useState(false);
  const [outOfStockProducts, setOutOfStockProducts] = useState<string[]>([]);
  const [selectedInstallment, setSelectedInstallment] = useState<string | null>(
    null
  );
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);

  // REFS
  const cardRef = useRef<any>(null);
  const monriRef = useRef<any>(null);
  const orderNumberRef = useRef<string | null>(null);
  const isCardMountedRef = useRef(false);
  const lastProcessedInstallmentRef = useRef<string | null>(null);
  const installmentUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // CONSTANTS
  const deliveryPrice = getDeliveryPrice();
  const totalPrice = getTotalPrice() + deliveryPrice;

  // ---------- HELPERS ----------
  const toMinor = (amountMajor: number) => Math.round(amountMajor); // BAM minor units

  const additionalFeesCalculated = (
    numberOfInstallments: number,
    amount: number
  ) => {
    if (!numberOfInstallments || numberOfInstallments === 0) return amount;
    switch (numberOfInstallments) {
      case 2:
      case 3:
        return amount + amount * 0.023;
      case 4:
      case 5:
      case 6:
        return amount + amount * 0.04;
      case 7:
      case 8:
      case 9:
        return amount + amount * 0.052;
      case 10:
      case 11:
      case 12:
        return amount + amount * 0.063;
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
      case 18:
        return amount + amount * 0.072;
      case 19:
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
        return amount + amount * 0.081;
      default:
        return amount;
    }
  };

  const currentFinalMajor = (installmentsStr: string | null) => {
    const installments = installmentsStr ? Number(installmentsStr) : 0;
    return additionalFeesCalculated(installments, totalPrice);
  };

  // Update installment price in cart provider whenever installments change
  useEffect(() => {
    const finalPrice = currentFinalMajor(selectedInstallment);
    const basePrice = getTotalPrice();

    // Only set installment price if it's different from base price
    if (selectedInstallment && finalPrice !== basePrice + deliveryPrice) {
      setInstallmentPrice(finalPrice - deliveryPrice); // Store only the cart total with installment fees
    } else {
      setInstallmentPrice(null); // Reset to base price
    }
  }, [selectedInstallment, getTotalPrice, deliveryPrice, setInstallmentPrice]);

  const createPayment = useCallback(
    async (installmentsStr: string | null) => {
      const number = orderNumberRef.current ?? generateOrderNumber();
      orderNumberRef.current = number;

      const amountMajor = currentFinalMajor(installmentsStr);

      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: toMinor(amountMajor), // MINOR UNITS
          currency: CURRENCY_ISO,
          order_info: orderInfo,
          transaction_type: 'purchase',
          order_number: number,
        }),
      });

      if (!res.ok) throw new Error('Failed to create payment');
      const data = await res.json();
      if (!data?.clientSecret) throw new Error('No clientSecret in response');
      return data.clientSecret as string;
    },
    [totalPrice]
  );

  const mountCard = useCallback((secret: string) => {
    // Initialize monri only once
    if (!monriRef.current) {
      monriRef.current = Monri(process.env.NEXT_PUBLIC_MONRI_AUTH_TOKEN, {
        locale: 'hr',
      });
    }

    const components = monriRef.current.components({ clientSecret: secret });

    // Clean up existing card completely if it exists
    if (cardRef.current && isCardMountedRef.current) {
      try {
        cardRef.current.removeAllListeners?.();
        cardRef.current.unmount?.();
      } catch {
        /* noop */
      }
      isCardMountedRef.current = false;
    }

    // Clear and prepare the element
    const el = document.getElementById('card-element');
    if (el) {
      el.innerHTML = '';
    }

    // Create new card instance
    cardRef.current = components.create('card', {
      // showInstallmentsSelection: totalPrice >= 399 ? true : false,
      showInstallmentsSelection: false,
    });

    cardRef.current.mount('card-element');
    isCardMountedRef.current = true;

    // Error handling
    cardRef.current.onChange((e: any) => {
      const displayError = document.getElementById('card-errors');
      if (displayError) {
        displayError.textContent = e?.error ? e.error.message : '';
      }
    });

    // Handle installments changes
    if (typeof cardRef.current.addChangeListener === 'function') {
      cardRef.current.addChangeListener('installments', (event: any) => {
        const newInstallment =
          event?.data?.selectedInstallment !== null
            ? String(event.data.selectedInstallment)
            : null;

        // Clear any pending timeout
        if (installmentUpdateTimeoutRef.current) {
          clearTimeout(installmentUpdateTimeoutRef.current);
        }

        // Debounce the installment update
        installmentUpdateTimeoutRef.current = setTimeout(() => {
          setSelectedInstallment((prev) => {
            // Only update if actually different
            if (prev !== newInstallment) {
              return newInstallment;
            }
            return prev;
          });
        }, 200); // Increased debounce time
      });
    }
  }, []);

  const updatePaymentInBackground = useCallback(
    async (installmentsStr: string | null) => {
      // Skip if already processed this installment
      if (lastProcessedInstallmentRef.current === installmentsStr) {
        return;
      }

      if (!orderNumberRef.current || !cart?.length) return;

      try {
        setIsUpdatingPayment(true);

        // Create new payment with updated installments
        const newSecret = await createPayment(installmentsStr);

        // Update the client secret for the existing card without remounting
        if (monriRef.current && cardRef.current) {
          // Update the components with new client secret
          const newComponents = monriRef.current.components({
            clientSecret: newSecret,
          });

          // Update the card's client secret internally (this preserves the form data)
          if (cardRef.current.updateClientSecret) {
            cardRef.current.updateClientSecret(newSecret);
          } else {
            // Fallback: update the secret reference without full remount
            setClientSecret(newSecret);
          }
        }

        lastProcessedInstallmentRef.current = installmentsStr;
      } catch (e) {
        const displayError = document.getElementById('card-errors');
        if (displayError) {
          displayError.textContent = (e as Error).message;
        }
      } finally {
        setIsUpdatingPayment(false);
      }
    },
    [createPayment, cart]
  );

  // ---------- LIFECYCLE ----------
  // 1) Stock check and initial payment creation
  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      if (!cart || cart.length === 0) return;

      try {
        // Check stock
        const productsIds = cart.map((item) => item.product.productVariantId);
        const res = await getProductsStatus(productsIds);
        if (res.error) {
          if (!cancelled) setOutOfStockDialog(true);
          return;
        }

        const stockProducts = res.data;
        const isOutOfStock = cart.some((cartItem) => {
          const stockItem = stockProducts?.find(
            (item: any) =>
              item.productVariantId === cartItem.product.productVariantId
          );
          const out = stockItem && cartItem.quantity > stockItem.amountInStock;
          if (out && !cancelled) {
            setOutOfStockProducts((prev) => [...prev, cartItem.product.name]);
          }
          return out;
        });

        if (isOutOfStock) {
          if (!cancelled) setOutOfStockDialog(true);
          return;
        }

        // Create initial payment (no installments)
        setIsLoading(true);
        const secret = await createPayment(null);
        if (!cancelled) {
          setClientSecret(secret);
          lastProcessedInstallmentRef.current = null;
        }
      } catch (e) {
        if (!cancelled) {
          const displayError = document.getElementById('card-errors');
          if (displayError) {
            displayError.textContent = (e as Error).message;
          }
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [cart, deliveryPrice, createPayment]);

  // 2) Mount card only on initial clientSecret
  useEffect(() => {
    if (!clientSecret || isCardMountedRef.current) return;

    mountCard(clientSecret);
  }, [clientSecret, mountCard]);

  // 3) Handle installment changes by updating payment in background
  useEffect(() => {
    if (!isCardMountedRef.current || !clientSecret) return;

    // Skip if we already processed this installment
    if (lastProcessedInstallmentRef.current === selectedInstallment) return;

    updatePaymentInBackground(selectedInstallment);
  }, [selectedInstallment, clientSecret, updatePaymentInBackground]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (installmentUpdateTimeoutRef.current) {
        clearTimeout(installmentUpdateTimeoutRef.current);
      }
      if (cardRef.current && isCardMountedRef.current) {
        try {
          cardRef.current.removeAllListeners?.();
          cardRef.current.unmount?.();
        } catch {
          /* noop */
        }
      }
      // Reset installment price when component unmounts
      setInstallmentPrice(null);
    };
  }, [setInstallmentPrice]);

  // ---------- SUBMIT ----------
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!monriRef.current || !cardRef.current) return;

    setIsLoading(true);

    const transactionParams: Record<string, any> = {
      address: deliveryForm?.address,
      fullName: `${deliveryForm?.name} ${deliveryForm?.surname}`,
      city: deliveryForm?.city,
      zip: deliveryForm?.postalCode,
      phone: deliveryForm?.phoneNumber,
      country: deliveryForm?.country,
      email: deliveryForm?.email,
      orderInfo,
    };

    if (selectedInstallment) {
      transactionParams.installments = selectedInstallment;
    }

    monriRef.current
      .confirmPayment(cardRef.current, transactionParams)
      .then(function (result: Result<PaymentResult>) {
        setIsLoading(false);
        if (result.error) {
          const errorElement = document.getElementById('card-errors');
          if (errorElement) errorElement.textContent = result.error.message;
          return;
        }
        handlePaymentResult(result.result);
      });

    const handlePaymentResult = async (
      paymentResult: PaymentResult | null | any
    ) => {
      if (!paymentResult) {
        toast({
          title: t('common.somethingWentWrong'),
          variant: 'destructive',
        });
        redirect(PAGE_NAMES.CHECKOUT);
        return;
      }

      if (paymentResult.response_code === '5000') {
        // pending — let Monri finish the flow, usually redirects/3DS
        return;
      }

      if (paymentResult.status === 'approved') {
        // prefer backend-confirmed number_of_installments; fallback to user selection
        const installments = paymentResult?.number_of_installments
          ? Number(paymentResult.number_of_installments)
          : selectedInstallment
            ? Number(selectedInstallment)
            : 0;

        const finalPriceMajor = additionalFeesCalculated(
          installments,
          totalPrice
        );

        // Create order in your system
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
          totalPrice: finalPriceMajor,
          orderNumber:
            paymentResult?.order_number ?? orderNumberRef.current ?? undefined,
          paymentMethod: 'card',
        };

        try {
          await createOrder(orderPayload);
        } catch {
          setIsLoading(false);
          return;
        }

        // Clear cart and redirect with summary
        const orderSuccessData: OrderSuccessData = {
          items: cart.map((item) => ({
            name: item.product.name,
            image: item.product?.images?.[0] || null,
            price: item.product.discountedPrice || item.product.originalPrice,
            quantity: item.quantity,
          })),
          isGift,
          deliveryMethod,
          paymentMethod: 'card',
          orderNumber:
            paymentResult?.order_number ?? orderNumberRef.current ?? '',
          totalPrice: finalPriceMajor,
        };

        clearCart();
        setOrderSuccessData(orderSuccessData);
        redirect(PAGE_NAMES.CHECKOUT_SUCCESS);
        return;
      }

      if (paymentResult.status === 'declined') {
        toast({
          title: t('checkoutPage.paymentDeclined'),
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('common.somethingWentWrong'),
          variant: 'destructive',
        });
      }
      redirect(PAGE_NAMES.CHECKOUT);
    };
  }

  // ---------- RENDER ----------
  const isProcessing = isLoading;

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
        {isProcessing && (
          <div className="absolute right-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-md bg-white">
            <IconLoader size={32} />
          </div>
        )}

        <label htmlFor="card-element">
          {t('checkoutPage.paymentPage.enterCard')}
        </label>
        <div id="card-element">{/* Monri Component mounts here */}</div>

        <div id="card-errors" role="alert" style={{ color: 'red' }} />

        {isUpdatingPayment && (
          <div className="text-sm text-gray-600">
            {t('checkoutPage.paymentPage.updatingPayment')}
          </div>
        )}

        <Button
          className="mt-3 self-end"
          disabled={!clientSecret || isProcessing || isUpdatingPayment}
          size="lg"
          type="submit"
          typography="button1"
          variant="filled"
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
            if (!open) redirect(PAGE_NAMES.ABOUT);
          }}
        />
      )}
    </>
  );
}
