/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// Monri JS is global (script loaded separately)
declare const Monri: any;

import { OrderPayload, createOrder, getProductsStatus } from '../actions';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { IconLoader } from '@/components/icons';
import { OrderSuccessData } from '../../types';
import { OutOfStockPopup } from '@/components/popup';
import { PAGE_NAMES } from '@/i18n/page-names';
import Script from 'next/script';
import { getMonriUrl } from '@/lib/utils/utils';
import { toast } from '@/lib/hooks';
import { useCartProvider } from '@/app/providers';
import { useCheckoutProvider } from '../../providers/checkout-provider';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const CURRENCY_ISO = 'BAM';
const ORDER_INFO = 'Purchase products';

type PaymentResult = {
  status: 'approved' | 'declined';
  response_code?: string;
  order_number?: string;
  number_of_installments?: number | string | null;
  amount?: number;
};

export default function PaymentWithCard() {
  const t = useTranslations();
  const router = useRouter();

  // Providers / context
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

  // State
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [outOfStockDialog, setOutOfStockDialog] = useState(false);
  const [outOfStockProducts, setOutOfStockProducts] = useState<string[]>([]);
  const [selectedInstallments, setSelectedInstallments] = useState<
    number | null
  >(null);

  // Refs
  const monriRef = useRef<any>(null);
  const componentsRef = useRef<any>(null);
  const cardRef = useRef<any>(null);
  const isCardMountedRef = useRef(false);

  const orderNumberRef = useRef<string | null>(null);
  const paymentIdRef = useRef<string | null>(null);
  const initialInstallmentsEventSeenRef = useRef(false);
  const lastAppliedInstallmentsRef = useRef<number | null>(null);
  const selectedInstallmentsRef = useRef<number | null>(null);
  const updateDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateRequestIdRef = useRef(0);
  const updateInFlightRef = useRef(false);

  // Pricing
  const deliveryPrice = getDeliveryPrice();
  const baseTotal = getTotalPrice() + deliveryPrice;

  // Your fee tiers by number of installments
  const feePct = (n: number) => {
    if (!n || n < 2) return 0;
    if (n <= 3) return 0.029; // 2 i 3 - 2.9%
    if (n <= 6) return 0.04; // 4 5 6 - 4%
    if (n <= 9) return 0.058; // 7 8 9 - 5.8%
    if (n <= 12) return 0.068; // 10 11 12 - 6.8%
    if (n <= 18) return 0.078; // 13 14 15 16 17 18 - 7.8%
    if (n <= 24) return 0.098; // 19 20 21 22 23 24 - 9.8%
    return 0;
  };

  const calcFinalMajor = (n: number | null) => {
    const pct = n ? feePct(n) : 0;
    return Math.round((baseTotal + baseTotal * pct) * 100) / 100;
  };

  useEffect(() => {
    const finalPrice = calcFinalMajor(selectedInstallments);
    const shouldSet = selectedInstallments && finalPrice !== baseTotal;
    setInstallmentPrice(shouldSet ? finalPrice - deliveryPrice : null);
  }, [selectedInstallments, baseTotal]);

  const createPayment = useCallback(
    async (installments: number | null) => {
      const number =
        orderNumberRef.current ??
        `ORD-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.random()
          .toString(36)
          .slice(2, 6)}`;
      orderNumberRef.current = number;

      const finalMajor = calcFinalMajor(installments);

      const res = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalMajor,
          currency: CURRENCY_ISO,
          order_info: ORDER_INFO,
          transaction_type: 'purchase',
          order_number: number,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data?.clientSecret || !data?.paymentId) {
        throw new Error(data?.error?.message || 'Failed to create payment');
      }
      paymentIdRef.current = data.paymentId;
      return data.clientSecret as string;
    },
    [baseTotal]
  );

  const updatePaymentAmount = useCallback(
    async (installments: number | null) => {
      if (!paymentIdRef.current) return;
      const newFinalMajor = calcFinalMajor(installments);

      const res = await fetch('/api/update-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: paymentIdRef.current,
          amount: newFinalMajor,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error?.message || 'Failed to update payment');
      }
    },
    [baseTotal]
  );

  const schedulePaymentUpdate = useCallback(
    function schedulePaymentUpdate(installments: number | null, delay = 250) {
      if (updateDebounceRef.current) {
        clearTimeout(updateDebounceRef.current);
      }

      setIsUpdating(true);
      const requestId = ++updateRequestIdRef.current;

      updateDebounceRef.current = setTimeout(async () => {
        if (!paymentIdRef.current) {
          if (requestId === updateRequestIdRef.current) setIsUpdating(false);
          updateDebounceRef.current = null;
          return;
        }

        updateInFlightRef.current = true;
        try {
          await updatePaymentAmount(installments);
          lastAppliedInstallmentsRef.current = installments;
        } catch (err: any) {
          const el = document.getElementById('card-errors');
          if (el) el.textContent = err?.message ?? String(err);
        } finally {
          updateInFlightRef.current = false;
          updateDebounceRef.current = null;

          const needsResync =
            requestId === updateRequestIdRef.current &&
            selectedInstallmentsRef.current !==
              lastAppliedInstallmentsRef.current;

          if (needsResync) {
            schedulePaymentUpdate(selectedInstallmentsRef.current, 0);
            return;
          }

          if (requestId === updateRequestIdRef.current) {
            setIsUpdating(false);
          }
        }
      }, delay);
    },
    [updatePaymentAmount]
  );

  // Mount card ONCE
  const mountCard = useCallback(
    (secret: string) => {
      if (!monriRef.current) {
        monriRef.current = Monri(process.env.NEXT_PUBLIC_MONRI_AUTH_TOKEN, {
          locale: 'hr',
        });
      }
      componentsRef.current = monriRef.current.components({
        clientSecret: secret,
      });

      if (cardRef.current && isCardMountedRef.current) {
        try {
          cardRef.current.removeAllListeners?.();
          cardRef.current.unmount?.();
        } catch {}
        isCardMountedRef.current = false;
      }

      const host = document.getElementById('card-element');
      if (host) host.innerHTML = '';

      cardRef.current = componentsRef.current.create('card', {
        showInstallmentsSelection: baseTotal > 399 ? true : false,
      });

      cardRef.current.onChange((e: any) => {
        const el = document.getElementById('card-errors');
        if (el) el.textContent = e?.error ? e.error.message : '';
      });

      cardRef.current.addChangeListener('installments', (ev: any) => {
        const raw = ev?.data?.selectedInstallment;
        const n: number | null =
          raw === null || raw === undefined ? null : Number(raw);

        selectedInstallmentsRef.current = n;
        setSelectedInstallments(n);
        if (!initialInstallmentsEventSeenRef.current) {
          initialInstallmentsEventSeenRef.current = true;
          lastAppliedInstallmentsRef.current = n;
          return;
        }

        if (lastAppliedInstallmentsRef.current === n) {
          if (updateDebounceRef.current) {
            clearTimeout(updateDebounceRef.current);
            updateDebounceRef.current = null;
          }
          if (!updateInFlightRef.current) {
            setIsUpdating(false);
          }
          return;
        }

        if (updateInFlightRef.current) {
          setIsUpdating(true);
          return;
        }

        schedulePaymentUpdate(n);
      });

      cardRef.current.mount('card-element');
      isCardMountedRef.current = true;
    },
    [schedulePaymentUpdate]
  );

  useEffect(() => {
    let cancelled = false;

    selectedInstallmentsRef.current = null;
    lastAppliedInstallmentsRef.current = null;
    initialInstallmentsEventSeenRef.current = false;
    setSelectedInstallments(null);
    setIsUpdating(false);

    (async () => {
      if (!cart?.length) return;

      try {
        // 1) stock check
        const ids = cart.map((i) => i.product.productVariantId);
        const res = await getProductsStatus(ids);

        if (res.error) {
          if (!cancelled) setOutOfStockDialog(true);
          return;
        }

        const stock = res.data;
        const oos = cart.some((item) => {
          const s = stock?.find(
            (x: any) => x.productVariantId === item.product.productVariantId
          );
          const bad = s && item.quantity > s.amountInStock;
          if (bad && !cancelled)
            setOutOfStockProducts((p) => [...p, item.product.name]);
          return bad;
        });

        if (oos) {
          if (!cancelled) setOutOfStockDialog(true);
          return;
        }

        // 2) create initial payment (no installments)
        const secret = await createPayment(null);
        if (!cancelled) setClientSecret(secret);
      } catch (err: any) {
        const el = document.getElementById('card-errors');
        if (el) el.textContent = err?.message ?? String(err);
      } finally {
        if (!cancelled) setIsBootstrapping(false);
      }
    })();

    return () => {
      cancelled = true;
      if (updateDebounceRef.current) {
        clearTimeout(updateDebounceRef.current);
        updateDebounceRef.current = null;
      }
      updateRequestIdRef.current += 1;
      updateInFlightRef.current = false;
      setInstallmentPrice(null);
      try {
        cardRef.current?.removeAllListeners?.();
        cardRef.current?.unmount?.();
      } catch {}
    };
  }, [cart, baseTotal]);

  useEffect(() => {
    if (!clientSecret || isCardMountedRef.current) return;
    mountCard(clientSecret);
  }, [clientSecret, mountCard]);

  // Submit → confirmPayment (installments come from the card; no extra param)
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!monriRef.current || !cardRef.current) return;

    if (
      isUpdating ||
      selectedInstallments !== lastAppliedInstallmentsRef.current
    ) {
      const el = document.getElementById('card-errors');
      if (el) el.textContent = t('checkoutPage.paymentPage.updatingPayment');
      return;
    }

    setIsSubmitting(true); // block UI while confirming

    const params: Record<string, any> = {
      address: deliveryForm?.address,
      fullName:
        `${deliveryForm?.name ?? ''} ${deliveryForm?.surname ?? ''}`.trim(),
      city: deliveryForm?.city,
      zip: deliveryForm?.postalCode,
      phone: deliveryForm?.phoneNumber,
      country: deliveryForm?.country,
      email: deliveryForm?.email,
      orderInfo: ORDER_INFO,
    };

    monriRef.current
      .confirmPayment(cardRef.current, params)
      .then(async (res: any) => {
        const { result, error } = res || {};
        if (error) {
          setIsSubmitting(false);
          const el = document.getElementById('card-errors');
          if (el) el.textContent = error.message ?? String(error);
          return;
        }

        const pr = result as PaymentResult | null;
        if (!pr) {
          setIsSubmitting(false);
          toast({
            title: t('common.somethingWentWrong'),
            variant: 'destructive',
          });
          router.push(PAGE_NAMES.CHECKOUT);
          return;
        }

        if (pr.response_code === '5000') {
          // pending / 3DS handled by Monri Components
          // Keep the button blocked briefly; Monri will resolve/redirect
          setIsSubmitting(false);
          return;
        }

        if (pr.status === 'approved') {
          const usedInstallments =
            (typeof pr.number_of_installments === 'string'
              ? parseInt(pr.number_of_installments, 10)
              : pr.number_of_installments) ??
            selectedInstallments ??
            0;

          const finalMajor = calcFinalMajor(usedInstallments);

          const payload: OrderPayload = {
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
            totalPrice: finalMajor,
            orderNumber: pr.order_number ?? orderNumberRef.current ?? undefined,
            paymentMethod: 'card',
          };

          try {
            await createOrder(payload);
          } catch {
            setIsSubmitting(false);
            toast({
              title: t('common.somethingWentWrong'),
              variant: 'destructive',
            });
            return;
          }

          // Success → clear & go to success page
          const success: OrderSuccessData = {
            items: cart.map((item) => ({
              name: item.product.name,
              image: item.product?.images?.[0] || null,
              price: item.product.discountedPrice || item.product.originalPrice,
              quantity: item.quantity,
            })),
            isGift,
            deliveryMethod,
            paymentMethod: 'card',
            orderNumber: pr.order_number ?? orderNumberRef.current ?? '',
            totalPrice: finalMajor,
          };
          clearCart();
          setOrderSuccessData(success);
          router.push(PAGE_NAMES.CHECKOUT_SUCCESS);
          return;
        }

        // Declined or something else
        setIsSubmitting(false);
        if (pr.status === 'declined') {
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
        router.push(PAGE_NAMES.CHECKOUT);
      });
  };

  const isBusy = isBootstrapping || isUpdating || isSubmitting;

  return (
    <>
      <Script
        src={`${getMonriUrl()}/dist/components.js`}
        strategy="afterInteractive"
      />
      <form
        className="relative flex flex-col gap-3"
        onSubmit={onSubmit}
        aria-busy={isBusy}
        aria-live="polite"
      >
        {isBusy && (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-white/70">
            <div className="flex flex-col items-center gap-2">
              <IconLoader size={32} />
              <span className="text-sm text-gray-700">
                {isSubmitting
                  ? 'Procesiranje'
                  : isUpdating
                    ? 'Ažuriranje načina plaćanja'
                    : 'Učitavanje'}
              </span>
            </div>
          </div>
        )}

        <label htmlFor="card-element">
          {t('checkoutPage.paymentPage.enterCard')}
        </label>
        <div id="card-element" />
        <div id="card-errors" role="alert" style={{ color: 'red' }} />

        {!isBusy && isUpdating && (
          <div className="text-sm text-gray-600">
            Ažuriranje načina plaćanja...
          </div>
        )}

        <Button
          className="mt-3 self-end"
          disabled={!clientSecret || isBusy}
          size="lg"
          type="submit"
          typography="button1"
          variant="filled"
        >
          Nastavi
        </Button>
      </form>

      {outOfStockDialog && (
        <OutOfStockPopup
          isOpen={outOfStockDialog}
          outOfStockProducts={outOfStockProducts}
          onOpenChange={(open) => {
            setOutOfStockDialog(open);
            if (!open) router.push(PAGE_NAMES.ABOUT); // use router here too
          }}
        />
      )}
    </>
  );
}
