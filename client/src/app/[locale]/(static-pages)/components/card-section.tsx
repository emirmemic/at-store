import Image, { StaticImageData } from 'next/image';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link, Pathname } from '@/i18n/routing';

interface CardSectionProps {
  name: string;
  image: StaticImageData;
  title: string;
  path: Pathname;
}

export default function CardSection(props: Readonly<CardSectionProps>) {
  const { title, path, name, image } = props;
  const t = useTranslations('common');
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-blue-steel px-9 py-5 md:gap-8 md:px-4 md:py-9 lg:gap-10 lg:px-8 lg:py-12">
      <div className="w-full max-w-[362px] md:max-w-[300px] lg:max-w-[490px]">
        <Image
          alt={name}
          className="h-auto w-full"
          height={120}
          src={image}
          width={430}
        />
      </div>
      <p className="flex-1 text-white heading-3 md:heading-2 lg:heading-1">
        {title}
      </p>
      <Button asChild size={'lg'} typography={'button1'} variant={'filled'}>
        <Link href={path}>{t('view')}</Link>
      </Button>
    </div>
  );
}
