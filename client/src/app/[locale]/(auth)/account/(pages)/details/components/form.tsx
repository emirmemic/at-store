import { useTranslations } from 'next-intl';
import { useActionState, useContext } from 'react';

import { UserContext } from '@/app/providers';
import { IconLoader } from '@/components/icons';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AccountDetailsFormData } from '@/lib/schemas/auth';

import { handleSubmit } from '../actions';
import { getInputFields } from '../utils';

export default function Form() {
  const userProvider = useContext(UserContext);
  const accountDetails = userProvider.user?.accountDetails;
  const t = useTranslations();
  const validation = useTranslations('validation');

  const [formState, action, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      handleSubmit(prevState, formData, userProvider, validation),
    {
      data: {
        ...accountDetails,
      } as AccountDetailsFormData,
    }
  );

  const inputFields = getInputFields(accountDetails);
  return (
    <>
      {(formState?.apiError || formState?.success) && (
        <Alert
          dismissible
          className="mb-4 max-w-[350px]"
          variant={formState?.apiError ? 'destructive' : 'success'}
        >
          {formState.apiError || t('common.changesSuccessfullySaved')}
        </Alert>
      )}
      <form
        noValidate
        action={action}
        className="flex w-full flex-col gap-3 lg:flex-row lg:flex-wrap lg:justify-start lg:gap-8"
      >
        {inputFields.map((field) => (
          <div
            key={field.id}
            className="flex w-full flex-col gap-3 lg:min-w-[350px] lg:max-w-[45%]"
          >
            <label
              className={field.disabled ? 'text-grey-light' : ''}
              htmlFor={field.id}
            >
              <span className="paragraph-2">
                {`${t(`accountPage.details.${field.name}`)}${field.required ? ' *' : ''}`}
              </span>
            </label>
            <Input
              className="bg-white"
              defaultValue={
                formState?.data[field.name as keyof AccountDetailsFormData]
              }
              disabled={field.disabled}
              errorMessage={
                formState?.errors?.[field.name as keyof AccountDetailsFormData]
              }
              id={field.id}
              name={field.name}
              placeholder={t(`accountPage.details.${field.name}`)}
              type={field.type}
            />
          </div>
        ))}

        {isPending ? (
          <IconLoader className="mt-3 self-center" size={46} />
        ) : (
          <Button
            className="mt-3 self-center"
            disabled={isPending}
            size={'lg'}
            type="submit"
            typography={'button1'}
            variant={'filled'}
          >
            {t('common.save')}
          </Button>
        )}
      </form>
    </>
  );
}
