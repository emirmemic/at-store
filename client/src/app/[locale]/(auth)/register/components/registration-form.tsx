import { useTranslations } from 'next-intl';

import { IconAtStoreLogo } from '@/components/icons';
import { PAGE_NAMES } from '@/i18n/page-names';
import { UserType } from '@/lib/types';

import { Container } from '../../components';
import Title from '../../components/title';

import Form from './form';
import OrgUserForm from './org-user-form';

export default function RegistrationForm({
  userType,
  onSelectUserType,
}: {
  userType: UserType;
  onSelectUserType: (userType?: UserType) => void;
}) {
  const t = useTranslations('registrationPage');
  return (
    <Container className="!pt-16" onBack={() => onSelectUserType(undefined)}>
      <IconAtStoreLogo height={50} width={230} />
      <Title
        className="mb-9 mt-11"
        linkPath={PAGE_NAMES.LOGIN}
        linkText={t('loginPrompt')}
        subtitle={t('subtitle')}
        title={t('title')}
      />
      {userType === 'authenticated' ? <Form /> : <OrgUserForm />}
    </Container>
  );
}
