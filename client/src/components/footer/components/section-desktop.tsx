import { FooterSectionType } from '@/components/footer/types';
import { Link } from '@/i18n/routing';

export default function SectionDesktop(section: FooterSectionType) {
  return (
    <div>
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
