'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';

import { useCartProvider } from '@/app/providers';
import { useUserProvider } from '@/app/providers/user-provider';
import { IconLoader } from '@/components/icons';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { toast } from '@/lib/hooks/use-toast';

import { Title } from '../../components';
import { handleSubmit } from '../actions';

import OAuthButton from './oauth-button';

export default function Form() {
  const t = useTranslations('loginPage');
  const validation = useTranslations('validation');
  const router = useRouter();

  const { setUser } = useUserProvider();
  const { setCart } = useCartProvider();

  const [formState, action, isPending] = useActionState(
    (_: unknown, formData: FormData) => handleSubmit(_, formData, validation),
    undefined
  );

  useEffect(() => {
    if (formState?.loginResponse) {
      router.replace(PAGE_NAMES.HOME);
      setUser(formState.loginResponse.user);

      setCart(formState.loginResponse.cart);
      toast({
        title: t('loginSuccess'),
        variant: 'success',
      });
    }
  }, [formState, setUser, setCart, router, t]);

  return (
    <form
      noValidate
      action={action}
      className="flex w-full max-w-[336px] flex-col gap-3"
    >
      <Title
        className="mb-8 hidden self-center text-black md:block"
        linkPath={PAGE_NAMES.REGISTER}
        linkText={t('registerPrompt')}
        subtitle={t('subtitle')}
        title={t('title')}
      />
      {formState?.apiError && (
        <Alert dismissible variant={'destructive'}>
          {formState.apiError}
        </Alert>
      )}
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
      <div className="mt-6 flex justify-between gap-2.5">
        <Checkbox
          className="bg-white"
          labelClassName="flex items-center gap-2 paragraph-2 cursor-pointer hover:text-grey-dark transition-colors duration-300 text-black"
          name="rememberMe"
        >
          <span>{t('rememberMe')}</span>
        </Checkbox>
        <Link
          className="text-black paragraph-6"
          href={PAGE_NAMES.FORGOT_PASSWORD}
        >
          {t('forgotPassword')}
        </Link>
      </div>
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
            {t('loginButton')}
          </Button>
        )}
      </div>
    </form>
  );
}
