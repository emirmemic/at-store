import Link from 'next/link';
import React from 'react';

import { cn } from '@/lib/utils/utils';

export interface SectionProps {
  title: string;
  listItems: {
    text: string;
    link?: string;
    path?: string;
    target?: string;
  }[][];
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
      <h2 className="bullet-heading-3 md:bullet-heading-3">{`${sectionNumber}. ${title}`}</h2>
      {subTitle && (
        <p className="md:bullet-heading-5 pl-9 heading-5 md:pl-14">
          {subTitle}
        </p>
      )}
      <ul
        className={cn(
          'list-inside list-disc text-sm md:text-base',
          subTitle ? 'pl-12 md:pl-[74px]' : 'pl-9 md:pl-14'
        )}
      >
        {listItems.map((listitem, index) => (
          <li key={index}>
            {listitem.map((item, itemIndex) => (
              <React.Fragment key={itemIndex}>
                {item.path ? (
                  <Link className="text-blue hover:underline" href={item.path}>
                    {item.text}
                  </Link>
                ) : (
                  <span> {item.text} </span>
                )}
              </React.Fragment>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}
