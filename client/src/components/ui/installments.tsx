'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { IconChevron } from '@/components/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { InstallmentOption } from '@/lib/types';
import { cn } from '@/lib/utils/utils';

interface InstallmentsProps {
  installmentOptions: InstallmentOption[];
  selectedOption: InstallmentOption | null;
  onSelectOption: (option: InstallmentOption) => void;
}

export default function Installments({
  installmentOptions = [],
  selectedOption,
  onSelectOption,
}: InstallmentsProps) {
  const t = useTranslations('productPage');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const selectedText = selectedOption
    ? installmentOptions.find((option) => option.value === selectedOption.value)
        ?.label
    : t('installments');

  return (
    <div className="flex w-32 flex-col gap-2">
      <DropdownMenu onOpenChange={(open) => setIsDropdownOpen(open)}>
        <DropdownMenuTrigger
          className={cn(
            'flex w-full items-center justify-between gap-4 rounded-lg px-2 py-4 shadow-outline-black transition-all paragraph-2 hover:text-grey-almost-black focus:shadow-outline-black-hover focus:outline-0',
            selectedOption ? 'text-grey-almost-black' : 'text-grey'
          )}
        >
          <span>{selectedText}</span>
          <IconChevron
            className={cn(
              'h-3 w-3 transition-all duration-500',
              isDropdownOpen && 'rotate-180'
            )}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full rounded-lg shadow-outline-black transition-all paragraph-2 hover:text-grey-almost-black">
          {installmentOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className="cursor-pointer border-b border-grey-extra-light p-2 transition-all paragraph-2 last:border-b-0 hover:bg-grey-almost-white"
              onClick={() => onSelectOption(option)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
