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
import { PAGE_NAMES } from '@/i18n/page-names';
import { routing, type Locale } from '@/i18n/routing';
import { getNavbarData, getUser } from '@/lib/services';
import { getCart } from '@/lib/services/get-cart';
import { NavMenuItem } from '@/lib/types';

import { SF_Pro_Display, SF_Pro_Text } from '../fonts/fonts';
import CartProvider from '../providers/cart-provider';
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
  const navbarData = (await getNavbarData()) || [];

  const processSubcategories = (item: NavMenuItem) => {
    return (
      item.subCategories?.map((sub) => ({
        ...sub,
        link: `${PAGE_NAMES.SUBCATEGORY}/${sub.link}`,
      })) || []
    );
  };
  const buildNavItem = (item: NavMenuItem): NavMenuItem => {
    const lowerName = item.name.toLowerCase();
    const isAccessory =
      lowerName.includes('accessory') || lowerName.includes('accessories');
    let link;
    if (isAccessory) {
      link = PAGE_NAMES.ACCESSORIES;
    } else {
      link = `${PAGE_NAMES.CATEGORY}/${item.link}`;
    }
    return {
      ...item,
      link,
      subCategories: processSubcategories(item),
    };
  };
  const processedNavbarData = navbarData.map((item) => buildNavItem(item));

  const user = await getUser();
  const cart = await getCart();

  return (
    <html
      className={`${SF_Pro_Text.variable} ${SF_Pro_Display.variable}`}
      lang="en"
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <UserProvider initialValue={user}>
            <CartProvider initialValue={cart}>
              <Navbar navbarData={processedNavbarData} />
              <div className="min-h-screen-h-cutoff pt-nav-height">
                {children}
                <Toaster />
              </div>
              <Footer categoryItems={processedNavbarData} />
            </CartProvider>
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
