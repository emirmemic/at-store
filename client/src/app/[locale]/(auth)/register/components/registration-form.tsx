import { useTranslations } from 'next-intl';

import { IconAtStoreLogo } from '@/components/icons';

import { Container } from '../../components';
import Title from '../../components/title';
import { UserType } from '../page';

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
        linkText={t('loginPrompt')}
        subtitle={t('subtitle')}
        title={t('title')}
      />
      {userType === 'individual' ? <Form /> : <OrgUserForm />}
    </Container>
  );
}
