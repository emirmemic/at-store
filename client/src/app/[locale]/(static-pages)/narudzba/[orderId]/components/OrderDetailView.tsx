'use client';

import { OrderDetail } from '@/lib/types/order';
import { OrderItemsList } from './OrderItemsList';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderSummary } from './OrderSummary';
import { PaymentInfo } from './PaymentInfo';
import { ShippingInfo } from './ShippingInfo';
import { useTranslations } from 'next-intl';

interface OrderDetailViewProps {
  order: OrderDetail;
  locale: string;
}

/**
 * Main component for displaying complete order details
 * Organized into sections: Status, Items, Summary, Shipping, Payment
 */
export function OrderDetailView({ order, locale }: OrderDetailViewProps) {
  const t = useTranslations('orderDetailsPage');

  return (
    <div className="space-y-6">
      {/* Order Status Card */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                {t('orderStatus')}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {t('orderDate')}:{' '}
                {new Date(order.createdAt).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <OrderStatusBadge status={order.orderStatus} />
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-6 py-5">
          <h2 className="mb-4 text-lg font-medium text-gray-900">
            {t('orderItems')}
          </h2>
          <OrderItemsList items={order.items} />
        </div>
      </div>

      {/* Two Column Layout for Summary and Details */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Order Summary */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-6 py-5">
            <h2 className="mb-4 text-lg font-medium text-gray-900">
              {t('orderSummary')}
            </h2>
            <OrderSummary
              items={order.items}
              totalPrice={order.totalPrice}
              deliveryPrice={order.deliveryPrice}
              isGift={order.isGift}
            />
          </div>
        </div>

        {/* Shipping & Payment Info */}
        <div className="space-y-6">
          <ShippingInfo
            address={order.address}
            deliveryMethod={order.deliveryMethod}
            selectedStore={order.selectedStore}
          />
          <PaymentInfo paymentMethod={order.paymentMethod} />
        </div>
      </div>

      {/* Help Section */}
      <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
        <h3 className="mb-2 text-sm font-medium text-gray-900">
          {t('needHelp')}
        </h3>
        <p className="text-sm text-gray-600">
          {t('helpText')}{' '}
          <a
            href="mailto:orders@atstore.ba"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            orders@atstore.ba
          </a>
        </p>
      </div>
    </div>
  );
}
