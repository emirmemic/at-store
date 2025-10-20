'use client';

import { OrderStatus } from '@/lib/types/order';
import { cn } from '@/lib/utils/utils';
import { useTranslations } from 'next-intl';

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

/**
 * Badge component to display order status with appropriate styling
 */
export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const t = useTranslations('orderDetailsPage');

  const statusConfig = {
    pending: {
      label: t('statusPending'),
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    },
    completed: {
      label: t('statusCompleted'),
      className: 'bg-green-100 text-green-800 border-green-200',
    },
    canceled: {
      label: t('statusCanceled'),
      className: 'bg-red-100 text-red-800 border-red-200',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex rounded-full border px-4 py-1.5 text-sm font-semibold',
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
