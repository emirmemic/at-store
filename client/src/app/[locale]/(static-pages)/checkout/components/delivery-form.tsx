/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { AddressFormData, createAddressSchema } from '@/lib/schemas/address';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useActionState, useEffect, useMemo, useState } from 'react';

import { AddressForm } from '@/app/[locale]/(auth)/account/(pages)/addresses/components/address-form';
import { Button } from '@/components/ui/button';
import { DeliveryForm } from '@/lib/schemas/checkout';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { ZodError } from 'zod';
import { cn } from '@/lib/utils/utils';
import { createUserAddress } from '@/lib/services';
import { handleSubmit } from '../utils';
import { inputFields } from '../data';
import { toast } from '@/lib/hooks';
import { useCheckoutProvider } from '../providers/checkout-provider';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useUserProvider } from '@/app/providers/user-provider';

export default function Form() {
  const t = useTranslations();
  const router = useRouter();
  const validation = useTranslations('validation');
  const accountAddressesT = useTranslations('accountPage.addresses');
  const common = useTranslations('common');
  const { setDeliveryForm, deliveryForm, deliveryMethod, selectedStore } =
    useCheckoutProvider();
  const { user, setAddresses } = useUserProvider();
  const accountDetails = user?.accountDetails;
  const isLoggedIn = Boolean(user?.id);
  const summaryFieldNames: Array<keyof DeliveryForm> = [
    'name',
    'surname',
    'email',
    'phoneNumber',
  ];
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [addressFormErrors, setAddressFormErrors] = useState<
    Partial<Record<keyof AddressFormData, string>>
  >({});
  const [addressFormApiError, setAddressFormApiError] = useState<string | null>(
    null
  );
  const [isCreatingAddress, setIsCreatingAddress] = useState(false);
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
  const shouldEnableAddressScroll =
    addresses.length + (isLoggedIn ? 1 : 0) >= 1;
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

  const resetAddressModalState = () => {
    setAddressFormErrors({});
    setAddressFormApiError(null);
    setIsCreatingAddress(false);
  };

  const handleAddressModalChange = (open: boolean) => {
    setIsAddressModalOpen(open);
    if (!open) {
      resetAddressModalState();
    }
  };

  const handleOpenAddressModal = () => {
    resetAddressModalState();
    setIsAddressModalOpen(true);
  };

  const handleCreateAddressSubmit = async (formData: FormData) => {
    setIsCreatingAddress(true);
    setAddressFormErrors({});
    setAddressFormApiError(null);

    const existingIds = new Set(addresses.map((address) => address.documentId));

    try {
      const schema = createAddressSchema(validation);
      const dataObject = Object.fromEntries(formData.entries());
      const parsed = schema.parse(dataObject) as AddressFormData;

      const payload: AddressFormData = {
        ...parsed,
        city: parsed.city?.trim() || '',
        postalCode: parsed.postalCode?.trim() || '',
        country: parsed.country?.trim() || '',
        isDefault: Boolean(parsed.isDefault),
      };

      const updatedAddresses = await createUserAddress(payload);
      setAddresses(updatedAddresses);

      const newlyCreatedAddress =
        updatedAddresses.find((item) => !existingIds.has(item.documentId)) ??
        (payload.isDefault
          ? updatedAddresses.find((item) => item.isDefault)
          : null);

      if (newlyCreatedAddress) {
        setSelectedAddressId(newlyCreatedAddress.documentId);
      }

      toast({ title: accountAddressesT('createSuccess'), variant: 'success' });
      handleAddressModalChange(false);
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = Object.fromEntries(
          error.errors.map(({ path, message }) => [path[0], message])
        ) as Partial<Record<keyof AddressFormData, string>>;
        setAddressFormErrors(fieldErrors);
      } else if (
        error &&
        typeof error === 'object' &&
        'errors' in (error as { errors?: Record<string, string> })
      ) {
        setAddressFormErrors(
          (error as { errors?: Record<string, string> }).errors ?? {}
        );
      } else if (error instanceof Error) {
        setAddressFormApiError(error.message);
      } else {
        setAddressFormApiError(common('somethingWentWrong'));
      }
    } finally {
      setIsCreatingAddress(false);
    }
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
          <div
            className={cn(
              'grid gap-3 md:grid-cols-2',
              shouldEnableAddressScroll && 'max-h-80 overflow-x-auto pr-1'
            )}
          >
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
            {isLoggedIn && (
              <button
                type="button"
                onClick={handleOpenAddressModal}
                className="flex h-full min-h-[168px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-4 text-center text-gray-900 shadow-sm transition-colors duration-200 hover:border-gray-400 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                aria-label={t('checkoutPage.deliveryForm.addAddressCta')}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900">
                  <Plus className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold">
                  {t('checkoutPage.deliveryForm.addAddressCta')}
                </span>
              </button>
            )}
          </div>
        </div>
      )}
      {!hasAddresses &&
        deliveryMethod !== 'pickup' &&
        (isLoggedIn ? (
          <button
            type="button"
            onClick={handleOpenAddressModal}
            className="group flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-white p-6 text-center shadow-sm transition-colors duration-200 hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            aria-label={t('checkoutPage.deliveryForm.addAddressCta')}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-900 transition-colors duration-200 group-hover:border-gray-900">
              <Plus className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold text-gray-900">
              {t('checkoutPage.deliveryForm.addAddressTitle')}
            </span>
            <span className="max-w-[240px] text-sm text-gray-600">
              {t('checkoutPage.deliveryForm.addAddressDescription')}
            </span>
            <span className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 group-hover:bg-black">
              {t('checkoutPage.deliveryForm.addAddressCta')}
            </span>
          </button>
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-gray-200 bg-white p-6 text-center shadow-sm">
            <span className="text-base font-semibold text-gray-900">
              {t('checkoutPage.deliveryForm.saveAddressesInfoTitle')}
            </span>
            <span className="max-w-[280px] text-sm text-gray-600">
              {t('checkoutPage.deliveryForm.saveAddressesInfoDescription')}
            </span>
            <Link
              href={PAGE_NAMES.REGISTER}
              className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-black"
            >
              {t('checkoutPage.deliveryForm.saveAddressesInfoCta')}
            </Link>
          </div>
        ))}
      {isLoggedIn && (
        <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <h3 className="text-xl font-semibold tracking-tight text-gray-900">
              {t('checkoutPage.deliveryForm.contactInfoSummaryTitle')}
            </h3>
          </div>

          <div className="p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {summaryFieldNames.map((fieldName) => (
                <div key={fieldName} className="space-y-1.5">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    {t(`checkoutPage.deliveryForm.${fieldName}`)}
                  </p>
                  <p className="text-base font-normal text-gray-900">
                    {formValues[fieldName] || '—'}
                  </p>
                  <input
                    type="hidden"
                    name={fieldName}
                    value={formValues[fieldName] ?? ''}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {inputFields.map((field) => {
        if (
          isLoggedIn &&
          summaryFieldNames.includes(field.name as keyof DeliveryForm)
        ) {
          return null;
        }
        const isPickup = deliveryMethod === 'pickup';
        const isHidden =
          isPickup &&
          ['address', 'city', 'postalCode', 'country'].includes(field.name);

        if (isHidden) return null;

        const shouldHideForLoggedInUser =
          isLoggedIn &&
          ['address', 'city', 'postalCode', 'country'].includes(field.name) &&
          Boolean(
            (formValues[field.name as keyof DeliveryForm] ?? '')
              .toString()
              .trim()
          );

        if (shouldHideForLoggedInUser) {
          return (
            <input
              key={field.id}
              type="hidden"
              id={field.id}
              name={field.name}
              value={formValues[field.name as keyof DeliveryForm] ?? ''}
            />
          );
        }

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
      <Dialog open={isAddressModalOpen} onOpenChange={handleAddressModalChange}>
        <DialogContent className="w-full max-w-xl rounded-3xl bg-white p-6">
          <DialogTitle className="text-black heading-4">
            {accountAddressesT('createTitle')}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {accountAddressesT('dialogDescription')}
          </DialogDescription>
          <AddressForm
            key={isAddressModalOpen ? 'open' : 'closed'}
            mode="create"
            errors={addressFormErrors}
            apiError={addressFormApiError}
            isSubmitting={isCreatingAddress}
            initialValues={{ isDefault: addresses.length === 0 }}
            onSubmit={handleCreateAddressSubmit}
          />
        </DialogContent>
      </Dialog>
    </form>
  );
}
