'use client';
import { useTranslations } from 'next-intl';

import { CardContainer } from '../../components';

import { Form } from './components';

export default function Page() {
  const t = useTranslations('accountPage.details');
  return (
    <CardContainer className="border-grey-silver bg-white p-9">
      <h2 className="mb-5 text-center paragraph-1">{t('subtitle')}</h2>
      <Form />
    </CardContainer>
  );
}
