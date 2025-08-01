'use client';

import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useRef, useState } from 'react';
import { ZodError } from 'zod';

import { IconLoader } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputFileUpload } from '@/components/ui/input-file';
import { Textarea } from '@/components/ui/textarea';
import { FileImageSchema } from '@/lib/schemas/complaints';

import { complaintsAction } from '../actions';

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

export default function ComplaintsForm() {
  const t = useTranslations();
  const validation = useTranslations('validation');
  const [alertVisible, setAlertVisible] = useState(false);
  const deviceImageRef = useRef<{ clear: () => void } | null>(null);
  const warrantyImageRef = useRef<{ clear: () => void } | null>(null);
  const billImageRef = useRef<{ clear: () => void } | null>(null);
  const [fileErrors, setFileErrors] = useState({
    deviceImage: undefined as string | undefined,
    warrantyImage: undefined as string | undefined,
    billImage: undefined as string | undefined,
  });
  const clearFileInputs = () => {
    if (deviceImageRef.current) {
      deviceImageRef.current.clear();
    }
    if (warrantyImageRef.current) {
      warrantyImageRef.current.clear();
    }
    if (billImageRef.current) {
      billImageRef.current.clear();
    }
  };
  const [formState, submitAction, isPending] = useActionState(
    (prevState: unknown, formData: FormData) =>
      complaintsAction(prevState, formData, validation),
    undefined
  );
  useEffect(() => {
    if ((formState === null && !isPending) || formState?.errors) {
      setAlertVisible(true);
    }
    if ((formState === null || formState?.errors) && !isPending) {
      clearFileInputs();
    }
    if (formState?.errors) {
      setFileErrors((errors) => ({
        ...errors,
        deviceImage: formState.errors.deviceImage,
        warrantyImage: formState.errors.warrantyImage,
        billImage: formState.errors.billImage,
      }));
    }
  }, [formState, isPending]);

  const handleFileChange = (
    field: keyof typeof fileErrors,
    files: File[] | null
  ) => {
    const file = files && files[0] ? files[0] : null;
    setFileErrors((errors) => ({ ...errors, [field]: undefined }));
    if (!file) {
      return;
    }
    try {
      const fd = {
        billImage: field === 'billImage' ? file : null,
        deviceImage: field === 'deviceImage' ? file : null,
        warrantyImage: field === 'warrantyImage' ? file : null,
      };
      FileImageSchema(validation).parse(fd);
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = Object.fromEntries(
          [...error.errors]
            .reverse()
            .map(({ path, message }) => [path[0], message])
        );
        setFileErrors((errors) => ({ ...errors, [field]: fieldErrors[field] }));
      }
    }
  };
  const formStyle = 'flex flex-col gap-y-4';

  return (
    <form noValidate action={submitAction}>
      <div className="flex w-full flex-col px-6 md:grid md:max-w-2xl md:grid-cols-3 md:justify-self-center md:px-0 lg:max-w-3xl">
        <div className={`md:col-span-2 md:max-w-96 ${formStyle}`}>
          <div>
            <FormLabel
              htmlFor="name"
              title={`${t('complaintsPage.formName')}*`}
            />
            <Input
              required
              aria-labelledby="name"
              aria-required="true"
              autoComplete="given-name"
              defaultValue={formState?.data.name}
              errorMessage={formState?.errors.name}
              id="name"
              name="name"
              placeholder={t('complaintsPage.formName')}
              type="text"
            />
          </div>
          <div>
            <FormLabel
              htmlFor="surname"
              title={`${t('complaintsPage.formSurName')}*`}
            />
            <Input
              required
              aria-labelledby="surname"
              aria-required="true"
              autoComplete="family-name"
              defaultValue={formState?.data.surname}
              errorMessage={formState?.errors.surname}
              id="surname"
              name="surname"
              placeholder={t('complaintsPage.formSurName')}
              type="text"
            />
          </div>
          <div>
            <FormLabel
              htmlFor="phoneNumber"
              title={`${t('complaintsPage.formNumber')}*`}
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
              title={`${t('complaintsPage.formEmail')}*`}
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
          <div>
            <FormLabel
              htmlFor="message"
              title={`${t('common.messagePlaceholder')}*`}
            />
            <Textarea
              required
              aria-labelledby="message"
              defaultValue={formState?.data.message}
              errorMessage={formState?.errors.message}
              id="message"
              name="message"
              placeholder={t('complaintsPage.formMessage')}
            />
          </div>
        </div>
        <div
          className={`w-full max-w-48 ${formStyle} self-center pt-6 md:self-start md:justify-self-end md:pt-0`}
        >
          <FormLabel
            htmlFor="deviceImage"
            title2={`${t('complaintsPage.deviceImage')}*`}
          />
          <InputFileUpload
            ref={deviceImageRef}
            required
            accept=".jpeg,.png"
            aria-labelledby="deviceImage"
            aria-required="true"
            disabled={isPending}
            errorMessage={fileErrors.deviceImage}
            id="deviceImage"
            name="deviceImage"
            onFileChange={(files) => handleFileChange('deviceImage', files)}
          />
          <FormLabel
            htmlFor="warrantyImage"
            title2={`${t('complaintsPage.warrantyImage')}*`}
          />
          <InputFileUpload
            ref={warrantyImageRef}
            required
            accept=".jpeg,.png"
            aria-labelledby="warrantyImage"
            aria-required="true"
            disabled={isPending}
            errorMessage={fileErrors.warrantyImage}
            id="warrantyImage"
            name="warrantyImage"
            onFileChange={(files) => handleFileChange('warrantyImage', files)}
          />
          <FormLabel
            htmlFor="billImage"
            title2={`${t('complaintsPage.billImage')}*`}
          />
          <InputFileUpload
            ref={billImageRef}
            required
            accept=".jpeg,.png"
            aria-labelledby="billImage"
            aria-required="true"
            disabled={isPending}
            errorMessage={fileErrors.billImage}
            id="billImage"
            name="billImage"
            onFileChange={(files) => handleFileChange('billImage', files)}
          />
          <div className="text-red-deep paragraph-2">
            {formState?.errors.msg}
          </div>
        </div>
        <div className="self-center pt-6 md:justify-self-end md:pt-8">
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
              {t('complaintsPage.buttonSubmit')}
            </Button>
          )}
        </div>
        <div className="w-full max-w-[336] self-center pt-2 md:col-span-2 md:justify-self-center md:pt-8">
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
