'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { useActionState, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { IconLoader } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { handleSubmit } from './actions';
import { toast } from '@/lib/hooks';
import { useTranslations } from 'next-intl';
import { useUserProvider } from '@/app/providers/user-provider';

export default function NewsletterSection() {
  const t = useTranslations('');
  const validation = useTranslations('validation');
  const { updateUserNewsletter } = useUserProvider();
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
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Two Row Layout */}
        <div className="space-y-8 md:space-y-10">
          {/* Row 1: Header */}
          <div className="text-center">
            <h2 className="mb-3 text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
              Novosti. Direktno u tvoj inbox.
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg lg:text-xl">
              Budi prvi koji otkriva sve o novim uređajima, promocijama i
              događajima u AT Store-u.
            </p>
          </div>

          {/* Row 2: Form */}
          <div className="mx-auto w-full max-w-4xl">
            <form noValidate action={action}>
              <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="grid gap-0 md:grid-cols-[1fr,1fr,auto]">
                  {/* Name Input */}
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
                      setFormValues((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="h-14 rounded-none border-0 border-b border-neutral-200 bg-white text-base focus:border-blue-600 focus:ring-0 focus-visible:ring-0 md:border-b-0 md:border-r"
                  />

                  {/* Email Input */}
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
                      setFormValues((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="h-14 rounded-none border-0 border-b border-neutral-200 bg-white text-base focus:border-blue-600 focus:ring-0 focus-visible:ring-0 md:border-b-0 md:border-r"
                  />

                  {/* Submit Button */}
                  <Button
                    className="relative h-14 w-full rounded-none bg-blue-600 px-8 text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 md:w-auto md:rounded-r-2xl"
                    disabled={isPending}
                    type="submit"
                  >
                    {isPending && (
                      <IconLoader
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white md:left-4 md:translate-x-0"
                        size={22}
                      />
                    )}
                    <span className={isPending ? 'invisible' : ''}>
                      {t('newsletterPage.signUp')}
                    </span>
                  </Button>
                </div>
              </div>

              {state?.apiError && (
                <Alert
                  dismissible
                  variant="destructive"
                  className="mt-4 rounded-xl"
                >
                  <AlertDescription>{state.apiError}</AlertDescription>
                </Alert>
              )}
            </form>
          </div>
          <div className="border-b border-gray-300 pt-8" />
        </div>
      </div>
    </section>
  );
}
