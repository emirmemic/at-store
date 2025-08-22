'use client';

import { OrderPayload, createOrder, getProductsStatus } from '../actions';

import { Button } from '@/components/ui/button';
import { IconLoader } from '@/components/icons';
import { OrderSuccessData } from '../../types';
import { OutOfStockPopup } from '@/components/popup';
import { PAGE_NAMES } from '@/i18n/page-names';
import { generateOrderNumber } from '../../utils';
import { redirect } from 'next/navigation';
import { useCartProvider } from '@/app/providers';
import { useCheckoutProvider } from '../../providers/checkout-provider';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function PaymentOnDelivery({ virman }: { virman?: boolean }) {
  const t = useTranslations('checkoutPage');
  // PROVIDERS
  const { getTotalPrice, cart, clearCart } = useCartProvider();
  const {
    setOrderSuccessData,
    deliveryForm,
    deliveryMethod,
    selectedStore,
    getDeliveryPrice,
    isGift,
  } = useCheckoutProvider();
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [outOfStockDialog, setOutOfStockDialog] = useState(false);
  const [outOfStockProducts, setOutOfStockProducts] = useState<string[]>([]);

  // CONSTANTS
  const deliveryPrice = getDeliveryPrice();
  const totalPrice = getTotalPrice() + deliveryPrice;
  const orderNumber = generateOrderNumber();

  async function onContinue() {
    setIsLoading(true);

    const productsIds = cart.map((item) => item.product.productVariantId);
    const res = await getProductsStatus(productsIds);
    if (res.error) {
      setOutOfStockDialog(true);
      setIsLoading(false);
    } else if (res.data) {
      const stockProducts = res.data;
      const isOutOfStock = cart.some((cartItem) => {
        const stockItem = stockProducts.find(
          (item) => item.productVariantId === cartItem.product.productVariantId
        );
        const isOut = stockItem && cartItem.quantity > stockItem.amountInStock;

        if (isOut) {
          setOutOfStockProducts((prev) => [...prev, cartItem.product.name]);
        }
        return isOut;
      });
      if (isOutOfStock) {
        setOutOfStockDialog(true);
        setIsLoading(false);
      } else {
        // Create order
        const orderPayload: OrderPayload = {
          items: cart.map((item) => ({
            productVariantId: item.product.productVariantId,
            productDocumentId: item.product.documentId,
            quantity: item.quantity,
            name: item.product.name,
          })),
          address: deliveryForm,
          deliveryMethod,
          deliveryPrice,
          isGift,
          totalPrice: totalPrice,
          selectedStore: deliveryMethod === 'pickup' ? selectedStore : null,
          orderNumber: orderNumber,
          paymentMethod: virman ? 'virman' : 'cash',
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
          orderNumber: orderNumber,
          totalPrice: totalPrice,
          paymentMethod: virman ? 'virman' : 'cash',
        };
        setOrderSuccessData(orderSuccessData);
        setIsLoading(false);
        redirect(PAGE_NAMES.CHECKOUT_SUCCESS);
      }
    }
  }
  return (
    <>
      {!virman && (
        <div className="w-full rounded-2xl border border-black bg-grey-silver px-4 py-10">
          <p className="paragraph-2">
            {t('paymentPage.payOnDeliveryDescription')}
          </p>
        </div>
      )}
      <div className="ml-auto mt-3">
        {isLoading ? (
          <IconLoader size={32} />
        ) : (
          <Button
            size={'lg'}
            typography={'button1'}
            variant={'filled'}
            onClick={onContinue}
          >
            {t('continue')}
          </Button>
        )}
      </div>
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
