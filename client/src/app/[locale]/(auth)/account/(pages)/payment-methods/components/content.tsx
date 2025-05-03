'use client';
import { useTranslations } from 'next-intl';

import { IconWallet } from '@/components/icons';

import { EmptyContent } from '../../../components';
import { PaymentMethodResponse } from '../../../types';

import PaymentMethodCard from './payment-method-card';

export default function Content({
  paymentMethods,
}: {
  paymentMethods: PaymentMethodResponse[];
}) {
  const t = useTranslations();

  return !paymentMethods || paymentMethods.length === 0 ? (
    <EmptyContent
      Icon={IconWallet}
      buttonAction={() => {}}
      buttonText={t('common.add')}
      emptyText={t('accountPage.paymentMethods.noPaymentMethods')}
    />
  ) : (
    paymentMethods.map((paymentMethod) => (
      <PaymentMethodCard
        key={paymentMethod.id}
        cardNumber={paymentMethod.cardNumber}
        expirationDate={paymentMethod.expirationDate}
        isDefault={paymentMethod.isDefault}
        nameAndSurname={paymentMethod.nameAndSurname}
      />
    ))
  );
}
