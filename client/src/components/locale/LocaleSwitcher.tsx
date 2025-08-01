import { useLocale, useTranslations } from 'next-intl';

import { routing } from '@/i18n/routing';

import { LocaleSwitcherSelect } from './LocaleSwitcherSelect';

export function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {t('locale', { locale: cur })}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
