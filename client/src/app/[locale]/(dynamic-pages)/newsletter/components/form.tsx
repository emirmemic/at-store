'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { useActionState, useContext, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { IconLoader } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { UserContext } from '@/app/providers';
import { handleSubmit } from '../actions';
import { toast } from '@/lib/hooks';
import { useTranslations } from 'next-intl';

export default function Form() {
  const t = useTranslations('');
  const validation = useTranslations('validation');
  const { updateUserNewsletter } = useContext(UserContext);
  const [formValues, setFormValues] = useState({ name: '', email: '' });
  const [state, action, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      handleSubmit(prevState, formData, validation),
    undefined
  );
  useEffect(() => {
    if (state && state.data && !state.apiError && !state.errors) {
      toast({
        title: t('newsletterPage.successfulSignUp'),
        variant: 'success',
      });
      setFormValues({ name: '', email: '' });
      updateUserNewsletter(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, t]);

  return (
    <form
      noValidate
      action={action}
      className="flex w-full max-w-[336px] flex-col gap-3"
    >
      <label className="flex flex-col gap-3">
        <span className="paragraph-2">
          {t('registrationPage.nameAndSurname')}
        </span>
        <Input
          required
          autoComplete="name"
          errorMessage={state?.errors?.name}
          id="name"
          name="name"
          placeholder={t('registrationPage.enterNameSurname')}
          type="text"
          value={formValues.name}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </label>

      <label className="mb-11 flex flex-col gap-3">
        <span className="paragraph-2">{t('registrationPage.email')}</span>
        <Input
          required
          autoComplete="email"
          errorMessage={state?.errors?.email}
          id="email"
          name="email"
          placeholder={'prodaja@atstore.ba'}
          type="email"
          value={formValues.email}
          onChange={(e) =>
            setFormValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </label>

      <Button
        className="relative mx-auto w-fit"
        disabled={isPending}
        size="lg"
        type="submit"
        typography="button1"
        variant="filled"
      >
        {isPending && (
          <IconLoader
            className="absolute left-4 top-1/2 translate-y-[-50%] text-white"
            size={24}
          />
        )}
        {t('newsletterPage.signUp')}
      </Button>

      {state?.apiError && (
        <Alert dismissible variant={'destructive'}>
          <AlertDescription>{state.apiError}</AlertDescription>
        </Alert>
      )}
    </form>
  );
}
