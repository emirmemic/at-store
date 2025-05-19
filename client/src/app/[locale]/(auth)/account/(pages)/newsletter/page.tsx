'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useUserProvider } from '@/app/providers/user-provider';
import { IconLoader } from '@/components/icons';
import { Switch } from '@/components/ui/switch';
import { useLoader } from '@/lib/hooks';
import { useToast } from '@/lib/hooks/use-toast';

import { CardContainer } from '../../components';

import toggleSubscription from './actions';

export default function Page() {
  // Providers and Hooks
  const t = useTranslations('newsletterPage');
  const { toast } = useToast();
  const { user, updateUserNewsletter } = useUserProvider();

  // State
  const [isSubscribed, setIsSubscribed] = useState(
    user?.accountDetails?.newsletter?.subscribed || false
  );
  const successMessage = isSubscribed
    ? t('successfulUnsubscribe')
    : t('successfulSignUp');
  const variant = isSubscribed ? 'default' : 'success';

  // Handlers
  const { isLoading, execute } = useLoader({
    apiCall: () => toggleSubscription(),
    onSuccess: () => {
      toast({
        variant,
        description: successMessage,
      });
      const newValue = !isSubscribed;
      setIsSubscribed(newValue);
      updateUserNewsletter(newValue);
    },
    onError: (error) => {
      toast({
        title: error.name,
        variant: 'destructive',
        description: error.message,
      });
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <CardContainer className="flex items-center justify-between gap-8 px-8 py-16">
        <p>{t('accountSubscribe')}</p>
        <div className="relative flex items-center pl-8">
          <Switch
            aria-checked={isSubscribed}
            checked={isSubscribed}
            disabled={isLoading}
            onCheckedChange={execute}
          />
          {isLoading && (
            <IconLoader className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2" />
          )}
        </div>
      </CardContainer>
      <CardContainer className="flex items-center justify-between gap-8 px-8 py-16">
        <p>{t('accountInfo')}</p>
      </CardContainer>
    </div>
  );
}
