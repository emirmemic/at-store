'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { IconChevron } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils/utils';

interface SortProps {
  sortOption: string;
  onSortChange: (sort: string) => void;
  className?: string;
}

export default function Sort({
  sortOption,
  onSortChange,
  className,
}: SortProps) {
  const t = useTranslations('accessoriesPage');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sortOptions = [
    { value: 'latest', label: t('latest') },
    { value: 'name-az', label: t('nameAZ') },
    { value: 'name-za', label: t('nameZA') },
    { value: 'price-asc', label: t('priceAsc') },
    { value: 'price-desc', label: t('priceDesc') },
  ];

  const selectedOption =
    sortOptions.find((option) => option.value === sortOption)?.label ||
    t('sort');

  return (
    <div className={`flex justify-end ${className}`}>
      <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
        <DropdownMenuTrigger className="flex items-center gap-4 p-2 paragraph-2 hover:text-grey-darker focus:outline-0">
          {selectedOption}
          <IconChevron
            className={cn(
              'h-3 w-3 transition-all duration-500',
              isDropdownOpen && 'rotate-180'
            )}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full rounded-lg shadow-outline-black transition-all paragraph-2 hover:text-grey-almost-black">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className="cursor-pointer border-b border-grey-extra-light p-2 transition-all paragraph-2 last:border-b-0 hover:bg-grey-almost-white"
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
