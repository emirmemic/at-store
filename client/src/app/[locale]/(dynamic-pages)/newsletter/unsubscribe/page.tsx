'use client';

import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from '@/app/providers';
import { MonoAppleBlock } from '@/components';
import { IconLoader } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { useLoader } from '@/lib/hooks';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  return (
    <div className="flex min-h-screen-h-cutoff w-full flex-col items-center justify-center gap-16 py-4 container-max-width">
      <div className="flex flex-col items-center justify-center gap-4 self-center">
        {children}
      </div>
      <Button asChild size="lg" variant="filled">
        <Link href={PAGE_NAMES.HOME}>{t('notFound.buttonText')}</Link>
      </Button>
      <MonoAppleBlock />
    </div>
  );
};

export default function Page() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { updateUserNewsletter } = useContext(UserContext);
  if (!token || typeof token !== 'string') {
    notFound();
  }

  const unsubscribe = async () =>
    await fetchAPI(`${STRAPI_BASE_URL}/api/newsletter/unsubscribe`, {
      method: 'POST',
      body: { token },
    });

  const [isUnsubscribed, setIsUnsubscribed] = useState(false);
  const { execute, isLoading, error } = useLoader({
    apiCall: unsubscribe,
    onSuccess: () => {
      setIsUnsubscribed(true);
      updateUserNewsletter(false);
    },
  });

  useEffect(() => {
    if (!isUnsubscribed) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      {isLoading && <IconLoader />}

      {!isLoading && error && !isUnsubscribed && (
        <>
          <h1 className="text-red-deep heading-3">Error</h1>
          <p className="text-center paragraph-2">{error.message}</p>
        </>
      )}

      {!isLoading && !error && isUnsubscribed && (
        <>
          <h1 className="heading-3">{t('newsletterPage.unsubscribe.title')}</h1>
          <p className="text-center paragraph-2">
            {t('newsletterPage.unsubscribe.description')}
          </p>
        </>
      )}
    </Wrapper>
  );
}
