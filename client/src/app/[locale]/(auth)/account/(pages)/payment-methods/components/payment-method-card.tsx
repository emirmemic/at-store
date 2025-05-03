import { IconMasterCardWithText } from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';

import { CardContainer } from '../../../components';

interface PaymentMethodCardProps {
  className?: string;
  cardNumber: string;
  nameAndSurname: string;
  expirationDate: string;
  isDefault: boolean;
}

export default function PaymentMethodCard(props: PaymentMethodCardProps) {
  const { className, cardNumber, nameAndSurname, expirationDate, isDefault } =
    props;

  const last4Digits = cardNumber.slice(-4);
  return (
    <CardContainer
      className={`${className} flex flex-col gap-7 border-grey-silver bg-white p-8 md:flex-row md:items-center md:justify-center md:gap-10 md:px-4 md:py-6`}
    >
      <IconMasterCardWithText className="self-center object-contain md:h-28 md:w-36" />
      <div className="flex flex-col gap-4 paragraph-2 md:flex-1">
        <p>**** **** **** {last4Digits}</p>
        <p>{expirationDate}</p>
        <p>{nameAndSurname}</p>
        <Checkbox
          defaultChecked={isDefault}
          labelClassName="flex items-center gap-2 w-fit"
        >
          <span>Default</span>
        </Checkbox>
      </div>
    </CardContainer>
  );
}
