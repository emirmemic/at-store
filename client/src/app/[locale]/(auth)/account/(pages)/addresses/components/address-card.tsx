'use client';

import { useTranslations } from 'next-intl';

import { IconLoader } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { UserAddress } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface AddressCardProps {
  address: UserAddress;
  onEdit: (address: UserAddress) => void;
  onDelete: (address: UserAddress) => void;
  onSetDefault: (address: UserAddress) => void;
  isUpdatingDefault?: boolean;
  isDeleting?: boolean;
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  isUpdatingDefault = false,
  isDeleting = false,
}: AddressCardProps) {
  const t = useTranslations('accountPage.addresses');

  const cityLine = [address.postalCode, address.city]
    .filter((value) => Boolean(value && value.trim()))
    .join(' ');

  return (
    <div
      className={cn(
        'rounded-2xl border bg-white p-5 shadow-sm transition-colors duration-200',
        address.isDefault
          ? 'border-blue bg-blue/5'
          : 'border-grey-silver hover:border-blue-light'
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h3 className="text-black heading-5">{address.label}</h3>
            {address.isDefault && (
              <span className="rounded-full bg-blue/10 px-3 py-1 text-xs font-semibold text-blue">
                {t('defaultBadge')}
              </span>
            )}
          </div>
          <p className="text-black/80 paragraph-3">{address.address}</p>
          {cityLine && <p className="text-black/80 paragraph-3">{cityLine}</p>}
          {address.country && (
            <p className="text-black/80 paragraph-3">{address.country}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <div className="flex flex-wrap gap-2 md:justify-end">
            {!address.isDefault && (
              <Button
                onClick={() => onSetDefault(address)}
                variant="filled"
                size="sm"
                disabled={isUpdatingDefault}
              >
                {isUpdatingDefault ? <IconLoader size={20} /> : t('setDefault')}
              </Button>
            )}
            <Button
              onClick={() => onEdit(address)}
              variant="transparent"
              transparentVariant="black"
              size="sm"
              className={cn('border-grey-silver text-black hover:text-white')}
            >
              {t('edit')}
            </Button>
            <Button
              onClick={() => onDelete(address)}
              variant="transparent"
              transparentVariant="black"
              size="sm"
              className={cn(
                'border-red-deep text-red-deep hover:bg-red-deep hover:text-white'
              )}
              disabled={isDeleting}
            >
              {t('delete')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
