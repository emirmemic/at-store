import { useTranslations } from 'next-intl';

import { PAGE_NAMES } from '@/i18n/page-names';
import { Link, Pathname } from '@/i18n/routing';
import { Icon } from '@/lib/types';

import { IconDelivery, IconEducation, IconTradeIn, IconWallet } from '../icons';

type SingleIconProps = {
  children: React.ReactNode;
  title: string;
  link?: Pathname;
};

function SingleIcon({ children, title, link }: SingleIconProps) {
  const t = useTranslations('common');
  const Wrapper: React.ElementType = link ? Link : 'div';
  const wrapperProps = link
    ? {
        href: link,
        title: t('viewDetails'),
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="flex flex-col items-center gap-3 rounded-2xl p-2 px-2 transition-all hover:bg-black/10"
    >
      {children}
      <span className="text-center text-white paragraph-1">{title}</span>
    </Wrapper>
  );
}

type IconConfig = {
  key: string;
  Icon: Icon;
  link?: Pathname;
};

const icons: IconConfig[] = [
  { key: 'tradeIn', Icon: IconTradeIn },
  {
    key: 'educationDiscount',
    Icon: IconEducation,
    link: PAGE_NAMES.EDUCATIONAL_DISCOUNT,
  },
  { key: 'paymentMethods', Icon: IconWallet, link: PAGE_NAMES.PAYMENT_METHODS },
  { key: 'delivery', Icon: IconDelivery, link: PAGE_NAMES.DELIVERY },
];

export default function IconsBlock() {
  const t = useTranslations('common');

  return (
    <div className="grid w-full grid-cols-2 gap-y-10 rounded-2xl bg-blue-steel px-10 py-6 md:grid-cols-4 md:px-14 md:py-7 lg:px-32 lg:py-11">
      {icons.map(({ key, Icon, link }, index) => (
        <SingleIcon key={index} link={link} title={t(key)}>
          <Icon className={'size-12 lg:size-20'} color="white" />
        </SingleIcon>
      ))}
    </div>
  );
}
