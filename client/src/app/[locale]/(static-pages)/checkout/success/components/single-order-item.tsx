import { useTranslations } from 'next-intl';
import React from 'react';

import { StrapiImage } from '@/components';
import { CURRENCY } from '@/lib/constants';
import { ImageProps } from '@/lib/types';

interface SingleOrderItemProps {
  name: string;
  image: ImageProps | null;
  price: number;
  quantity: number;
}

export default function SingleOrderItem({
  name,
  image,
  price,
  quantity,
}: SingleOrderItemProps) {
  const totalPrice = price * quantity;
  const t = useTranslations('common');
  return (
    <div key={name} className="flex gap-4 heading-5">
      {image && (
        <StrapiImage
          alt={image?.alternativeText || name}
          className="h-24 w-32 object-contain"
          height={128}
          sizes="8rem"
          src={image?.url ?? ''}
          width={100}
        />
      )}
      <div className="flex flex-1 flex-col items-start justify-start gap-2">
        <p>{name}</p>
        <p>{`${t('quantity')}: ${quantity}`}</p>
        <div className="flex w-full justify-between">
          <p>{`${price} ${CURRENCY}`}</p>
          <p>{`${totalPrice} ${CURRENCY}`}</p>
        </div>
      </div>
    </div>
  );
}
