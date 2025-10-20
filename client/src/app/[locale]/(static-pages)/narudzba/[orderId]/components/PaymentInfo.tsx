'use client';

import { Banknote, Building2, CreditCard } from 'lucide-react';

import { PaymentMethod } from '@/lib/types/order';
import { useTranslations } from 'next-intl';

interface PaymentInfoProps {
  paymentMethod: PaymentMethod;
}

/**
 * Component to display payment method information
 */
export function PaymentInfo({ paymentMethod }: PaymentInfoProps) {
  const t = useTranslations('orderDetailsPage');

  const paymentConfig = {
    card: {
      icon: CreditCard,
      label: t('paymentCard'),
      description: t('paymentCardDescription'),
    },
    cash: {
      icon: Banknote,
      label: t('paymentCash'),
      description: t('paymentCashDescription'),
    },
    virman: {
      icon: Building2,
      label: t('paymentVirman'),
      description: t('paymentVirmanDescription'),
    },
  };

  const config = paymentConfig[paymentMethod];
  const Icon = config.icon;

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-6 py-5">
        <div className="mb-3 flex items-center gap-2">
          <Icon className="h-5 w-5 text-gray-600" />
          <h2 className="text-lg font-medium text-gray-900">
            {t('paymentMethod')}
          </h2>
        </div>
        <div className="space-y-1">
          <p className="font-medium text-gray-900">{config.label}</p>
          <p className="text-sm text-gray-600">{config.description}</p>
        </div>
      </div>
    </div>
  );
}
