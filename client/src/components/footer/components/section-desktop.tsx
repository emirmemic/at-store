import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils/utils';

import { FooterSectionType } from '../types/footer-types';

interface PropType {
  section: FooterSectionType;
  className?: string;
}

export default function SectionDesktop({ section, className }: PropType) {
  return (
    <div className={cn('', className)}>
      <p className="mb-5 paragraph-3">{section.title}</p>
      <ul className="flex flex-col gap-0.5">
        {section.items.map((item) => (
          <li key={item.path}>
            <Link
              className="transition-color paragraph-5 hover:text-grey"
              href={item.path}
              target={item.target ?? undefined}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
