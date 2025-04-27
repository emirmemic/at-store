import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components';
import { LocalizationKey, ProductBase } from '@/lib/types';

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
    case 'shipped':
      translation = t('accountPage.orders.shipped');
      break;
    case 'delivered':
      translation = t('accountPage.orders.delivered');
      break;
    case 'canceled':
      translation = t('accountPage.orders.canceled');
      break;
    default:
      translation = 'Unknown';
  }
  return translation;
}

function TextItem({ text, spanText }: { text?: string; spanText?: string }) {
  return (
    <p className="paragraph-2 md:bullet-1 lg:paragraph-1">
      {spanText && (
        <span className="heading-5 md:bullet-heading-2 lg:heading-4">
          {spanText}
        </span>
      )}
      {text}
    </p>
  );
}

export interface OrderProductCardProps {
  id: number;
  product: ProductBase;
  orderStatus?: OrderStatusEnum;
  orderNumber?: number;
  orderDate?: string;
}

export default function OrderProductCard(props: OrderProductCardProps) {
  const t = useTranslations();

  const { orderStatus, orderNumber, orderDate, product } = props;
  const { name, images } = product;
  const image = images?.[0];

  return (
    <div className="relative flex flex-col items-center gap-4 rounded-2xl border-grey-extra-light px-14 py-10 shadow-standard-black md:flex-row md:px-3 md:py-8 lg:p-8">
      <StrapiImage
        alt={image?.alternativeText ?? null}
        className="h-full max-h-[166px] w-full max-w-[250px] object-contain md:max-h-[130px] md:max-w-[194px] lg:max-h-[166px] lg:max-w-[252px]"
        height={166}
        sizes="(max-width: 1024px) 12.125rem, 15.625rem"
        src={image?.url ?? ''}
        width={250}
      />
      <div className="flex flex-col gap-1">
        <TextItem text={name} />
        <TextItem text={getTranslation(orderStatus ?? 'canceled', t)} />
        <TextItem
          spanText={`${t('accountPage.orders.orderNumber')}: `}
          text={orderNumber?.toString()}
        />
        <TextItem
          spanText={`${t('accountPage.orders.orderDate')}: `}
          text={orderDate}
        />
      </div>
    </div>
  );
}
