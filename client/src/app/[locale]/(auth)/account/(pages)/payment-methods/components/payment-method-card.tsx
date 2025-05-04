'use client';
import { useTranslations } from 'next-intl';

import {
  IconLoader,
  IconMaestro,
  IconMasterCardWithText,
  IconTrash,
  IconVisa,
} from '@/components/icons';
import IconVisaElectron from '@/components/icons/visa-electron';
import { Checkbox } from '@/components/ui/checkbox';
import { toast, useLoader } from '@/lib/hooks';

import { CardContainer } from '../../../components';
import { PaymentMethodResponse } from '../../../types';
import { deletePaymentMethod, toggleDefault } from '../actions';

type CardType = 'visa' | 'visaElectron' | 'mastercard' | 'maestro' | 'unknown';

// Get the card type based on the card number
function getCardType(cardNumber: string): CardType {
  const cardTypes = {
    visaElectron: /^(4026|417500|4508|4844|4913|4917)[0-9]{12}$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    maestro: /^(5018|5020|5038|6304|6390|6759)[0-9]{12,15}$/,
  };

  for (const [type, regex] of Object.entries(cardTypes)) {
    if (regex.test(cardNumber)) {
      return type as CardType;
    }
  }
  return 'unknown';
}

function getCardIcon(cardType: CardType) {
  const iconStyles =
    'self-center w-[200px] h-[150px] md:h-28 md:w-36 lg:h-40 lg:w-52';
  switch (cardType) {
    case 'visa':
      return <IconVisa className={iconStyles} />;
    case 'visaElectron':
      return <IconVisaElectron className={iconStyles} />;
    case 'mastercard':
      return <IconMasterCardWithText className={iconStyles} />;
    case 'maestro':
      return <IconMaestro className={iconStyles} />;
    default:
      return <></>;
  }
}

interface PaymentMethodCardProps {
  className?: string;
  paymentMethod: PaymentMethodResponse;
  onDelete: () => void;
  onDefaultChange: (isDefault: boolean) => void;
}

export default function PaymentMethodCard(props: PaymentMethodCardProps) {
  const { className, paymentMethod, onDelete, onDefaultChange } = props;
  const { cardNumber, nameAndSurname, expirationDate, isDefault } =
    paymentMethod;
  const last4Digits = cardNumber.slice(-4);
  const t = useTranslations();

  const { isLoading, execute } = useLoader({
    apiCall: () => deletePaymentMethod(paymentMethod.documentId),
    onSuccess: () => {
      toast({
        variant: 'success',
        title: t('common.successful'),
      });
      onDelete();
    },
    onError: (error) => {
      toast({
        title: error.name,
        variant: 'destructive',
        description: error.message,
      });
    },
  });

  const { isLoading: isLoadingDefault, execute: executeDefaultChange } =
    useLoader({
      apiCall: () => toggleDefault(paymentMethod.documentId),
      onSuccess: () => onDefaultChange(true),
      onError: (error) =>
        toast({
          title: error.name,
          variant: 'destructive',
          description: error.message,
        }),
    });

  const cardType = getCardType(cardNumber);
  const cardIcon = getCardIcon(cardType);
  return (
    <CardContainer
      className={`${className} relative flex flex-col gap-7 border-grey-silver bg-white p-8 md:flex-row md:items-center md:justify-center md:gap-10 md:px-4 md:py-6`}
    >
      <button
        className="absolute right-3 top-4 lg:bottom-4 lg:top-auto"
        disabled={isLoading}
        onClick={execute}
      >
        <span className="sr-only">Remove from favorites</span>
        {isLoading ? (
          <IconLoader className="size-6 lg:size-9" />
        ) : (
          <IconTrash className="size-6 lg:size-9" />
        )}
      </button>
      {cardIcon}
      <div className="flex flex-col gap-4 paragraph-2 md:flex-1">
        <p>**** **** **** {last4Digits}</p>
        <p>{expirationDate}</p>
        <p>{nameAndSurname}</p>
        <Checkbox
          checked={isDefault}
          defaultChecked={isDefault}
          disabled={isLoadingDefault || isDefault}
          labelClassName="flex items-center gap-2 w-fit"
          onCheckedChange={executeDefaultChange}
        >
          <span>Default</span>
        </Checkbox>
      </div>
    </CardContainer>
  );
}
