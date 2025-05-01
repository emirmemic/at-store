'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useState } from 'react';

import { mikrofin } from '@/assets/images';
import { IconLoader } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { mikrofinAction } from '../actions';

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
  const [formState, submitAction, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      mikrofinAction(prevState, formData, validation),
    undefined
  );
  const t = useTranslations();
  const validation = useTranslations('validation');
  const [alertVisible, setAlertVisible] = useState(false);
  useEffect(() => {
    if ((formState === null && !isPending) || formState?.errors) {
      setAlertVisible(true);
    }
  }, [formState, isPending]);
  return (
    <form noValidate action={submitAction}>
      <div className="flex w-full flex-col px-6 md:grid md:grid-cols-3 md:justify-self-center md:px-0">
        <div
          className={'order-1 flex flex-col gap-y-4 md:-order-none md:max-w-96'}
        >
          <div>
            <FormLabel
              htmlFor="nameAndSurname"
              title={t('mikrofinInvoicePage.formName')}
            />
            <Input
              autoComplete="name and surname"
              defaultValue={formState?.data.nameAndSurname}
              errorMessage={formState?.errors.nameAndSurname}
              id="nameAndSurname"
              name="nameAndSurname"
              placeholder={t('mikrofinInvoicePage.formName')}
              type="text"
            />
          </div>
          <div>
            <FormLabel
              htmlFor="email"
              title={t('mikrofinInvoicePage.formEmail')}
            />
            <Input
              autoComplete="email"
              defaultValue={formState?.data.email}
              errorMessage={formState?.errors.email}
              id="email"
              name="email"
              placeholder={t('mikrofinInvoicePage.formEmail')}
              type="email"
            />
          </div>
          <div>
            <FormLabel
              htmlFor="phoneNumber"
              title={t('mikrofinInvoicePage.formNumber')}
            />
            <Input
              autoComplete="tel"
              defaultValue={formState?.data.phoneNumber}
              errorMessage={formState?.errors.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
              placeholder={t('mikrofinInvoicePage.formNumber')}
              type="number"
            />
          </div>
          <div>
            <FormLabel
              htmlFor="productLink"
              title={t('mikrofinInvoicePage.productLink')}
            />
            <Input
              defaultValue={formState?.data.productLink}
              errorMessage={formState?.errors.productLink}
              id="productLink"
              name="productLink"
              placeholder={t('mikrofinInvoicePage.productLink')}
              type="url"
            />
          </div>
          <div>
            <FormLabel
              htmlFor="note"
              title={t('mikrofinInvoicePage.formNote')}
            />
            <Textarea
              defaultValue={formState?.data.note}
              errorMessage={formState?.errors.note}
              id="note"
              name="note"
              placeholder={t('mikrofinInvoicePage.notePlaceHolder')}
            />
          </div>
        </div>
        <div className="order-0 items-center justify-end md:col-span-2 md:grid">
          <div className="max-w-72 justify-self-center pb-12 md:h-72 md:pb-0 lg:h-[382px] lg:max-w-96">
            <Image
              alt="mikrofin"
              className="h-full w-full object-contain"
              height={406}
              src={mikrofin}
              width={1192}
            />
            <p className="pt-5 text-center heading-4 md:bullet-heading-1 lg:pt-9 lg:heading-3">
              {t('mikrofinInvoicePage.microCredit')}
            </p>
          </div>
        </div>
        <div className="order-1 self-center pt-6 md:justify-self-center md:pt-8">
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
          <p className="text-red-deep"> {formState?.errors.msg}</p>
        </div>
        <div className="order-1 w-full max-w-[336] self-center pt-2 md:col-span-2 md:justify-self-center md:pt-8">
          <Alert
            dismissible
            variant={formState === null ? 'success' : 'destructive'}
            visible={alertVisible}
            onClose={() => setAlertVisible(false)}
          >
            <AlertDescription>
              {formState === null
                ? t('common.requestSuccessAlert')
                : t('common.requestFailAlert')}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </form>
  );
}
