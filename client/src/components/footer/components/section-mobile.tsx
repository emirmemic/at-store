import { FooterSectionType } from '@/components/footer/types';
import { IconChevron } from '@/components/icons';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Link } from '@/i18n/routing';

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
    <div className="px-4">
      <Collapsible key={section.id} open={isActive} onOpenChange={onToggle}>
        <CollapsibleTrigger className="flex w-full items-center justify-between border-b border-grey-light px-4 py-3 text-gray-500">
          <span className="heading-6">{section.title}</span>
          <IconChevron
            className={`transition-transform duration-300 ${
              isActive ? 'rotate-180' : 'rotate-0'
            }`}
            size={14}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden text-black transition-all duration-500 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
          <ul className="flex flex-col gap-1 pb-2 pl-6 pt-2">
            {section.items.map((item) => (
              <li key={item.id}>
                <Link
                  className="transition-color text-gray-500 paragraph-4 hover:text-grey"
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
