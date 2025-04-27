import { useTranslations } from 'next-intl';
import { useActionState } from 'react';

import { IconLoader } from '@/components/icons';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RegisterOrgFormData } from '@/lib/schemas/auth';

import { handleSubmit } from '../actions';

export default function OrgUserForm() {
  const t = useTranslations('registrationPage');
  const validation = useTranslations('validation');

  const [formState, action, isPending] = useActionState(
    (_: unknown, formData: FormData) =>
      handleSubmit<RegisterOrgFormData>(_, formData, 'org', validation),
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
        defaultValue={formState?.data.nameAndSurname}
        errorMessage={formState?.errors?.nameAndSurname}
        name="nameAndSurname"
        placeholder={`${t('nameAndSurname')}*`}
      />
      <Input
        defaultValue={formState?.data.companyName}
        errorMessage={formState?.errors?.companyName}
        name="companyName"
        placeholder={`${t('companyName')}*`}
      />
      <Input
        defaultValue={formState?.data.companyIdNumber}
        errorMessage={formState?.errors?.companyIdNumber}
        name="companyIdNumber"
        placeholder={`${t('companyIdNumber')}*`}
        type="number"
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
        defaultValue={formState?.data.phoneNumber}
        errorMessage={formState?.errors?.phoneNumber}
        name="phoneNumber"
        placeholder={`${t('phoneNumber')}*`}
        type="number"
      />
      <Input
        defaultValue={formState?.data.address}
        errorMessage={formState?.errors?.address}
        name="address"
        placeholder={`${t('address')}*`}
      />
      <Input
        hidden
        className="hidden"
        defaultValue={'organization'}
        name="role"
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
