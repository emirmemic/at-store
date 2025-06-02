'use client';
import { useTranslations } from 'next-intl';

import { Checkbox } from '@/components/ui/checkbox';
import { STORES } from '@/lib/constants';

import { useCheckoutProvider } from '../providers/checkout-provider';

export default function PickupForm() {
  const t = useTranslations();
  const { setSelectedStore, selectedStore } = useCheckoutProvider();

  return (
    <div className="flex flex-col gap-5 border-t border-grey-dark paragraph-2">
      <p className="mt-4 heading-4">{t('checkoutPage.pickupFormTitle')}</p>
      {STORES.map((store) => (
        <Checkbox
          key={store.code}
          checked={selectedStore === store.code}
          className="bg-white"
          defaultChecked={selectedStore === store.code}
          labelClassName="flex items-center gap-6 cursor-pointer hover:text-grey-dark transition-colors duration-300"
          name={store.code}
          onCheckedChange={() => {
            setSelectedStore(selectedStore === store.code ? null : store.code);
          }}
        >
          <span>{store.name}</span>
        </Checkbox>
      ))}
    </div>
  );
}
