import { Link, Pathname } from '@/i18n/routing';
import { cn } from '@/lib/utils/utils';

export interface SectionProps {
  title: string;
  listItems: { text: string; path?: Pathname; target?: string }[];
  sectionNumber: number;
  subTitle?: string;
}

export default function Section({
  sectionNumber,
  title,
  listItems,
  subTitle,
}: Readonly<SectionProps>) {
  return (
    <section>
      <h2 className="heading-4 md:heading-3">{`${sectionNumber}. ${title}`}</h2>
      {subTitle && (
        <p className="pl-9 heading-5 md:pl-14 md:heading-4"> {subTitle} </p>
      )}
      <ul
        className={cn(
          'list-inside list-disc paragraph-2 md:paragraph-1',
          subTitle ? 'pl-12 md:pl-[74px]' : 'pl-9 md:pl-14'
        )}
      >
        {listItems.map((item, index) => (
          <li key={index}>
            {item.text}{' '}
            {item.path && (
              <Link
                className="transition-color text-blue hover:text-grey"
                href={
                  item.path === ('at@atstore.ba' as Pathname)
                    ? ('mailto:at@atstore.ba' as Pathname)
                    : item.path
                }
                target={item.target ?? undefined}
              >
                {item.path}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
