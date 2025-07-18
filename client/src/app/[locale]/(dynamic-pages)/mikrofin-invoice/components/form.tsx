'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { useActionState, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { IconLoader } from '@/components/icons';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { mikrofin } from '@/assets/images';
import { mikrofinAction } from '../actions';
import { useTranslations } from 'next-intl';
import { useUserProvider } from '@/app/providers/user-provider';

const FormLabel = ({
  title,
  title2,
  htmlFor,
}: {
  title?: string;
  title2?: string;
  htmlFor?: string;
}) => (
  <label htmlFor={htmlFor}>
    {title && <span className="block pb-3 paragraph-2">{title}</span>}
    {title2 && <span className="block heading-4">{title2}</span>}
  </label>
);

export default function MikrofinForm() {
  // Hooks and context
  const searchParams = useSearchParams();
  const productIdQuery = searchParams.get('productId') || '';
  const router = useRouter();
  const { user } = useUserProvider();
  const t = useTranslations();
  const [prefilled, setPrefilled] = useState(true);

  // Initial values
  const nameAndSurname = user
    ? user.accountDetails.name + ' ' + user.accountDetails?.surname || ''
    : '';
  const defaultInitialValues = {
    nameAndSurname: prefilled ? nameAndSurname : '',
    email: prefilled ? user?.accountDetails.email || '' : '',
    phoneNumber: prefilled ? user?.accountDetails.phoneNumber || '' : '',
    productVariantId: prefilled ? productIdQuery : '',
    note: '',
  };
  const [formState, submitAction, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      mikrofinAction(prevState, formData, validation),
    undefined
  );
  const validation = useTranslations('validation');
  const [alertVisible, setAlertVisible] = useState(false);
  const pathname = usePathname();

  // Lifecycle methods
  useEffect(() => {
    if (formState || formState === null) {
      setAlertVisible(true);
      setPrefilled(false);
      router.replace(pathname, { scroll: false });
    }
  }, [formState, pathname, router]);

  return (
    <form noValidate action={submitAction}>
      <div className="flex w-full max-w-xl flex-col gap-y-6 px-6 md:px-0 lg:max-w-2xl">
        <div className="flex flex-col gap-y-4">
          <div>
            <FormLabel
              htmlFor="nameAndSurname"
              title={t('mikrofinInvoicePage.placeholder.name')}
            />
            <Input
              autoComplete="name and surname"
              defaultValue={
                formState?.data.nameAndSurname ||
                defaultInitialValues.nameAndSurname
              }
              errorMessage={formState?.errors.nameAndSurname}
              id="nameAndSurname"
              name="nameAndSurname"
              placeholder={`${t('mikrofinInvoicePage.formName')}*`}
              type="text"
            />
          </div>
          <div>
            <FormLabel
              htmlFor="email"
              title={`${t('mikrofinInvoicePage.formEmail')}*`}
            />
            <Input
              autoComplete="email"
              defaultValue={formState?.data.email || defaultInitialValues.email}
              errorMessage={formState?.errors.email}
              id="email"
              name="email"
              placeholder={t('mikrofinInvoicePage.placeholder.email')}
              type="email"
            />
          </div>
          <div>
            <FormLabel
              htmlFor="phoneNumber"
              title={`${t('mikrofinInvoicePage.formNumber')}*`}
            />
            <Input
              autoComplete="tel"
              defaultValue={
                formState?.data.phoneNumber || defaultInitialValues.phoneNumber
              }
              errorMessage={formState?.errors.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
              placeholder={t('mikrofinInvoicePage.placeholder.number')}
              type="tel"
            />
          </div>
          <div>
            <FormLabel
              htmlFor="productVariantId"
              title={t('mikrofinInvoicePage.placeholder.productId')}
            />
            <Input
              defaultValue={
                formState?.data?.productVariantId ||
                defaultInitialValues.productVariantId
              }
              errorMessage={formState?.errors.productVariantId}
              id="productVariantId"
              name="productVariantId"
              placeholder={`${t('mikrofinInvoicePage.productId')}*`}
              type="text"
            />
          </div>
          <div>
            <FormLabel
              htmlFor="note"
              title={t('mikrofinInvoicePage.placeholder.note')}
            />
            <Textarea
              defaultValue={formState?.data.note}
              errorMessage={formState?.errors.note}
              id="note"
              name="note"
              placeholder={t('mikrofinInvoicePage.formNote')}
            />
          </div>
        </div>
        <div className="flex justify-center pt-4">
          {isPending ? (
            <IconLoader size={46} />
          ) : (
            <Button
              disabled={isPending}
              size="lg"
              type="submit"
              typography="button1"
              variant="filled"
            >
              {t('common.submit')}
            </Button>
          )}
        </div>
        <div className="pt-4">
          <Alert
            dismissible
            variant={formState === null ? 'success' : 'destructive'}
            visible={alertVisible}
            onClose={() => setAlertVisible(false)}
          >
            <AlertDescription>
              {formState?.errors?.msg
                ? formState.errors.msg
                : formState === null
                  ? t('common.requestSuccessAlert')
                  : t('common.requestFailAlert')}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </form>
  );
}
