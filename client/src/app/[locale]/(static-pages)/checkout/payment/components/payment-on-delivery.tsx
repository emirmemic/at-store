'use client';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useCartProvider } from '@/app/providers';
import { IconLoader } from '@/components/icons';
import { OutOfStockPopup } from '@/components/popup';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { DELIVERY_COST, MINIMUM_AMOUNT_FREE_DELIVERY } from '@/lib/constants';

import { useCheckoutProvider } from '../../providers/checkout-provider';
import { OrderSuccessData } from '../../types';
import { generateOrderNumber } from '../../utils';
import { createOrder, getProductsStatus, OrderPayload } from '../actions';

export default function PaymentOnDelivery() {
  const t = useTranslations('checkoutPage');
  // PROVIDERS
  const { getTotalPrice, cart, clearCart } = useCartProvider();
  const { setOrderSuccessData, deliveryForm, deliveryMethod, selectedStore } =
    useCheckoutProvider();
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [outOfStockDialog, setOutOfStockDialog] = useState(false);
  const [outOfStockProducts, setOutOfStockProducts] = useState<string[]>([]);

  // CONSTANTS
  const deliveryPrice =
    getTotalPrice() > MINIMUM_AMOUNT_FREE_DELIVERY ? 0 : DELIVERY_COST;
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
          selectedStore: deliveryMethod === 'pickup' ? selectedStore : null,
          orderNumber: orderNumber,
          paymentMethod: 'cash',
        };

        await createOrder(orderPayload);
        clearCart();
        const orderSuccessData: OrderSuccessData = {
          items: cart.map((item) => ({
            name: item.product.name,
            image: item.product?.images?.[0] || null,
            price: item.product.discountedPrice || item.product.originalPrice,
            quantity: item.quantity,
          })),
          deliveryMethod: deliveryMethod,
          orderNumber: orderNumber,
          totalPrice: totalPrice,
          paymentMethod: 'cash',
        };
        setOrderSuccessData(orderSuccessData);
        setIsLoading(false);
        redirect(PAGE_NAMES.CHECKOUT_SUCCESS);
      }
    }
  }
  return (
    <>
      <div className="w-full rounded-2xl border border-black bg-grey-silver px-4 py-10">
        <p className="paragraph-2">
          {t('paymentPage.payOnDeliveryDescription')}
        </p>
      </div>
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
