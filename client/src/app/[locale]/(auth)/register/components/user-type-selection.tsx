'use client';
import { useTranslations } from 'next-intl';

import { IconAtStoreLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { UserType } from '@/lib/types';

import { Container, Title } from '../../components';

export default function UserTypeSelection({
  onSelectUserType,
  className,
}: {
  onSelectUserType: (userType: UserType) => void;
  className?: string;
}) {
  const t = useTranslations('registrationPage');
  return (
    <Container className={`gap-4 bg-white ${className}`}>
      <Title
        className="mt-16 text-black"
        linkPath={PAGE_NAMES.LOGIN}
        linkText={t('loginPrompt')}
        subtitle={t('subtitle')}
        title={t('title')}
      />
      <h2 className="mb-6 mt-14 text-black heading-3 md:mb-16">
        {t('areYouALegalEntity')}
      </h2>
      <div className="flex flex-col gap-6 md:flex-row">
        <Button
          size={'default'}
          transparentVariant={'black'}
          typography={'button1'}
          variant={'transparent'}
          onClick={() => onSelectUserType('organization')}
        >
          {t('legalEntity')}
        </Button>
        <Button
          size={'default'}
          transparentVariant={'black'}
          typography={'button1'}
          variant={'transparent'}
          onClick={() => onSelectUserType('authenticated')}
        >
          {t('individual')}
        </Button>
      </div>
      <IconAtStoreLogo
        className="mt-20 text-center text-black"
        height={60}
        width={266}
      />
    </Container>
  );
}
