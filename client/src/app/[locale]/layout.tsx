import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

import { AuthUserNavButton } from '@/components/auth/auth-user-button';
import { GoogleSignInButton } from '@/components/auth/google-sign-in-button';
import { NavLinkItem } from '@/components/header/nav-link-item';
import { IconHome } from '@/components/icons/home';
import { LocaleSwitcher } from '@/components/locale/LocaleSwitcher';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { routing, type Locale } from '@/i18n/routing';
import { getUser } from '@/lib/hooks/services';

import { SF_Pro_Text } from '../fonts/fonts';

import '@/app/globals.css';

interface GenerateMetadataParams {
  params: Promise<{ locale: string }>;
}
export async function generateMetadata({ params }: GenerateMetadataParams) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metaData' });

  return {
    title: t('home.title'),
    description: t('home.description'),
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
  const t = await getTranslations('home');
  return (
    <html className={`${SF_Pro_Text.variable}`} lang="en">
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              {/* Example usage of the icon; can be removed when building the final layout. */}
              <IconHome className="text-green-600 opacity-50" size={24} />
              <Link href={'/'}>{t('title')}</Link>
              <LocaleSwitcher />
            </div>

            {user ? (
              <AuthUserNavButton user={user} />
            ) : (
              <>
                <Link href={'/login'}>{t('login')}</Link>
                <NavLinkItem href="/global-components">
                  Global components playground
                </NavLinkItem>
                <Button asChild>
                  <GoogleSignInButton />
                </Button>
                {/* <Button asChild>
                <GithubSignInButton />
              </Button> */}
              </>
            )}
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
