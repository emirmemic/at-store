'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useCartProvider } from '@/app/providers';
import { IconChevron } from '@/components/icons';
import { ProductCartTableItem } from '@/components/product-cards';
import Price from '@/components/ui/price';

import { useCheckoutProvider } from '../providers/checkout-provider';

export default function CartSection() {
  const [isOpen, setIsOpen] = useState(true);
  const t = useTranslations('checkoutPage');
  const { getDeliveryPrice } = useCheckoutProvider();

  const { cart, updateCart, getTotalPrice } = useCartProvider();
  if (cart.length === 0) redirect('/cart');

  const cartItemsPrice = getTotalPrice();

  const deliveryPrice = getDeliveryPrice();
  const totalPrice = cartItemsPrice + deliveryPrice;

  return (
    <Collapsible
      className="w-full md:order-2 md:max-w-[420px]"
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-3 py-1 text-start paragraph-2 hover:bg-grey-light md:hidden">
        <h2 className="heading-4">{t('inTheCart')}</h2>
        <IconChevron
          className={`w-3 transition-transform duration-500 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </CollapsibleTrigger>
      {cartItemsPrice > 0 && (
        <>
          <h2 className="mb-4 hidden heading-4 md:block">{t('inTheCart')}</h2>
          <TitleWithValue title={t('toPay')} value={cartItemsPrice} />
          <TitleWithValue title={t('delivery')} value={deliveryPrice} />
          <TitleWithValue title={t('total')} value={totalPrice} />
        </>
      )}
      <CollapsibleContent className="overflow-hidden transition-all duration-500 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
        {cart.map((item) => (
          <ProductCartTableItem
            key={item.id}
            cartItem={item}
            isDesktop={false}
            onQuantityChange={updateCart}
            onRemove={updateCart}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function TitleWithValue({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="flex justify-between">
      <p className="paragraph-1">{title}</p>
      <Price className="heading-5" value={value} />
    </div>
  );
}
