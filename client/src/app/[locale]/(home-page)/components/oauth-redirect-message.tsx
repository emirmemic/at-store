'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Alert } from '@/components/ui/alert';

export default function OAuthRedirectMessage({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) {
  const t = useTranslations();

  const [isVisible, setIsVisible] = useState<boolean>(
    Boolean(success || error)
  );

  // Hide the alert after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return (
    <Alert
      dismissible
      className="fixed left-1/2 top-12 z-50 w-full max-w-[400px] -translate-x-1/2"
      variant={success ? 'success' : 'destructive'}
      visible={isVisible}
    >
      {error || t('loginPage.loginSuccess')}
    </Alert>
  );
}
