import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { PAGE_NAMES } from '@/i18n/page-names';
import { Link } from '@/i18n/routing';
import { AvailableMemory } from '@/lib/types';

interface MemoryOptionsProps {
  availableMemories: AvailableMemory[];
  productMemoryId: number;
}
export default function MemoryOptions({
  availableMemories,
  productMemoryId,
}: MemoryOptionsProps) {
  const t = useTranslations('');
  return (
    <div>
      <p className="mb-4 paragraph-2">{t('productPage.memory')}</p>
      <div className="flex flex-wrap items-center gap-2">
        {availableMemories?.map((memory) => (
          <div key={memory.id}>
            <Button
              key={memory.id}
              asChild
              isSelected={memory.id === productMemoryId}
              size={'md'}
              typography={'button2'}
              variant={'productVariant'}
            >
              <Link
                aria-label={memory.defaultProduct.name}
                href={{
                  pathname: PAGE_NAMES.PRODUCT_DETAILS,
                  params: { slug: memory.defaultProduct.productLink },
                }}
                title={memory.defaultProduct.name}
              >
                <span className="sr-only">
                  {t('common.viewDetailsWithName', {
                    productName: memory.defaultProduct.name,
                  })}
                </span>
                {`${memory.value} ${memory.unit}`}
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
