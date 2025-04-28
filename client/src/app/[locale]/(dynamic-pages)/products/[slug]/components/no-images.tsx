import { useTranslations } from 'next-intl';

export default function NoImages() {
  const t = useTranslations('productPage');
  return (
    <div className="relative h-[350px] w-full rounded-2xl bg-grey-almost-white p-4">
      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-grey-almost-white p-4 text-grey-medium paragraph-1">
        {t('noImagesAvailable')}
      </div>
    </div>
  );
}
