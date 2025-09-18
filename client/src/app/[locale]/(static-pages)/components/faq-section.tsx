'use client';
import { useState } from 'react';

import { IconChevron } from '@/components/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export interface FaqSectionType {
  question: string;
  answer: string;
}

export default function FaqSection(faqSection: FaqSectionType) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible
      className="border-t border-neutral-200 first:border-t-0 last:border-b"
      key={faqSection.question}
      onOpenChange={setIsOpen}
    >
      <CollapsibleTrigger className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10">
        <span className="text-lg font-medium leading-7 text-neutral-900 md:text-xl">
          {faqSection.question}
        </span>
        <IconChevron
          className={`mt-1 shrink-0 text-neutral-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-neutral-600' : 'rotate-0'
          }`}
          height={18}
          width={10}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden pb-6 text-base leading-7 text-neutral-500 transition-[max-height,opacity] duration-300 data-[state=closed]:max-h-0 data-[state=open]:max-h-[500px] data-[state=open]:pt-2 data-[state=open]:text-neutral-600 data-[state=closed]:opacity-0 data-[state=open]:opacity-100">
        {faqSection.answer}
      </CollapsibleContent>
    </Collapsible>
  );
}
