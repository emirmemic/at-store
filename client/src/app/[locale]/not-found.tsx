import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('notFound');
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
