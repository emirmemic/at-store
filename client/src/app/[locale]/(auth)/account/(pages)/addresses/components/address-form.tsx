'use client';

import { AddressFormData } from '@/lib/schemas/address';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import InputErrorMessage from '@/components/ui/input-error-message';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';

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
        <div className="flex flex-col gap-2">
          <select
            defaultValue={initialValues?.country ?? ''}
            name="country"
            className="transition-border rounded-2xl border border-transparent bg-grey-extra-light px-4 py-3 text-black duration-300 focus-visible:border-grey-light focus-visible:outline-none"
          >
            <option value="">{t('country')}</option>
            <option value="Bosnia and Herzegovina">Bosna i Hercegovina</option>
            <option value="Croatia">Hrvatska</option>
            <option value="Serbia">Srbija</option>
            <option value="Montenegro">Crna Gora</option>
            <option value="Slovenia">Slovenija</option>
            <option value="Other">Ostalo</option>
          </select>
          {errors.country && (
            <InputErrorMessage errorMessage={errors.country} />
          )}
        </div>
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
