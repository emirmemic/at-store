'use client';

import AnimatedList from '@/components/transitions/animate-list';
import { ProductCartTableItem } from '@/components/product-cards';
import { useCartProvider } from '@/app/providers';
import { useIsDesktop } from '@/lib/hooks/use-is-desktop';
import { useTranslations } from 'next-intl';

export default function CartItemsList() {
  const { cart, updateCart } = useCartProvider();
  const isDesktop = useIsDesktop();
  const t = useTranslations('cartPage');

  return (
    <>
      {isDesktop ? (
        <div className="w-full">
          {/* Apple-style header */}
          <div className="mb-3 flex items-center justify-between border-b border-grey-light/50 pb-3">
            <h2 className="text-xl font-semibold text-grey-almost-black">
              {t('tableHeaders.productName')}
            </h2>
            <div className="flex items-center gap-12 text-xs font-medium text-grey-medium">
              <span className="text-xl font-semibold text-grey-almost-black">
                {t('tableHeaders.quantity')}
              </span>
              <span className="w-1" />
              <span className="text-xl font-semibold text-grey-almost-black">
                {t('tableHeaders.total')}
              </span>
              <span className="w-8" />
            </div>
          </div>

          {/* Cart items with clean Apple spacing */}
          <div className="flex flex-col">
            {cart.map((item, index) => (
              <div key={item.id}>
                <ProductCartTableItem
                  cartItem={item}
                  onQuantityChange={updateCart}
                  onRemove={updateCart}
                />
                {index < cart.length - 1 && (
                  <div className="border-b border-grey-light/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <AnimatedList
            className="w-full divide-y divide-grey-light/30"
            getKey={(item) => String(item.id)}
            items={cart}
            renderItem={(item) => (
              <ProductCartTableItem
                cartItem={item}
                isDesktop={false}
                onQuantityChange={updateCart}
                onRemove={updateCart}
              />
            )}
          />
        </div>
      )}
    </>
  );
}
