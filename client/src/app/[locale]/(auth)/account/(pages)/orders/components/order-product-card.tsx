import { useTranslations } from 'next-intl';

import { StrapiImage } from '@/components';
import { LocalizationKey, OrderStatusEnum, ProductBase } from '@/lib/types';

export interface OrderProductCardProps {
  id: number;
  product: ProductBase;
  orderStatus: OrderStatusEnum;
  orderNumber: number;
  orderDate: string;
}

function getTranslation(
  orderStatus: OrderStatusEnum,
  t: LocalizationKey
): string {
  let translation: string;
  switch (orderStatus) {
    case 'pending':
      translation = t('pending');
      break;
    case 'shipped':
      translation = t('shipped');
      break;
    case 'delivered':
      translation = t('delivered');
      break;
    case 'canceled':
      translation = t('canceled');
      break;
    default:
      translation = 'Unknown';
  }
  return translation;
}

function TextItem({ text, spanText }: { text: string; spanText?: string }) {
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

export default function OrderProductCard(props: OrderProductCardProps) {
  const t = useTranslations('accountPage.orders');

  const { orderStatus, orderNumber, orderDate, product } = props;
  const { name, image } = product;

  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border-grey-extra-light px-14 py-10 shadow-standard-black md:flex-row md:px-3 md:py-8 lg:p-8">
      <StrapiImage
        priority
        alt={image.alternativeText}
        className="h-full max-h-[166px] w-full max-w-[250px] md:max-h-[130px] md:max-w-[194px] lg:max-h-[166px] lg:max-w-[250px]"
        height={166}
        sizes="(max-width: 1024px) 12.125rem, 15.625rem"
        src={image.url}
        width={250}
      />
      <div>
        <TextItem text={name} />
        <TextItem text={getTranslation(orderStatus, t)} />
        <TextItem
          spanText={`${t('orderNumber')}: `}
          text={orderNumber.toString()}
        />
        <TextItem spanText={`${t('orderDate')}: `} text={orderDate} />
      </div>
    </div>
  );
}
