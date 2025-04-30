'use client';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

import { IconChevron } from '@/components/icons';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import { IdentificationResponse, ColorResponse } from '@/lib/types';

type ItemsType = IdentificationResponse[] | ColorResponse[];

interface FilterItemProps {
  title: string;
  items: ItemsType;
  selectedItems: string[];
  onFilterChange: (name: string) => void;
  isLoading: boolean;
}

export default function FilterItem({
  title,
  items,
  selectedItems,
  onFilterChange,
  isLoading,
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
    <Collapsible className="w-36" open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center gap-3 py-1 text-start paragraph-2">
        {title}
        <IconChevron
          className={`w-3 transition-transform duration-500 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden transition-all duration-500 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
        <div className="flex flex-col gap-1 px-3 py-2">
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
              labelClassName="flex items-center gap-2 text-grey-darker paragraph-2 hover:text-grey-darkest cursor-pointer py-1"
              onCheckedChange={() => onFilterChange(item.name)}
            >
              {'hex' in item ? (
                <div className="flex items-center gap-2">
                  <div
                    className="h-6 w-6 shrink-0 rounded-full border border-gray-300"
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
