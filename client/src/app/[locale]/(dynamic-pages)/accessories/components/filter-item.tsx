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
          {[...items]
            .sort((a, b) => {
              // If this is the Brand/Color filter, sort alphabetically only
              const tlc = title.toLowerCase();
              if (
                tlc === 'brand' ||
                tlc === 'brend' ||
                tlc === 'color' ||
                tlc === 'boja'
              ) {
                return a.name.localeCompare(b.name, undefined, {
                  numeric: true,
                });
              }

              // Special lowest values for iPhones
              if (a.name === 'iPhone XS Max' && b.name !== 'iPhone XS Max')
                return 1;
              if (b.name === 'iPhone XS Max' && a.name !== 'iPhone XS Max')
                return -1;
              if (
                a.name === 'iPhone SE3' &&
                b.name !== 'iPhone XS Max' &&
                b.name !== 'iPhone SE3'
              )
                return 1;
              if (
                b.name === 'iPhone SE3' &&
                a.name !== 'iPhone XS Max' &&
                a.name !== 'iPhone SE3'
              )
                return -1;

              // Helper for iPhones
              const getIphoneInfo = (name: string) => {
                const match = name.match(/iPhone\s(\d+)(.*)/i);
                if (!match) return null;
                const num = parseInt(match[1], 10);
                const suffix = match[2].trim();
                return { number: num, suffix };
              };

              // Helper for MacBooks
              const getMacInfo = (name: string) => {
                const match = name.match(/MacBook\s(Pro|Air)\sM(\d+)/i);
                if (!match) return null;
                const type = match[1];
                const chip = parseInt(match[2], 10);
                return { type, chip };
              };

              // Helper for iPads
              const getIpadInfo = (name: string) => {
                const match = name.match(/iPad\s*\(A(\d+)\)/i);
                if (!match) return null;
                const chip = parseInt(match[1], 10);
                return { chip };
              };

              // Priority maps
              const iphoneSuffixOrder: Record<string, number> = {
                e: 1,
                'Pro Max': 2,
                Pro: 3,
                Plus: 4,
                '': 5,
              };

              const macTypeOrder: Record<string, number> = {
                Pro: 1,
                Air: 2,
              };

              // Check iPhones
              const aIphone = getIphoneInfo(a.name);
              const bIphone = getIphoneInfo(b.name);
              if (aIphone && bIphone) {
                if (aIphone.number !== bIphone.number) {
                  return bIphone.number - aIphone.number;
                }
                const aWeight = iphoneSuffixOrder[aIphone.suffix] ?? 99;
                const bWeight = iphoneSuffixOrder[bIphone.suffix] ?? 99;
                return aWeight - bWeight;
              }

              // Check MacBooks
              const aMac = getMacInfo(a.name);
              const bMac = getMacInfo(b.name);
              if (aMac && bMac) {
                if (aMac.chip !== bMac.chip) {
                  return bMac.chip - aMac.chip; // higher chip first
                }
                const aWeight = macTypeOrder[aMac.type] ?? 99;
                const bWeight = macTypeOrder[bMac.type] ?? 99;
                return aWeight - bWeight;
              }

              // Check iPads
              const aIpad = getIpadInfo(a.name);
              const bIpad = getIpadInfo(b.name);
              if (aIpad && bIpad) {
                if (aIpad.chip !== bIpad.chip) {
                  return bIpad.chip - aIpad.chip; // higher chip first, so A16 above others
                }
              }

              // Default fallback
              return b.name.localeCompare(a.name, undefined, { numeric: true });
            })
            .map((item) => (
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
                  <span>{item.name}</span>
                )}
              </Checkbox>
            ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
