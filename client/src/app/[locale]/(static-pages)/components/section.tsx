import { cn } from '@/lib/utils/utils';

export interface SectionProps {
  title: string;
  listItems: { text: string; link?: string }[];
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
            {item.link && (
              <a
                className="text-blue hover:underline"
                href={item.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {item.link}
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
