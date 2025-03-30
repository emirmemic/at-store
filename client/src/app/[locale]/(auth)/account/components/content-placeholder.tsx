'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

import {
  IconHeart,
  IconHome,
  IconNews,
  IconSettings,
  IconShoppingCart,
  IconWallet,
} from '@/components/icons';
import { Pathname, usePathname } from '@/i18n/routing';
import { LocalizationKey } from '@/lib/types';

import TitleCard, { TitleCardProps } from './title-card';

function getTitleCardContent(
  pathName: Pathname,
  t: LocalizationKey
): TitleCardProps | null {
  switch (pathName) {
    case '/account/dashboard':
      return {
        Icon: IconHome,
        title: t('dashboard.title'),
      };
    case '/account/orders':
      return {
        Icon: IconShoppingCart,
        title: t('orders.title'),
      };
    case '/account/details':
      return {
        Icon: IconSettings,
        title: t('details.title'),
      };
    case '/account/payment-methods':
      return {
        Icon: IconWallet,
        title: t('paymentMethods.title'),
      };
    case '/account/favorites':
      return {
        Icon: IconHeart,
        title: t('favorites.title'),
      };
    case '/account/newsletter':
      return {
        Icon: IconNews,
        title: t('newsletter.title'),
      };
    default:
      return null;
  }
}
export default function ContentPlaceholder({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const t = useTranslations('accountPage');
  const titleCardContent = getTitleCardContent(pathName, t);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathName]);

  if (!titleCardContent) {
    return <></>;
  }

  const { Icon, title } = titleCardContent;

  return (
    <div className="flex-1 flex-col">
      <TitleCard Icon={Icon} title={title} />
      <div className="py-10">{children}</div>
    </div>
  );
}
