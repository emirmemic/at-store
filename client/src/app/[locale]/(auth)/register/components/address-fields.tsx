import { Input } from '@/components/ui/input';
import InputErrorMessage from '@/components/ui/input-error-message';
import { Textarea } from '@/components/ui/textarea';
import { useTranslations } from 'next-intl';

export type AddressValues = {
  addressLabel?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
};

interface AddressFieldsProps {
  values?: AddressValues;
  errors?: Partial<AddressValues>;
}

export function AddressFields({ values, errors }: AddressFieldsProps) {
  const t = useTranslations('accountPage.addresses.form');

  return (
    <div className="mt-4 flex flex-col gap-3">
      <div className="h-fit w-full rounded-md bg-gray-200 p-4 text-sm text-black">
        <span>
          Unesite adresu koja će biti korištena kao primarna adresa za dostavu.
          Dodavanje alternativnih adresa se izvršava u postavkama korisničkog
          računa.
        </span>
      </div>
      <Input
        defaultValue={values?.addressLabel ?? ''}
        errorMessage={errors?.addressLabel}
        name="addressLabel"
        placeholder={`${t('label')}*`}
      />
      <Textarea
        defaultValue={values?.address ?? ''}
        errorMessage={errors?.address}
        name="address"
        className="text-black"
        placeholder={`${t('address')}*`}
        rows={3}
      />
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          defaultValue={values?.city ?? ''}
          errorMessage={errors?.city}
          name="city"
          placeholder={t('city')}
        />
        <Input
          defaultValue={values?.postalCode ?? ''}
          errorMessage={errors?.postalCode}
          name="postalCode"
          placeholder={t('postalCode')}
        />
        <div className="flex flex-col gap-2 md:col-span-2">
          <select
            defaultValue={values?.country ?? ''}
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
          {errors?.country && (
            <InputErrorMessage errorMessage={errors.country} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddressFields;
