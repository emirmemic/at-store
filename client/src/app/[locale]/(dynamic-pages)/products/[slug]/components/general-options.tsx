import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { AvailableOption } from '@/lib/types';

interface GeneralOptionsProps {
  options: AvailableOption[];
  productOptionValue: string;
  title: string;
}
export default function GeneralOptions({
  options,
  productOptionValue,
  title,
}: GeneralOptionsProps) {
  const t = useTranslations('');
  return (
    <div>
      <p className="mb-4 paragraph-2">{title}</p>
      <div className="flex flex-wrap items-center gap-2">
        {options?.map((option) => (
          <div key={option.value}>
            <Button
              key={option.value}
              asChild
              isSelected={option.value === productOptionValue}
              size={'md'}
              typography={'button2'}
              variant={'productVariant'}
            >
              <Link
                aria-label={option.defaultProduct.name}
                href={{
                  pathname: PAGE_NAMES.PRODUCT_DETAILS,
                  params: { slug: option.defaultProduct.productLink },
                }}
                title={option.defaultProduct.name}
              >
                <span className="sr-only">
                  {t('common.viewDetailsWithName', {
                    productName: option.defaultProduct.name,
                  })}
                </span>
                {option.value}
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
