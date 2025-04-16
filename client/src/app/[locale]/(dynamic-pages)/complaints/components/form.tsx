'use client';
//TODO Implement Files on change validation

import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useRef, useState } from 'react';

import { IconLoader } from '@/components/icons';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputFileUpload } from '@/components/ui/input-file';
import { Textarea } from '@/components/ui/textarea';

import { complaintsAction } from '../actions';

const FormLabel = ({ title, title2 }: { title?: string; title2?: string }) => (
  <div>
    {title && <p className="pb-3 paragraph-2">{title}</p>}
    {title2 && <p className="heading-4">{title2}</p>}
  </div>
);

export default function ComplaintsForm() {
  const t = useTranslations();
  const [alertVisible, setAlertVisible] = useState(false);
  const deviceImageRef = useRef<{ clear: () => void } | null>(null);
  const warrantyImageRef = useRef<{ clear: () => void } | null>(null);
  const billImageRef = useRef<{ clear: () => void } | null>(null);
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
      complaintsAction(prevState, formData),
    undefined
  );
  useEffect(() => {
    if ((formState === null && !isPending) || formState?.errors) {
      setAlertVisible(true);
    }
  }, [formState, isPending]);
  useEffect(() => {
    if (formState === null && !isPending) {
      clearFileInputs();
    }
  }, [formState, isPending]);

  const formStyle = 'flex flex-col gap-y-4';
  return (
    <form noValidate action={submitAction}>
      <div className="flex w-full flex-col px-6 md:grid md:max-w-2xl md:grid-cols-3 md:justify-self-center md:px-0 lg:max-w-3xl">
        <div className={`md:col-span-2 md:max-w-96 ${formStyle}`}>
          <div>
            <FormLabel title={t('complaintsPage.formName')} />
            <Input
              required
              autoComplete="given-name"
              defaultValue={formState?.data.name}
              errorMessage={formState?.errors.name}
              id="name"
              name="name"
              placeholder="Name"
              type="text"
            />
          </div>
          <div>
            <FormLabel title={t('complaintsPage.formSurName')} />
            <Input
              required
              autoComplete="family-name"
              defaultValue={formState?.data.surname}
              errorMessage={formState?.errors.surname}
              id="surname"
              name="surname"
              placeholder="Surname"
              type="text"
            />
          </div>
          <div>
            <FormLabel title={t('complaintsPage.formNumber')} />
            <Input
              required
              autoComplete="tel-area-code"
              defaultValue={formState?.data.phoneNumber}
              errorMessage={formState?.errors.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Number"
              type="number"
            />
          </div>
          <div>
            <FormLabel title={t('complaintsPage.formEmail')} />
            <Input
              required
              autoComplete="email"
              defaultValue={formState?.data.email}
              errorMessage={formState?.errors.email}
              id="email"
              name="email"
              placeholder="Email"
              type="email"
            />
          </div>
          <div>
            <FormLabel title={t('complaintsPage.formMessage')} />
            <Textarea
              required
              defaultValue={formState?.data.message}
              errorMessage={formState?.errors.message}
              id="message"
              name="message"
              placeholder="Please enter your message here"
            />
          </div>
        </div>
        <div
          className={`w-full max-w-48 ${formStyle} self-center pt-6 md:self-start md:justify-self-end md:pt-0`}
        >
          <FormLabel title2={t('complaintsPage.deviceImage')} />
          <InputFileUpload
            ref={deviceImageRef}
            accept=".svg,.png"
            disabled={isPending}
            errorMessage={formState?.errors.deviceImage}
            name="deviceImage"
          />
          <FormLabel title2={t('complaintsPage.warrantyImage')} />
          <InputFileUpload
            ref={warrantyImageRef}
            accept=".svg,.png"
            disabled={isPending}
            errorMessage={formState?.errors.warrantyImage}
            name="warrantyImage"
          />
          <FormLabel title2={t('complaintsPage.billImage')} />
          <InputFileUpload
            ref={billImageRef}
            accept=".svg,.png"
            disabled={isPending}
            errorMessage={formState?.errors.billImage}
            name="billImage"
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
