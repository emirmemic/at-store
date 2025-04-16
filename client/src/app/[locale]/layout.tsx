import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

import '@/app/globals.css';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/nav-bar';
import { Toaster } from '@/components/ui/toaster';
import { routing, type Locale } from '@/i18n/routing';
import { getUser } from '@/lib/services';

import { SF_Pro_Text, SF_Pro_Display } from '../fonts/fonts';
import UserProvider from '../providers/user-provider';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });
  const metadataBase = new URL(process.env.NEXT_PUBLIC_FRONTEND_URL || '');

  return {
    metadataBase,
    title: {
      template: '%s',
      default: t('homePage.title'),
    },
    description: t('homePage.description'),
    twitter: {
      title: t('homePage.title'),
      description: t('homePage.description'),
      images: [
        {
          url: '/images/open-graph.jpg',
          width: 1200,
          height: 630,
          alt: 'AT Store',
        },
      ],
    },
    openGraph: {
      title: t('homePage.title'),
      description: t('homePage.description'),
      type: 'website',
      siteName: 'AT Store',
      locale: locale,
      url: metadataBase,
      images: [
        {
          url: '/images/open-graph.jpg',
          width: 1200,
          height: 630,
          alt: 'AT Store',
        },
      ],
    },
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

  const user = await getUser();

  return (
    <html
      className={`${SF_Pro_Text.variable} ${SF_Pro_Display.variable}`}
      lang="en"
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <UserProvider initialValue={user}>
            <Navbar />
            <div className="min-h-screen-h-cutoff pt-nav-height">
              {children}
              <Toaster />
            </div>
            <Footer />
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
