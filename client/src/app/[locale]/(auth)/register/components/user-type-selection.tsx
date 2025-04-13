'use client';
import { useTranslations } from 'next-intl';

import { IconAtStoreLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';

import { Container } from '../../components';
import { UserType } from '../page';

import Title from './title';

export default function UserTypeSelection({
  onSelectUserType,
  className,
}: {
  onSelectUserType: (userType: UserType) => void;
  className?: string;
}) {
  const t = useTranslations('registrationPage');
  return (
    <Container className={`gap-4 ${className}`}>
      <Title
        className="mt-16"
        linkText={t('loginPrompt')}
        subtitle={t('subtitle')}
        title={t('title')}
      />
      <h2 className="mb-6 mt-14 heading-3 md:mb-16">
        {t('areYouALegalEntity')}
      </h2>
      <div className="flex flex-col gap-6 md:flex-row">
        <Button
          size={'default'}
          transparentVariant={'white'}
          typography={'button1'}
          variant={'transparent'}
          onClick={() => onSelectUserType('org')}
        >
          {t('legalEntity')}
        </Button>
        <Button
          size={'default'}
          transparentVariant={'white'}
          typography={'button1'}
          variant={'transparent'}
          onClick={() => onSelectUserType('individual')}
        >
          {t('individual')}
        </Button>
      </div>
      <IconAtStoreLogo className="mt-20 text-center" height={60} width={266} />
    </Container>
  );
}
