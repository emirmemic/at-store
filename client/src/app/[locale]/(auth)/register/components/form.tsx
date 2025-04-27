import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

import { IconLoader } from '@/components/icons';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RegisterFormData } from '@/lib/schemas/auth';

import { handleSubmit } from '../actions';

export default function Form() {
  const t = useTranslations('registrationPage');
  const validation = useTranslations('validation');
  const [formState, action, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      handleSubmit<RegisterFormData>(
        prevState,
        formData,
        'individual',
        validation
      ),
    undefined
  );

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
      <Input
        defaultValue={formState?.data.address}
        errorMessage={formState?.errors?.address}
        name="address"
        placeholder={`${t('address')}*`}
      />
      <Input
        defaultValue={formState?.data.phoneNumber}
        errorMessage={formState?.errors?.phoneNumber}
        name="phoneNumber"
        placeholder={`${t('phoneNumber')}*`}
        type="number"
      />
      <Input
        defaultValue={formState?.data.dateOfBirth}
        errorMessage={formState?.errors?.dateOfBirth}
        name="dateOfBirth"
        placeholder={`${t('dateOfBirth')}*`}
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
