import { useTranslations } from 'next-intl';

import { Icon } from '@/lib/types';

import { IconDelivery, IconEducation, IconTradeIn, IconWallet } from '../icons';

function SingleIcon({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-2">
      {children}
      <p className="text-center text-white paragraph-1">{title}</p>
    </div>
  );
}

type IconConfig = {
  key: string;
  Icon: Icon;
};

const icons: IconConfig[] = [
  { key: 'tradeIn', Icon: IconTradeIn },
  { key: 'educationDiscount', Icon: IconEducation },
  { key: 'paymentMethods', Icon: IconWallet },
  { key: 'delivery', Icon: IconDelivery },
];

export default function IconsBlock() {
  const t = useTranslations('common');

  return (
    <div className="grid w-full grid-cols-2 gap-y-10 rounded-2xl bg-blue-steel px-10 py-6 md:grid-cols-4 md:px-14 md:py-7 lg:px-32 lg:py-11">
      {icons.map(({ key, Icon }, index) => (
        <SingleIcon key={index} title={t(key)}>
          <Icon className={'size-12 lg:size-20'} color="white" />
        </SingleIcon>
      ))}
    </div>
  );
}
