'use client';

import { FormEvent } from 'react';
import { useTranslations } from 'next-intl';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AddressFormData } from '@/lib/schemas/address';

interface AddressFormProps {
  mode: 'create' | 'edit';
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting: boolean;
  errors: Partial<Record<keyof AddressFormData, string>>;
  apiError?: string | null;
  initialValues?: Partial<AddressFormData>;
}

export function AddressForm({
  mode,
  onSubmit,
  isSubmitting,
  errors,
  apiError,
  initialValues,
}: AddressFormProps) {
  const t = useTranslations('accountPage.addresses.form');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4"
      noValidate
    >
      {apiError && (
        <Alert dismissible variant="destructive">
          {apiError}
        </Alert>
      )}
      <Input
        defaultValue={initialValues?.label}
        errorMessage={errors.label}
        name="label"
        placeholder={t('label')}
      />
      <Textarea
        defaultValue={initialValues?.address}
        errorMessage={errors.address}
        name="address"
        placeholder={t('address')}
        rows={3}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          defaultValue={initialValues?.city ?? ''}
          errorMessage={errors.city}
          name="city"
          placeholder={t('city')}
        />
        <Input
          defaultValue={initialValues?.postalCode ?? ''}
          errorMessage={errors.postalCode}
          name="postalCode"
          placeholder={t('postalCode')}
        />
        <Input
          defaultValue={initialValues?.country ?? ''}
          errorMessage={errors.country}
          name="country"
          placeholder={t('country')}
        />
      </div>
      <Checkbox
        defaultChecked={initialValues?.isDefault}
        labelClassName="flex items-center gap-3 text-black paragraph-3"
        name="isDefault"
      >
        {t('isDefault')}
      </Checkbox>
      <Button
        type="submit"
        variant="filled"
        size="lg"
        typography="button1"
        disabled={isSubmitting}
        className="mt-2 self-end"
      >
        {mode === 'create' ? t('save') : t('update')}
      </Button>
    </form>
  );
}
