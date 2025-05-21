'use client';
import { useTranslations } from 'next-intl';

import { useCartProvider } from '@/app/providers';
import { ProductCartTableItem } from '@/components/product-cards';
import { useIsDesktop } from '@/lib/hooks/use-is-desktop';

export default function CartItemsList() {
  const { cart, updateCart } = useCartProvider();
  const isDesktop = useIsDesktop();
  const t = useTranslations('cartPage');
  const tableHeaders = [
    t('tableHeaders.productName'),
    t('tableHeaders.price'),
    t('tableHeaders.quantity'),
    t('tableHeaders.total'),
    '',
  ];
  return (
    <>
      {isDesktop ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b border-grey-light text-left heading-5">
                {tableHeaders.map((header) => (
                  <th key={header} className="px-4 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <ProductCartTableItem
                  key={item.id}
                  cartItem={item}
                  onQuantityChange={updateCart}
                  onRemove={updateCart}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <ProductCartTableItem
              key={item.id}
              cartItem={item}
              isDesktop={false}
              onQuantityChange={updateCart}
              onRemove={updateCart}
            />
          ))}
        </div>
      )}
    </>
  );
}
