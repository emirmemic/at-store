import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';

import { IconLoader } from '@/components/icons';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PAGE_NAMES } from '@/i18n/page-names';
import { toast } from '@/lib/hooks';
import { RegisterFormData } from '@/lib/schemas/auth';

import { handleSubmit } from '../actions';
import { AddressFields } from './address-fields';

export default function Form() {
  const t = useTranslations('registrationPage');
  const validation = useTranslations('validation');
  const router = useRouter();

  const [formState, action, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      handleSubmit<RegisterFormData>(
        prevState,
        formData,
        'authenticated',
        validation
      ),
    undefined
  );

  useEffect(() => {
    if (formState?.success === true) {
      router.replace(PAGE_NAMES.LOGIN);
      toast({
        title: t('successfulRegistration'),
        variant: 'success',
      });
    }
  }, [formState, router, t]);

  const addressValues = {
    addressLabel: formState?.data?.addressLabel,
    address: formState?.data?.address,
    city: formState?.data?.city,
    postalCode: formState?.data?.postalCode,
    country: formState?.data?.country,
  };

  const addressErrors = {
    addressLabel: formState?.errors?.addressLabel,
    address: formState?.errors?.address,
    city: formState?.errors?.city,
    postalCode: formState?.errors?.postalCode,
    country: formState?.errors?.country,
  };

  return (
    <form
      noValidate
      action={action}
      className="flex w-full max-w-[336px] flex-col gap-3"
    >
      {formState?.apiError && (
        <Alert dismissible variant={'destructive'}>
          {formState.apiError}
        </Alert>
      )}
      <Input
        defaultValue={formState?.data.name}
        errorMessage={formState?.errors?.name}
        name="name"
        placeholder={`${t('name')}*`}
      />
      <Input
        defaultValue={formState?.data.surname}
        errorMessage={formState?.errors?.surname}
        name="surname"
        placeholder={`${t('surname')}*`}
      />
      <Input
        defaultValue={formState?.data.email}
        errorMessage={formState?.errors?.email}
        name="email"
        placeholder={`${t('email')}*`}
      />
      <Input
        defaultValue={formState?.data.password}
        errorMessage={formState?.errors?.password}
        name="password"
        placeholder={`${t('password')}*`}
        type="password"
      />
      <Input
        defaultValue={formState?.data.confirmPassword}
        errorMessage={formState?.errors?.confirmPassword}
        name="confirmPassword"
        placeholder={`${t('confirmPassword')}*`}
        type="password"
      />
      <AddressFields values={addressValues} errors={addressErrors} />
      <Input
        defaultValue={formState?.data.phoneNumber}
        errorMessage={formState?.errors?.phoneNumber}
        name="phoneNumber"
        placeholder={`${t('phoneNumber')}*`}
        type="tel"
      />
      {isPending ? (
        <IconLoader className="mt-3 self-center" size={46} />
      ) : (
        <Button
          className="mt-3 self-center"
          disabled={isPending}
          size={'default'}
          type="submit"
          typography={'button1'}
          variant={'filled'}
        >
          {t('title')}
        </Button>
      )}
    </form>
  );
}
