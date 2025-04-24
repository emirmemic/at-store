'use client';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useState } from 'react';

import { IconLoader } from '@/components/icons';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { handleSubmit } from '../actions';

const RESET_CODE_TIMER_DURATION = 60; // seconds

export default function Form() {
  const t = useTranslations('forgotPasswordPage');
  const validation = useTranslations('validation');
  const [remainingTime, setRemainingTime] = useState(0);

  const [formState, action, isPending] = useActionState(
    (_: unknown, formData: FormData) => handleSubmit(_, formData, validation),
    undefined
  );

  useEffect(() => {
    if (formState?.isCodeSent) {
      setRemainingTime(RESET_CODE_TIMER_DURATION);
    }
  }, [formState]);

  useEffect(() => {
    if (remainingTime <= 0) return;

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingTime]);

  return (
    <form
      noValidate
      action={action}
      className="flex w-full max-w-[336px] flex-col gap-3 md:max-w-[400px]"
    >
      {formState?.apiError && <Alert dismissible>{formState.apiError}</Alert>}
      <h2 className="paragraph-4">{t('description')}</h2>
      <Input
        defaultValue={formState?.data.email}
        errorMessage={formState?.errors?.email}
        name="email"
        placeholder={`${t('email')}*`}
      />
      {remainingTime > 0 && <Alert variant={'success'}>{t('emailSent')}</Alert>}
      <div className="mt-4 self-center">
        {isPending ? (
          <IconLoader size={46} />
        ) : (
          <Button
            className="whitespace-normal"
            disabled={isPending || remainingTime > 0}
            size={'default'}
            type="submit"
            typography={'button1'}
            variant={'filled'}
          >
            {remainingTime > 0
              ? `${t('sendPasswordResetEmail')} (${remainingTime}s)`
              : t('sendPasswordResetEmail')}
          </Button>
        )}
      </div>
    </form>
  );
}
