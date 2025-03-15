import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { monri } from '@/assets/images';
import {
  IconMaestro,
  IconMasterCard,
  IconVisa,
} from '@/components/footer/icons';

export default function FooterPayment() {
  const t = useTranslations('footer');
  return (
    <div className="flex w-full flex-col justify-between gap-4 md:flex-row-reverse md:items-center md:gap-8">
      <div className="flex shrink-0 gap-4 [&_svg]:shrink-0">
        <Image
          alt="Monri"
          className="object-cover"
          height={34}
          quality={100}
          sizes="(max-width: 115px) 100vw, 115px"
          src={monri}
          style={{ objectFit: 'contain' }}
          width={115}
        />

        <IconMasterCard />
        <IconVisa />
        <IconMaestro />
      </div>
      <div className="shrink paragraph-5">{t('copyrightNotice')}</div>
    </div>
  );
}
