import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

import Footer from '@/components/footer/footer';
import Navbar from '@/components/nav-bar/nav-bar';
import { routing, type Locale } from '@/i18n/routing';

import { SF_Pro_Text } from '../fonts/fonts';

import '@/app/globals.css';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('homePage.title'),
    description: t('homePage.description'),
  };
}

type PropsType = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: PropsType) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);
  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html className={`${SF_Pro_Text.variable}`} lang="en">
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <div className="min-h-screen-h-cutoff pt-nav-height">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
