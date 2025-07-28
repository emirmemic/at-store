'use client';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';

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

  useEffect(() => {
    if (formState?.success) {
      setDeliveryForm(formState.data);
      router.push(PAGE_NAMES.CHECKOUT_PAYMENT);
    }
  }, [formState, setDeliveryForm, router]);

  return (
    <form noValidate action={action} className="flex flex-wrap gap-4">
      {inputFields.map((field) => (
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
          <Input
            defaultValue={formState?.data[field.name as keyof DeliveryForm]}
            errorMessage={formState?.errors?.[field.name as keyof DeliveryForm]}
            id={field.id}
            name={field.name}
            placeholder={t(`checkoutPage.deliveryForm.${field.name}`)}
            type={field.type}
          />
        </div>
      ))}
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
