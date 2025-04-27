'use client';

import { useTranslations } from 'next-intl';

import { IconWallet } from '@/components/icons';

import { EmptyContent } from '../../components';
import { PaymentMethodResponse } from '../../types';

export default function Page() {
  const t = useTranslations();
  const paymentMethods: PaymentMethodResponse[] = [];

  return (
    <>
      {!paymentMethods || paymentMethods.length === 0 ? (
        <EmptyContent
          Icon={IconWallet}
          buttonAction={() => {
            // TODO: Implement the button action
          }}
          buttonText={t('common.add')}
          emptyText={t('accountPage.paymentMethods.noPaymentMethods')}
        />
      ) : (
        <h1>Payment Methods</h1>
      )}
    </>
  );
}
