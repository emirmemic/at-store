import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components';
import { LocalizationKey, ProductResponse } from '@/lib/types';

import { OrderStatusEnum } from '../types';

function getTranslation(
  orderStatus: OrderStatusEnum,
  t: LocalizationKey
): string {
  let translation: string;
  switch (orderStatus) {
    case 'pending':
      translation = t('accountPage.orders.pending');
      break;
    case 'canceled':
      translation = t('accountPage.orders.canceled');
      break;
    case 'completed':
      translation = t('accountPage.orders.completed');
      break;
    default:
      translation = 'Unknown';
  }
  return translation;
}

function TextItem({ text, spanText }: { text?: string; spanText?: string }) {
  return (
    <p className="text-sm text-gray-700 md:text-base">
      {spanText && <span className="font-semibold text-black">{spanText}</span>}
      {text}
    </p>
  );
}

export interface OrderProductCardProps {
  id: number;
  product: ProductResponse;
  orderStatus?: OrderStatusEnum;
  orderNumber?: string;
  orderDate?: string;
}

export default function OrderProductCard(props: OrderProductCardProps) {
  const t = useTranslations();

  const { orderStatus, orderNumber, orderDate, product } = props;
  const { name, images } = product;
  const image = images?.[0];

  return (
    <div className="relative mb-2 flex flex-col items-center gap-4 rounded-2xl border border-[#e0e0e0] bg-white/70 px-14 py-10 backdrop-blur-md transition-shadow hover:shadow-md md:flex-row md:px-3 md:py-8 lg:p-8">
      <StrapiImage
        alt={image?.alternativeText ?? null}
        className="h-full max-h-[166px] w-full max-w-[250px] object-contain md:max-h-[130px] md:max-w-[194px] lg:max-h-[166px] lg:max-w-[252px]"
        height={166}
        sizes="(max-width: 1024px) 12.125rem, 15.625rem"
        src={image?.url ?? ''}
        width={250}
      />
      <div className="flex flex-col gap-1">
        <div className="border-b border-gray-200 pb-2">
          <TextItem text={name} />
        </div>
        <div className="border-b border-gray-200 pb-2">
          <TextItem text={getTranslation(orderStatus ?? 'canceled', t)} />
        </div>
        <div className="border-b border-gray-200 pb-2">
          <TextItem
            spanText={`${t('accountPage.orders.orderNumber')}: `}
            text={orderNumber?.toString()}
          />
        </div>
        <div className="border-b border-gray-200 pb-2">
          <TextItem
            spanText={`${t('accountPage.orders.orderDate')}: `}
            text={
              orderDate
                ? new Date(orderDate).toLocaleDateString('de-DE')
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
