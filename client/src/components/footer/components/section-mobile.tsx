import Link from 'next/link';

import { FooterSectionType } from '@/components/footer/types';
import { IconChevron } from '@/components/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface SectionMobileProps {
  section: FooterSectionType;
  isActive: boolean;
  onToggle: () => void;
}
export default function SectionMobile({
  section,
  isActive,
  onToggle,
}: SectionMobileProps) {
  return (
    <div>
      <Collapsible key={section.id} open={isActive} onOpenChange={onToggle}>
        <CollapsibleTrigger className="flex w-full max-w-72 items-center justify-between gap-4">
          <span className="heading-5">{section.title}</span>
          <IconChevron
            className={`transition-transform duration-500 ${
              isActive ? 'rotate-180' : 'rotate-0'
            }`}
            size={14}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden transition-all duration-500 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
          <ul className="flex flex-col gap-1 pl-6">
            {section.items.map((item) => (
              <li key={item.id}>
                <Link
                  className="transition-color paragraph-2 hover:text-grey"
                  href={item.path}
                  target={item.target ?? undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
