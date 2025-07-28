import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { monri } from '@/assets/images';
import { IconMaestro, IconMasterCard, IconVisa } from '@/components/icons';

export default function FooterPayment() {
  const t = useTranslations('footer');
  return (
    <div className="flex w-full flex-col justify-between gap-4 md:flex-row-reverse md:items-center md:gap-8">
      <div className="flex shrink-0 flex-wrap gap-4 pl-2 [&_svg]:shrink-0">
        <Image alt="Monri" height={34} quality={100} src={monri} width={115} />
        <IconMasterCard />
        <IconVisa />
        <IconMaestro />
      </div>
      <div className="shrink pl-2 footer-text md:pl-0">
        {t('copyrightNotice')}
      </div>
    </div>
  );
}
