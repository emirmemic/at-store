'use client';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useRef, useState } from 'react';
import { ZodError } from 'zod';

import { IconLoader } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputFileUpload } from '@/components/ui/input-file';
import { FileImageSchema } from '@/lib/schemas/educationalDiscount';

import { formAction } from '../actions';

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
    {title2 && <span className="block pb-3 heading-5">{title2}</span>}
  </label>
);

export default function EducationalDiscountForm() {
  const t = useTranslations();
  const [formState, submitAction, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      formAction(prevState, formData, validation),
    undefined
  );
  const indexPhotoRef = useRef<{ clear: () => void } | null>(null);
  const clearFileInputs = () => {
    if (indexPhotoRef.current) {
      indexPhotoRef.current.clear();
    }
  };

  const validation = useTranslations('validation');
  const [fileError, setFileError] = useState<string | undefined>();
  const [alertVisible, setAlertVisible] = useState(false);
  useEffect(() => {
    if ((formState === null && !isPending) || formState?.errors) {
      setAlertVisible(true);
    }
    if ((formState === null || formState?.errors) && !isPending) {
      clearFileInputs();
    }
    if (formState?.errors?.indexPhoto) {
      setFileError(formState?.errors?.indexPhoto);
    }
  }, [formState, isPending]);

  const handleFileChange = (files: File[] | null) => {
    setFileError(undefined);
    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    try {
      FileImageSchema(validation).parse(file);
    } catch (err) {
      if (err instanceof ZodError) {
        setFileError(err.errors[0].message);
      }
    }
  };

  return (
    <form noValidate action={submitAction}>
      <h2 className="pb-12 text-center heading-2">
        {t('educationalDiscountPage.formTitle')}
      </h2>
      <div className="flex w-full flex-col px-6 lg:grid lg:grid-cols-3 lg:justify-self-center lg:px-0">
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4 lg:max-w-96">
            <div>
              <FormLabel
                htmlFor="name"
                title={`${t('educationalDiscountPage.formName')}*`}
              />
              <Input
                aria-labelledby="name"
                aria-required="true"
                autoComplete="given-name"
                defaultValue={formState?.data.name}
                errorMessage={formState?.errors.name}
                id="name"
                name="name"
                placeholder={t('educationalDiscountPage.formName')}
                type="text"
              />
            </div>
            <div>
              <FormLabel
                htmlFor="surname"
                title={`${t('educationalDiscountPage.formSurName')}*`}
              />
              <Input
                aria-labelledby="surname"
                aria-required="true"
                autoComplete="family-name"
                defaultValue={formState?.data.surname}
                errorMessage={formState?.errors.surname}
                id="surname"
                name="surname"
                placeholder={t('educationalDiscountPage.formSurName')}
                type="text"
              />
            </div>
            <div>
              <FormLabel
                htmlFor="phoneNumber"
                title={`${t('educationalDiscountPage.formNumber')}*`}
              />
              <Input
                required
                aria-labelledby="phoneNumber"
                aria-required="true"
                autoComplete="tel"
                defaultValue={formState?.data.phoneNumber}
                errorMessage={formState?.errors.phoneNumber}
                id="phoneNumber"
                name="phoneNumber"
                placeholder={t('mikrofinInvoicePage.placeholder.number')}
                type="tel"
              />
            </div>
            <div>
              <FormLabel
                htmlFor="email"
                title={`${t('educationalDiscountPage.formEmail')}*`}
              />
              <Input
                required
                aria-labelledby="email"
                aria-required="true"
                autoComplete="email"
                defaultValue={formState?.data.email}
                errorMessage={formState?.errors.email}
                id="email"
                name="email"
                placeholder={t('mikrofinInvoicePage.placeholder.email')}
                type="email"
              />
            </div>
          </div>
          <div className="pb-12 pt-8 lg:pb-0">
            <FormLabel
              htmlFor="indexPhoto"
              title2={`${t('educationalDiscountPage.addPhoto')}*`}
            />
            <InputFileUpload
              ref={indexPhotoRef}
              accept=".svg,.png"
              disabled={isPending}
              errorMessage={fileError}
              id="indexPhoto"
              name="indexPhoto"
              onFileChange={handleFileChange}
            />
          </div>
        </div>
        <div className="lg:justify-self-end">
          <h2 className="pb-7 text-center heading-4 lg:text-end">
            {t('educationalDiscountPage.howToDiscount')}
          </h2>
          <p className="text-center paragraph-2 lg:text-end">
            {t('educationalDiscountPage.fillForm')}
          </p>
        </div>
        <div className="self-center pt-6 md:justify-self-center md:pt-8">
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
        <div className="w-full max-w-[336] self-center pt-2 lg:col-span-2 lg:justify-self-center lg:pt-8">
          <Alert
            dismissible
            variant={formState === null ? 'success' : 'destructive'}
            visible={alertVisible}
            onClose={() => setAlertVisible(false)}
          >
            <AlertDescription>
              {formState === null
                ? t('common.requestSuccessAlert')
                : formState?.errors?.msg
                  ? formState.errors.msg
                  : t('common.requestFailAlert')}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </form>
  );
}
