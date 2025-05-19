'use client';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useUserProvider } from '@/app/providers/user-provider';
import { IconNews } from '@/components/icons';
import { PAGE_NAMES } from '@/i18n/page-names';

import Form from './form';

export default function Content() {
  const { user } = useUserProvider();
  // Redirect if user is logged in and has account details
  if (user && user.accountDetails) {
    const newRoute = PAGE_NAMES.ACCOUNT_NEWSLETTER;
    redirect(newRoute);
  }
  const t = useTranslations('newsletterPage');
  return (
    <main className="flex flex-col items-center py-16 container-max-width">
      <h1 className="mb-3 heading-1 md:mb-12 md:display">{t('title')}</h1>
      <h2 className="mb-11 heading-3 lg:mb-16">{t('subtitle')}</h2>
      <div className="mb-12 flex w-full max-w-5xl flex-col items-center gap-2 rounded-2xl bg-blue-steel px-3 pb-12 pt-7 text-white shadow-popup-black md:flex-row md:gap-14 md:p-16">
        <IconNews className="h-36 w-36 shrink-0" />
        <p className="text-center paragraph-1 md:text-left">
          {t('description')}
        </p>
      </div>
      <Form />
    </main>
  );
}
