'use client';
import { useState } from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import IconChevron from '../payment-methods/icons/chevron';

export interface FaqSectionType {
  question: string;
  answer: string;
}

export default function FaqSection(faqSection: FaqSectionType) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Collapsible key={faqSection.question} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="mr-4 flex w-full items-center justify-between py-3 text-start md:mr-5 md:py-4">
          <span className="text-grey paragraph-2">{faqSection.question}</span>
          <IconChevron
            className={`transition-transform duration-500 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            height={7}
            width={15}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="text overflow-hidden bg-grey-extra-light py-4 transition-all duration-500 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown md:px-3 md:py-6">
          <p className="text-grey-darkest paragraph-2">{faqSection.answer}</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
