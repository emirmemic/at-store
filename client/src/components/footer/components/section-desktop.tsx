import { FooterSectionType } from '@/components/footer/types';
import { Link } from '@/i18n/routing';

export default function SectionDesktop(section: FooterSectionType) {
  return (
    <div>
      <p className="mb-5 text-black paragraph-2 lg:font-bold">
        {section.title}
      </p>
      <ul className="flex flex-col gap-0.5">
        {section.items.map((item) => (
          <li key={item.id}>
            <Link
              className="transition-color flex w-full py-1 duration-300 footer-navigation hover:text-grey"
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
