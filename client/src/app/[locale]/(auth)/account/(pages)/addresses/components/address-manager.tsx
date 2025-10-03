'use client';

import { AddressFormData, createAddressSchema } from '@/lib/schemas/address';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  createUserAddress,
  deleteUserAddress,
  setDefaultUserAddress,
  updateUserAddress,
} from '@/lib/services';

import { AddressCard } from './address-card';
import { AddressForm } from './address-form';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { UserAddress } from '@/lib/types';
import { ZodError } from 'zod';
import { cn } from '@/lib/utils/utils';
import { toast } from '@/lib/hooks';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useUserProvider } from '@/app/providers/user-provider';

interface DeleteState {
  open: boolean;
  address: UserAddress | null;
  isDeleting: boolean;
  error?: string | null;
}

const emptyDeleteState: DeleteState = {
  open: false,
  address: null,
  isDeleting: false,
  error: null,
};

export function AddressManager() {
  const { user, setAddresses } = useUserProvider();
  const t = useTranslations('accountPage.addresses');
  const validation = useTranslations('validation');
  const common = useTranslations('common');

  const addresses = user?.addresses ?? [];

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    null
  );
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof AddressFormData, string>>
  >({});
  const [formApiError, setFormApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [defaultingId, setDefaultingId] = useState<string | null>(null);
  const [deleteState, setDeleteState] = useState<DeleteState>(emptyDeleteState);

  const resetFormState = () => {
    setFormErrors({});
    setFormApiError(null);
    setSelectedAddress(null);
    setIsSubmitting(false);
  };

  const handleFormOpenChange = (open: boolean) => {
    setIsFormOpen(open);
    if (!open) {
      resetFormState();
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setFormErrors({});
    setFormApiError(null);

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

      let updatedAddresses: UserAddress[] = [];

      if (formMode === 'create') {
        updatedAddresses = await createUserAddress(payload);
        toast({ title: t('createSuccess'), variant: 'success' });
      } else if (selectedAddress) {
        updatedAddresses = await updateUserAddress(
          selectedAddress.documentId,
          payload
        );
        toast({ title: t('updateSuccess'), variant: 'success' });
      }

      setAddresses(updatedAddresses);
      handleFormOpenChange(false);
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = Object.fromEntries(
          error.errors.map(({ path, message }) => [path[0], message])
        ) as Partial<Record<keyof AddressFormData, string>>;
        setFormErrors(fieldErrors);
      } else if (
        error &&
        typeof error === 'object' &&
        'errors' in (error as { errors?: Record<string, string> })
      ) {
        setFormErrors(
          (error as { errors?: Record<string, string> }).errors ?? {}
        );
      } else if (error instanceof Error) {
        setFormApiError(error.message);
      } else {
        setFormApiError(common('somethingWentWrong'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSetDefault = async (address: UserAddress) => {
    setDefaultingId(address.documentId);
    try {
      const updatedAddresses = await setDefaultUserAddress(address.documentId);
      setAddresses(updatedAddresses);
      toast({ title: t('setDefaultSuccess'), variant: 'success' });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : common('somethingWentWrong');
      toast({ title: message, variant: 'destructive' });
    } finally {
      setDefaultingId(null);
    }
  };

  const openDeleteDialog = (address: UserAddress) => {
    setDeleteState({ open: true, address, isDeleting: false, error: null });
  };

  const handleDelete = async () => {
    if (!deleteState.address) return;
    setDeleteState((prev) => ({ ...prev, isDeleting: true, error: null }));

    try {
      const updatedAddresses = await deleteUserAddress(
        deleteState.address.documentId
      );
      setAddresses(updatedAddresses);
      toast({ title: t('deleteSuccess'), variant: 'success' });
      setDeleteState(emptyDeleteState);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : common('somethingWentWrong');
      setDeleteState((prev) => ({
        ...prev,
        isDeleting: false,
        error: message,
      }));
    }
  };

  const deleteDialogOpenChange = (open: boolean) => {
    setDeleteState((prev) =>
      open
        ? prev
        : {
            ...emptyDeleteState,
          }
    );
  };

  const handleCreateClick = () => {
    setFormMode('create');
    setSelectedAddress(null);
    setFormErrors({});
    setFormApiError(null);
  };

  const handleEditClick = (address: UserAddress) => {
    setFormMode('edit');
    setSelectedAddress(address);
    setFormErrors({});
    setFormApiError(null);
    setIsFormOpen(true);
  };

  const initialFormValues: Partial<AddressFormData> = selectedAddress
    ? {
        label: selectedAddress.label,
        address: selectedAddress.address,
        city: selectedAddress.city ?? '',
        postalCode: selectedAddress.postalCode ?? '',
        country: selectedAddress.country ?? '',
        isDefault: selectedAddress.isDefault,
      }
    : {
        isDefault: addresses.length === 0,
      };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-black heading-4">{t('title')}</h2>
          <p className="text-black/70 paragraph-3">{t('subtitle')}</p>
        </div>
        <Dialog open={isFormOpen} onOpenChange={handleFormOpenChange}>
          <DialogTrigger asChild>
            <Button
              variant="filled"
              size="md"
              typography="button1"
              onClick={handleCreateClick}
            >
              {t('addNew')}
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-xl rounded-3xl bg-white p-6">
            <DialogTitle className="text-black heading-4">
              {formMode === 'create' ? t('createTitle') : t('editTitle')}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {t('dialogDescription')}
            </DialogDescription>
            <AddressForm
              mode={formMode}
              errors={formErrors}
              apiError={formApiError}
              isSubmitting={isSubmitting}
              initialValues={initialFormValues}
              onSubmit={handleFormSubmit}
            />
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-grey-silver bg-grey-extra-light/60 p-8 text-center">
          <h3 className="mb-2 text-black heading-5">{t('emptyState.title')}</h3>
          <p className="text-black/70 paragraph-3">
            {t('emptyState.description')}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {addresses.map((address) => (
            <AddressCard
              key={address.documentId}
              address={address}
              onDelete={openDeleteDialog}
              onEdit={handleEditClick}
              onSetDefault={handleSetDefault}
              isDeleting={
                deleteState.isDeleting &&
                deleteState.address?.documentId === address.documentId
              }
              isUpdatingDefault={defaultingId === address.documentId}
            />
          ))}
        </div>
      )}

      <Dialog open={deleteState.open} onOpenChange={deleteDialogOpenChange}>
        <DialogContent className="w-full max-w-md rounded-3xl bg-white p-6">
          <DialogTitle className="text-black heading-4">
            {t('confirmDelete.title')}
          </DialogTitle>
          <DialogDescription className="text-black/70 paragraph-3">
            {t('confirmDelete.description')}
          </DialogDescription>
          {deleteState.error && (
            <Alert className="mt-4" dismissible variant="destructive">
              {deleteState.error}
            </Alert>
          )}
          <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-end">
            <Button
              variant="transparent"
              transparentVariant="black"
              className="px-4 py-2"
              onClick={() => deleteDialogOpenChange(false)}
              disabled={deleteState.isDeleting}
            >
              {t('confirmDelete.cancel')}
            </Button>
            <Button
              variant="filled"
              className={cn('hover:bg-red-dark bg-red-deep px-4 py-2')}
              onClick={handleDelete}
              disabled={deleteState.isDeleting}
            >
              {t('confirmDelete.confirm')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
