'use client';
import { useTranslations } from 'next-intl';
import { useActionState, useContext, useEffect } from 'react';

import { UserContext } from '@/app/providers';
import { IconChevron, IconLoader } from '@/components/icons';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/lib/hooks/use-toast';
import { PaymentMethod } from '@/lib/schemas/payment-method';

import { CardContainer } from '../../../components';
import { PaymentMethodResponse } from '../../../types';
import { handleSubmit } from '../actions';
import { inputFields } from '../data';

export default function AddPaymentForm({
  callback,
}: {
  callback: (paymentMethod?: PaymentMethodResponse) => void;
}) {
  const t = useTranslations();
  const validation = useTranslations('validation');
  const userId = useContext(UserContext).user?.id;

  const [formState, action, isPending] = useActionState(
    (_: unknown, formData: FormData) =>
      handleSubmit(_, formData, validation, userId ?? 0),
    undefined
  );

  useEffect(() => {
    if (formState?.paymentMethod) {
      toast({
        title: t('common.changesSuccessfullySaved'),
        variant: 'success',
      });
      callback(formState?.paymentMethod);
    }
  }, [formState, t, callback]);

  return (
    <CardContainer className="relative w-full border-grey-silver bg-white px-4 py-20">
      <h2 className="mb-9 text-center paragraph-1">
        {t('accountPage.paymentMethods.dialogTitle')}
      </h2>
      <form
        noValidate
        action={action}
        className="flex w-full flex-col items-center justify-center gap-4"
      >
        {formState?.apiError && (
          <Alert dismissible variant={'destructive'}>
            {formState.apiError}
          </Alert>
        )}
        <button
          className="absolute left-6 top-6 flex items-center gap-6 hover:text-grey-medium"
          type="button"
          onClick={() => callback()}
        >
          <IconChevron className="rotate-90" />
          <span className="paragraph-2">{t('common.back')}</span>
        </button>
        {inputFields.map((field) => (
          <div
            key={field.id}
            className="flex w-full max-w-80 flex-col gap-4 md:max-w-96"
          >
            <label htmlFor={field.id}>
              <span className="paragraph-2">
                {`${t(`accountPage.paymentMethods.${field.name}`)} *`}
              </span>
            </label>
            <Input
              className="bg-white"
              defaultValue={formState?.data[field.name as keyof PaymentMethod]}
              errorMessage={
                formState?.errors?.[field.name as keyof PaymentMethod]
              }
              id={field.id}
              name={field.name}
              placeholder={t(`accountPage.paymentMethods.${field.name}`)}
              type={field.type}
            />
          </div>
        ))}

        <div className="mt-16 text-center">
          {isPending ? (
            <IconLoader size={46} />
          ) : (
            <Button
              disabled={isPending}
              size={'default'}
              type="submit"
              typography={'button1'}
              variant={'filled'}
            >
              {t('common.save')}
            </Button>
          )}
        </div>
      </form>
    </CardContainer>
  );
}
