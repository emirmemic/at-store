'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { IconWallet } from '@/components/icons';
import { AnimateSlots } from '@/components/transitions';
import { Button } from '@/components/ui/button';

import { EmptyContent } from '../../../components';
import { PaymentMethodResponse } from '../../../types';

import AddPaymentForm from './add-payment-form';
import PaymentMethodCard from './payment-method-card';

export default function Content({
  paymentMethods,
}: {
  paymentMethods: PaymentMethodResponse[];
}) {
  const t = useTranslations();
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false);
  const [paymentMethodsState, setPaymentMethods] =
    useState<PaymentMethodResponse[]>(paymentMethods);

  return (
    <>
      <AnimateSlots
        className={
          showAddPaymentDialog
            ? ''
            : 'p-4 md:h-[580px] md:overflow-y-scroll lg:h-[510px]'
        }
        currentSlotKey={showAddPaymentDialog ? 'add-card' : 'initial'}
      >
        {showAddPaymentDialog ? (
          <AddPaymentForm
            callback={(paymentMethod) => {
              setShowAddPaymentDialog(false);
              if (paymentMethod) {
                setPaymentMethods((prev) => [...prev, paymentMethod]);
              }
            }}
          />
        ) : !paymentMethodsState || paymentMethodsState.length === 0 ? (
          <EmptyContent
            Icon={IconWallet}
            buttonAction={() => setShowAddPaymentDialog(true)}
            buttonText={t('common.add')}
            emptyText={t('accountPage.paymentMethods.noPaymentMethods')}
          />
        ) : (
          paymentMethodsState.map((paymentMethod) => (
            <PaymentMethodCard
              key={paymentMethod.id}
              className="mb-6"
              paymentMethod={paymentMethod}
              onDefaultChange={(isDefault) =>
                setPaymentMethods((prev) =>
                  prev.map(
                    (pm) =>
                      pm.id === paymentMethod.id
                        ? { ...pm, isDefault }
                        : { ...pm, isDefault: false } // Set others to false
                  )
                )
              }
              onDelete={() =>
                setPaymentMethods((prev) =>
                  prev.filter((pm) => pm.id !== paymentMethod.id)
                )
              }
            />
          ))
        )}
      </AnimateSlots>
      <div
        className={`${showAddPaymentDialog || paymentMethodsState.length === 0 ? 'hidden' : ''} mt-10 flex flex-col items-center justify-center gap-8 md:flex-row md:justify-between`}
      >
        <p className="paragraph-1">
          {t('accountPage.paymentMethods.addNewPaymentMethod')}
        </p>
        <Button
          size={'lg'}
          typography={'button1'}
          variant={'filled'}
          onClick={() => setShowAddPaymentDialog(true)}
        >
          {t('common.add')}
        </Button>
      </div>
    </>
  );
}
