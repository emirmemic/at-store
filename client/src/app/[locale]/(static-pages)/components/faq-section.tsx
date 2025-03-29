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
    <div>
      <Collapsible key={faqSection.question} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="mr-4 flex w-full items-center justify-between py-3 text-start md:mr-5 md:py-4">
          <span className="text-grey paragraph-2">{faqSection.question}</span>
          <IconChevron
            className={`text-grey-darker transition-transform duration-500 ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            height={15}
            width={7}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden rounded-b-2xl bg-grey-extra-light transition-all duration-500 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
          <p className="px-3 py-4 text-grey-darkest paragraph-2 md:py-6">
            {faqSection.answer}
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
