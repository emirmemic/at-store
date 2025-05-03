import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { AvailableColor } from '@/lib/types';

interface ColorOptionsProps {
  availableColors: AvailableColor[];
  productColorId: number;
}
export default function ColorOptions({
  availableColors,
  productColorId,
}: ColorOptionsProps) {
  const t = useTranslations('');
  return (
    <div>
      <p className="mb-4 paragraph-2">{t('accessoriesPage.color')}</p>
      <div className="flex flex-wrap items-center gap-2">
        {availableColors?.map((color) => (
          <div key={color.id}>
            <Button
              key={color.id}
              asChild
              isSelected={color.id === productColorId}
              size={'color'}
              style={{ backgroundColor: color.hex }}
              variant={'color'}
            >
              <Link
                aria-label={color.defaultProduct.name}
                href={{
                  pathname: PAGE_NAMES.PRODUCT_DETAILS,
                  params: { slug: color.defaultProduct.productLink },
                }}
                title={color.defaultProduct.name}
              >
                <span className="sr-only">
                  {t('common.viewDetailsWithName', {
                    productName: color.defaultProduct.name,
                  })}
                </span>
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
