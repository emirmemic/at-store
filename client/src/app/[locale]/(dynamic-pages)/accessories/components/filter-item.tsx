'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ColorResponse, IdentificationResponse } from '@/lib/types';
import { useEffect, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { IconChevron } from '@/components/icons';
import { useTranslations } from 'next-intl';

type ItemsType = IdentificationResponse[] | ColorResponse[];

interface FilterItemProps {
  title: string;
  items: ItemsType;
  selectedItems: string[];
  onFilterChange: (name: string) => void;
  isLoading: boolean;
  className?: string;
}

export default function FilterItem({
  title,
  items,
  selectedItems,
  onFilterChange,
  isLoading,
  className,
}: FilterItemProps & { isLoading: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('accessoriesPage');

  useEffect(() => {
    // Check for selected items only after products are loaded
    if (!isLoading && items.some((item) => selectedItems.includes(item.name))) {
      setIsOpen(true);
    }
  }, [isLoading, items, selectedItems]);

  return (
    <Collapsible className={className} open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between border-b border-gray-300 py-3 text-[18px] font-thin text-neutral-900">
        {title}
        <IconChevron
          className={`h-3 w-3 text-gray-500 transition-transform duration-500 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden transition-all duration-500 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
        <div className="flex flex-col gap-2 px-1 py-2">
          {items.length === 0 && (
            <span className="text-grey paragraph-2">
              {t('noItemsAvailable')}
            </span>
          )}
          {items.map((item) => (
            <Checkbox
              key={item.id}
              checked={selectedItems.includes(item.name)}
              label={item.name}
              labelClassName="flex items-center gap-2 text-neutral-800 text-[15px] font-medium cursor-pointer"
              onCheckedChange={() => onFilterChange(item.name)}
            >
              {'hex' in item ? (
                <div className="flex items-center gap-2">
                  <div
                    className="h-5 w-5 shrink-0 rounded-full border border-gray-300"
                    style={{ backgroundColor: item.hex }}
                  />
                  <span className="capitalize">{item.name}</span>
                </div>
              ) : (
                <span className="capitalize">{item.name}</span>
              )}
            </Checkbox>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
