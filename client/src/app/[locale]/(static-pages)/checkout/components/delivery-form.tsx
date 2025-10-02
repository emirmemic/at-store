'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useMemo, useRef, useState } from 'react';

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
  const formRef = useRef<HTMLFormElement | null>(null);
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
  const hasMultipleAddresses = addresses.length > 1;
  const initialSelectedAddressId = useMemo(() => {
    if (!hasMultipleAddresses) return null;
    const defaultAddress = addresses.find((item) => item.isDefault);
    if (defaultAddress) return defaultAddress.documentId;
    const currentAddressValue =
      formState?.data?.address ||
      deliveryForm?.address ||
      accountDetails?.address;
    const matched = currentAddressValue
      ? addresses.find((item) => item.address === currentAddressValue)
      : undefined;
    return matched ? matched.documentId : (addresses[0]?.documentId ?? null);
  }, [
    hasMultipleAddresses,
    addresses,
    formState?.data?.address,
    deliveryForm?.address,
    accountDetails?.address,
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    initialSelectedAddressId
  );

  useEffect(() => {
    if (formState?.success) {
      setDeliveryForm(formState.data);
      router.push(PAGE_NAMES.CHECKOUT_PAYMENT);
    }
  }, [formState, setDeliveryForm, router]);

  useEffect(() => {
    if (initialSelectedAddressId && !selectedAddressId) {
      setSelectedAddressId(initialSelectedAddressId);
    }
  }, [initialSelectedAddressId, selectedAddressId]);

  useEffect(() => {
    if (selectedAddressId) {
      applyAddressToForm(selectedAddressId);
    }
  }, [selectedAddressId]);

  const applyAddressToForm = (addressId: string) => {
    if (!formRef.current) return;
    const address = addresses.find((item) => item.documentId === addressId);
    if (!address) return;

    const entries: Array<[string, string]> = [
      ['address', address.address],
      ['city', address.city ?? ''],
      ['postalCode', address.postalCode ?? ''],
      ['country', address.country ?? ''],
    ];

    entries.forEach(([name, value]) => {
      const element = formRef.current?.elements.namedItem(name) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement
        | null;
      if (!element) return;
      if ('value' in element) {
        element.value = value;
        element.dispatchEvent(new Event('input', { bubbles: true }));
        element.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  };

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  return (
    <form
      ref={formRef}
      noValidate
      action={action}
      className="flex flex-wrap gap-4"
    >
      <input type="hidden" name="deliveryMethod" value={deliveryMethod} />
      <input
        type="hidden"
        name="selectedAddressId"
        value={selectedAddressId ?? ''}
      />
      {hasMultipleAddresses && deliveryMethod !== 'pickup' && (
        <div className="w-full">
          <p className="mb-3 text-sm font-semibold text-grey-dark">
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
                    'flex h-full flex-col items-start rounded-2xl border px-5 py-4 text-left transition-colors duration-200',
                    isSelected
                      ? 'border-blue bg-blue/10'
                      : 'border-grey-silver bg-white hover:border-blue-light'
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <p className="font-semibold text-black">{address.label}</p>
                    {address.isDefault && (
                      <span className="rounded-full bg-blue px-3 py-1 text-xs font-semibold text-white">
                        {t('accountPage.addresses.defaultBadge')}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-grey-dark">
                    {address.address}
                  </p>
                  <p className="text-sm text-grey-dark">
                    {[address.postalCode, address.city]
                      .filter(Boolean)
                      .join(' ')}
                  </p>
                  {address.country && (
                    <p className="text-sm text-grey-dark">{address.country}</p>
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
                defaultValue={formState?.data[field.name as keyof DeliveryForm]}
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
                defaultValue={formState?.data[field.name as keyof DeliveryForm]}
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
          defaultValue={formState?.data.note}
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
