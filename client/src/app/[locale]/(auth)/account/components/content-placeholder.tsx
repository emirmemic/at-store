'use client';

import { useTranslations } from 'next-intl';
import React, { useEffect } from 'react';

import {
  IconDelivery,
  IconHeart,
  IconHome,
  IconNews,
  IconSettings,
  IconShoppingCart,
} from '@/components/icons';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Pathname, usePathname } from '@/i18n/routing';
import { LocalizationKey } from '@/lib/types';

import TitleCard, { TitleCardProps } from './title-card';

function getTitleCardContent(
  pathName: Pathname,
  t: LocalizationKey
): TitleCardProps | null {
  switch (pathName) {
    case PAGE_NAMES.ACCOUNT_DASHBOARD:
      return {
        Icon: IconHome,
        title: t('dashboard.title'),
      };
    case PAGE_NAMES.ACCOUNT_ORDERS:
      return {
        Icon: IconShoppingCart,
        title: t('orders.title'),
      };
    case PAGE_NAMES.ACCOUNT_DETAILS:
      return {
        Icon: IconSettings,
        title: t('details.title'),
      };
    case PAGE_NAMES.ACCOUNT_ADDRESSES:
      return {
        Icon: IconDelivery,
        title: t('addresses.title'),
      };
    case PAGE_NAMES.ACCOUNT_FAVORITES:
      return {
        Icon: IconHeart,
        title: t('favorites.title'),
      };
    case PAGE_NAMES.ACCOUNT_NEWSLETTER:
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
  const pathName = usePathname() as Pathname;
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
    <div className="flex flex-1 flex-col">
      <TitleCard Icon={Icon} title={title} />
      <div className="flex-1 py-10">{children}</div>
    </div>
  );
}
