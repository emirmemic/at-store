'use client';

import { DeliveryMethod, OrderAddress, StoreCode } from '@/lib/types/order';
import { MapPin, Store, Truck } from 'lucide-react';

import { useTranslations } from 'next-intl';

interface ShippingInfoProps {
  address: OrderAddress;
  deliveryMethod: DeliveryMethod;
  selectedStore: StoreCode | null;
}

/**
 * Component to display shipping/delivery information
 */
export function ShippingInfo({
  address,
  deliveryMethod,
  selectedStore,
}: ShippingInfoProps) {
  const t = useTranslations('orderDetailsPage');

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <div className="px-6 py-5">
        <div className="mb-4 flex items-center gap-2">
          {deliveryMethod === 'delivery' ? (
            <Truck className="h-5 w-5 text-gray-600" />
          ) : (
            <Store className="h-5 w-5 text-gray-600" />
          )}
          <h2 className="text-lg font-medium text-gray-900">
            {deliveryMethod === 'delivery'
              ? t('deliveryInfo')
              : t('pickupInfo')}
          </h2>
        </div>

        {deliveryMethod === 'delivery' ? (
          // Delivery Address
          <div className="space-y-2 text-sm">
            <p className="font-medium text-gray-900">
              {address.name} {address.surname}
            </p>
            <p className="text-gray-600">{address.address}</p>
            <p className="text-gray-600">
              {address.postalCode} {address.city}
            </p>
            <p className="text-gray-600">{address.country}</p>
            <div className="border-t border-gray-200 pt-2">
              <p className="text-gray-600">
                <span className="font-medium">{t('phone')}:</span>{' '}
                {address.phoneNumber}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">{t('email')}:</span>{' '}
                {address.email}
              </p>
            </div>
            {address.note && (
              <div className="mt-2 rounded-md bg-gray-50 p-3">
                <p className="text-xs font-medium text-gray-700">
                  {t('note')}:
                </p>
                <p className="mt-1 text-sm text-gray-600">{address.note}</p>
              </div>
            )}
          </div>
        ) : (
          // Pickup Store
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">{selectedStore}</p>
                <p className="mt-1 text-gray-600">{t('pickupInstructions')}</p>
              </div>
            </div>
            <div className="mt-3 border-t border-gray-200 pt-2">
              <p className="text-gray-600">
                <span className="font-medium">{t('contactPerson')}:</span>{' '}
                {address.name} {address.surname}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">{t('phone')}:</span>{' '}
                {address.phoneNumber}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">{t('email')}:</span>{' '}
                {address.email}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
