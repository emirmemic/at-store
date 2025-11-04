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
    <div className="mx-auto w-full max-w-lg">
      <form noValidate action={action} className="space-y-4">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-neutral-200/50 transition-shadow hover:shadow-xl">
          <Input
            required
            autoComplete="name"
            errorMessage={state?.errors?.name}
            id="name"
            name="name"
            placeholder={t('registrationPage.nameAndSurname')}
            type="text"
            value={formValues.name}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, name: e.target.value }))
            }
            className="h-14 rounded-none border-0 border-b border-neutral-200 bg-white text-lg focus:border-blue-600 focus:ring-0 focus-visible:ring-0"
          />

          <Input
            required
            autoComplete="email"
            errorMessage={state?.errors?.email}
            id="email"
            name="email"
            placeholder={t('registrationPage.email')}
            type="email"
            value={formValues.email}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, email: e.target.value }))
            }
            className="h-14 rounded-none border-0 bg-white text-lg focus:border-blue-600 focus:ring-0 focus-visible:ring-0"
          />
        </div>

        <Button
          className="relative h-14 w-full rounded-2xl bg-blue-600 text-lg font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl active:scale-[0.99] disabled:opacity-50"
          disabled={isPending}
          type="submit"
        >
          {isPending && (
            <IconLoader
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white"
              size={22}
            />
          )}
          {t('newsletterPage.signUp')}
        </Button>

        {state?.apiError && (
          <Alert dismissible variant="destructive" className="rounded-xl">
            <AlertDescription>{state.apiError}</AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}
