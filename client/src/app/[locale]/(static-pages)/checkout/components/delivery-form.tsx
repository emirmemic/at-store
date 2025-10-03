'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useMemo, useState } from 'react';

import { useUserProvider } from '@/app/providers/user-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PAGE_NAMES } from '@/i18n/page-names';
import { DeliveryForm } from '@/lib/schemas/checkout';
import { cn } from '@/lib/utils/utils';

import { inputFields } from '../data';
import { useCheckoutProvider } from '../providers/checkout-provider';
import { handleSubmit } from '../utils';

export default function Form() {
  const t = useTranslations();
  const router = useRouter();
  const validation = useTranslations('validation');
  const { setDeliveryForm, deliveryForm, deliveryMethod, selectedStore } =
    useCheckoutProvider();
  const { user } = useUserProvider();
  const accountDetails = user?.accountDetails;
  const [formState, action, isPending] = useActionState(
    (_: unknown, __: FormData) => handleSubmit(_, __, validation),
    (deliveryForm && {
      data: deliveryForm as DeliveryForm,
    }) ||
      (accountDetails && {
        data: {
          address: accountDetails.address,
          email: accountDetails.email,
          name: accountDetails.name,
          surname: accountDetails.surname,
          phoneNumber: accountDetails.phoneNumber,
          city: '',
          postalCode: '',
          country: '',
        } as DeliveryForm,
      })
  );
  const addresses = user?.addresses ?? [];
  const hasAddresses = addresses.length > 0;
  const resolvedSelectedAddressId = useMemo(() => {
    if (!hasAddresses) return null;

    const currentAddressValue =
      formState?.data?.address ||
      deliveryForm?.address ||
      accountDetails?.address;

    if (currentAddressValue) {
      const matched = addresses.find(
        (item) => item.address === currentAddressValue
      );
      if (matched) return matched.documentId;
    }

    const defaultAddress =
      addresses.find((item) => item.isDefault) ?? addresses[0] ?? null;

    return defaultAddress?.documentId ?? null;
  }, [
    hasAddresses,
    addresses,
    formState?.data?.address,
    deliveryForm?.address,
    accountDetails?.address,
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    resolvedSelectedAddressId
  );
  const [formValues, setFormValues] = useState<DeliveryForm>(() => ({
    name: formState?.data?.name ?? accountDetails?.name ?? '',
    surname: formState?.data?.surname ?? accountDetails?.surname ?? '',
    address: formState?.data?.address ?? accountDetails?.address ?? '',
    email: formState?.data?.email ?? accountDetails?.email ?? '',
    city: formState?.data?.city ?? '',
    postalCode: formState?.data?.postalCode ?? '',
    country: formState?.data?.country ?? '',
    note: formState?.data?.note ?? '',
    phoneNumber:
      formState?.data?.phoneNumber ?? accountDetails?.phoneNumber ?? '',
  }));
  const selectedAddress = useMemo(() => {
    if (!selectedAddressId) return null;
    return (
      addresses.find((item) => item.documentId === selectedAddressId) ?? null
    );
  }, [addresses, selectedAddressId]);

  useEffect(() => {
    if (formState?.success) {
      setDeliveryForm(formState.data);
      router.push(PAGE_NAMES.CHECKOUT_PAYMENT);
    }
  }, [formState, setDeliveryForm, router]);

  useEffect(() => {
    if (!selectedAddressId && resolvedSelectedAddressId) {
      setSelectedAddressId(resolvedSelectedAddressId);
    }
  }, [resolvedSelectedAddressId, selectedAddressId]);

  useEffect(() => {
    if (!formState?.data) return;
    setFormValues(formState.data);
  }, [formState?.data]);

  useEffect(() => {
    if (!selectedAddress || deliveryMethod === 'pickup') return;

    setFormValues((prev) => {
      const next = {
        ...prev,
        address: selectedAddress.address,
        city: selectedAddress.city ?? '',
        postalCode: selectedAddress.postalCode ?? '',
        country: selectedAddress.country ?? '',
      };

      if (
        prev.address === next.address &&
        prev.city === next.city &&
        prev.postalCode === next.postalCode &&
        prev.country === next.country
      ) {
        return prev;
      }

      return next;
    });
  }, [selectedAddress, deliveryMethod]);

  const handleFieldChange = (field: keyof DeliveryForm, value: string) => {
    setFormValues((prev) => {
      if (prev[field] === value) {
        return prev;
      }

      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  return (
    <form noValidate action={action} className="flex flex-wrap gap-4">
      <input type="hidden" name="deliveryMethod" value={deliveryMethod} />
      <input
        type="hidden"
        name="selectedAddressId"
        value={selectedAddressId ?? ''}
      />
      {hasAddresses && deliveryMethod !== 'pickup' && (
        <div className="w-full">
          <p className="mb-3 text-sm font-semibold text-gray-900">
            {t('checkoutPage.deliveryForm.savedAddressesTitle')}
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {addresses.map((address) => {
              const isSelected = selectedAddressId === address.documentId;
              return (
                <button
                  type="button"
                  key={address.documentId}
                  onClick={() => handleSelectAddress(address.documentId)}
                  className={cn(
                    'flex h-full flex-col items-start gap-1.5 rounded-2xl border px-5 py-4 text-left shadow-sm transition-colors duration-200',
                    isSelected
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  )}
                  aria-pressed={isSelected}
                >
                  <div className="flex w-full items-center justify-between">
                    <p className="font-semibold text-gray-900">
                      {address.label}
                    </p>
                    {address.isDefault && (
                      <span className="rounded-full border border-gray-300 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-gray-600">
                        {t('accountPage.addresses.defaultBadge')}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {address.address}
                  </p>
                  <p className="text-sm text-gray-600">
                    {[address.postalCode, address.city]
                      .filter(Boolean)
                      .join(' ')}
                  </p>
                  {address.country && (
                    <p className="text-sm text-gray-600">{address.country}</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {inputFields.map((field) => {
        const isPickup = deliveryMethod === 'pickup';
        const isHidden =
          isPickup &&
          ['address', 'city', 'postalCode', 'country'].includes(field.name);

        if (isHidden) return null;

        return (
          <div
            key={field.id}
            className={cn(
              'flex flex-col gap-4',
              field.solo ? 'w-[405px]' : 'w-[194px]'
            )}
          >
            <label htmlFor={field.id}>
              <span className="paragraph-2">
                {`${t(`checkoutPage.deliveryForm.${field.name}`)} *`}
              </span>
            </label>
            {field.name === 'country' ? (
              <select
                id={field.id}
                name={field.name}
                value={formValues[field.name as keyof DeliveryForm] ?? ''}
                onChange={(event) =>
                  handleFieldChange(
                    field.name as keyof DeliveryForm,
                    event.target.value
                  )
                }
                className="rounded-full border border-transparent bg-grey-extra-light px-4 py-3 text-black"
              >
                <option value="">
                  {t('checkoutPage.deliveryForm.country')}
                </option>
                <option value="Bosnia and Herzegovina">
                  Bosna i Hercegovina
                </option>
                <option value="Croatia">Hrvatska</option>
                <option value="Serbia">Srbija</option>
                <option value="Montenegro">Crna Gora</option>
                <option value="Slovenia">Slovenija</option>
                <option value="Other">Ostalo</option>
              </select>
            ) : (
              <Input
                value={formValues[field.name as keyof DeliveryForm] ?? ''}
                onChange={(event) =>
                  handleFieldChange(
                    field.name as keyof DeliveryForm,
                    event.target.value
                  )
                }
                errorMessage={
                  formState?.errors?.[field.name as keyof DeliveryForm]
                }
                id={field.id}
                name={field.name}
                placeholder={t(`checkoutPage.deliveryForm.${field.name}`)}
                type={field.type}
              />
            )}
          </div>
        );
      })}
      <div className="mt-10 w-full heading-4">
        <p className="mb-8">{t('checkoutPage.deliveryForm.additionalInfo')}</p>
        <label htmlFor={'note'}>
          <span className="paragraph-2">
            {t('checkoutPage.deliveryForm.note')}
          </span>
        </label>
        <Textarea
          className="mt-5"
          value={formValues.note ?? ''}
          onChange={(event) => handleFieldChange('note', event.target.value)}
          errorMessage={formState?.errors?.note}
          id="note"
          maxLength={150}
          name="note"
          placeholder={t(`checkoutPage.deliveryForm.notePlaceholder`)}
        />
      </div>
      <Button
        className="ml-auto mt-3"
        disabled={(deliveryMethod === 'pickup' && !selectedStore) || isPending}
        size={'lg'}
        type="submit"
        typography={'button1'}
        variant={'filled'}
      >
        {t('common.continue')}
      </Button>
    </form>
  );
}
