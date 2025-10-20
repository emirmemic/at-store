'use client';

import { OrderItem } from '@/lib/types/order';
import { formatPrice } from '@/lib/formatters';
import { useTranslations } from 'next-intl';

interface OrderSummaryProps {
  items: OrderItem[];
  totalPrice: number;
  deliveryPrice: number;
  isGift: boolean;
}

/**
 * Component to display order price summary and totals
 */
export function OrderSummary({
  items,
  totalPrice,
  deliveryPrice,
  isGift,
}: OrderSummaryProps) {
  const t = useTranslations('orderDetailsPage');

  // Calculate subtotal from items
  const subtotal = items.reduce((sum, item) => {
    const rawUnitPrice =
      item.product.discountedPrice ?? item.product.originalPrice ?? 0;
    const unitPrice = Number(rawUnitPrice);
    return sum + unitPrice * item.quantity;
  }, 0);

  const deliveryPriceValue = Number(deliveryPrice ?? 0);
  const totalPriceValue = Number(totalPrice ?? 0);

  const subTotalEqualTotal = subtotal === totalPriceValue;

  return (
    <div className="space-y-3">
      {/* Subtotal */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{t('subtotal')}</span>
        <span className="font-medium text-gray-900">
          {formatPrice(subtotal)} KM
        </span>
      </div>

      {!subTotalEqualTotal && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Naknada za plaćanje na rate</span>
          <span className="font-medium text-gray-900">
            {formatPrice(totalPriceValue - subtotal)} KM
          </span>
        </div>
      )}

      {/* Delivery */}
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{t('delivery')}</span>
        <span className="font-medium text-gray-900">
          {deliveryPriceValue > 0
            ? `${formatPrice(deliveryPriceValue)} KM`
            : t('free')}
        </span>
      </div>

      {/* Gift Wrapping */}
      {isGift && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{t('giftWrapping')}</span>
          <span className="font-medium text-gray-900">{t('included')}</span>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 pt-3" />

      {/* Total */}
      <div className="flex justify-between">
        <span className="text-base font-semibold text-gray-900">
          {t('total')}
        </span>
        <span className="text-lg font-bold text-gray-900">
          {formatPrice(totalPriceValue)} KM
        </span>
      </div>
    </div>
  );
}
