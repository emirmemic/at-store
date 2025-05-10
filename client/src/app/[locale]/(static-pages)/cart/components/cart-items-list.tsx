'use client';
import { useTranslations } from 'next-intl';

import { useCartProvider } from '@/app/providers';
import { ProductCartTableItem } from '@/components/product-cards';

export default function CartItemsList() {
  const { cart, updateCart } = useCartProvider();

  const t = useTranslations('cartPage');
  const tableHeaders = [
    {
      title: t('tableHeaders.productName'),
      styles: 'col-span-2',
    },
    {
      title: t('tableHeaders.price'),
      styles: '',
    },
    {
      title: t('tableHeaders.quantity'),
      styles: '',
    },
    {
      title: t('tableHeaders.total'),
      styles: 'col-span-2',
    },
  ];

  return (
    <div className="h-[700px] overflow-y-scroll">
      <div className="hidden items-center gap-3 pr-8 heading-5 md:col-span-4 md:grid md:grid-cols-6 md:gap-4 md:p-0">
        {tableHeaders.map((header, index) => (
          <p key={index} className={`${header.styles}`}>
            {header.title}
          </p>
        ))}
      </div>
      {cart.map((item) => (
        <ProductCartTableItem
          key={item.id}
          cartItem={item}
          onQuantityChange={updateCart}
          onRemove={updateCart}
        />
      ))}
    </div>
  );
}
