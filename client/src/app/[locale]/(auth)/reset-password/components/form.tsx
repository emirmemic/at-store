'use client';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useActionState, useContext, useEffect } from 'react';

import { UserContext } from '@/app/providers';
import { IconLoader } from '@/components/icons';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PAGE_NAMES } from '@/i18n/page-names';
import { useRouter } from '@/i18n/routing';
import { useToast } from '@/lib/hooks/use-toast';

import { handleSubmit } from '../actions';

export default function Form() {
  const t = useTranslations('resetPasswordPage');
  const validation = useTranslations('validation');
  const router = useRouter();
  const searchParams = useSearchParams();

  const { toast } = useToast();

  const { setUser } = useContext(UserContext);

  const [formState, action, isPending] = useActionState(
    (_: unknown, formData: FormData) =>
      handleSubmit(_, formData, searchParams.get('code') ?? '', validation),
    undefined
  );

  useEffect(() => {
    if (formState?.user) {
      router.replace(PAGE_NAMES.HOME);
      setUser(formState.user);
      toast({
        title: t('passwordChanged'),
        variant: 'success',
      });
    }
  }, [formState, router, setUser, toast, t]);

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
        defaultValue={formState?.data.password}
        errorMessage={formState?.errors?.password}
        name="password"
        placeholder={`${t('newPassword')}*`}
        type="password"
      />
      <Input
        defaultValue={formState?.data.passwordConfirmation}
        errorMessage={formState?.errors?.passwordConfirmation}
        name="passwordConfirmation"
        placeholder={`${t('confirmPassword')}*`}
        type="password"
      />
      <div className="mt-4 self-center">
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
            {t('resetPassword')}
          </Button>
        )}
      </div>
    </form>
  );
}
