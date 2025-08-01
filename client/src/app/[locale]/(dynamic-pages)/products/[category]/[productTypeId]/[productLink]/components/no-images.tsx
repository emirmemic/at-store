import { useTranslations } from 'next-intl';

import { ProductTag } from '@/components/product-cards';

export default function NoImages({ tag }: { tag?: string }) {
  const t = useTranslations('productPage');
  return (
    <div className="relative h-[350px] w-full rounded-2xl bg-grey-almost-white p-4">
      <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-grey-almost-white p-4 text-grey-medium paragraph-1">
        {t('noImagesAvailable')}
      </div>
      {tag && (
        <ProductTag
          className="absolute right-4 top-2 z-10 rounded-3xl bg-red-600 px-3 py-1 text-sm text-white"
          tag={tag}
        />
      )}
    </div>
  );
}
