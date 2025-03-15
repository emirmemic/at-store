import React from 'react';

export interface SectionProps {
  title: string;
  listItems: Array<string>;
  sectionNumber: number;
  subTitle?: string;
}

export default function Section({
  sectionNumber,
  title,
  listItems,
  subTitle,
}: Readonly<SectionProps>) {
  if (subTitle)
    return (
      <section>
        <h2 className="heading-4 md:heading-3">
          {sectionNumber}
          {'. '}
          {title}
        </h2>
        <p className="pl-9 heading-5 md:pl-14 md:heading-4"> {subTitle} </p>
        <ul className="list-inside list-disc pl-12 paragraph-2 md:pl-[74px] md:paragraph-1">
          {listItems.map((list, index) => (
            <li key={index}>{list}</li>
          ))}
        </ul>
      </section>
    );
  else
    return (
      <section>
        <h2 className="heading-4 md:heading-3">
          {sectionNumber}
          {'. '}
          {title}
        </h2>
        <ul className="list-inside list-disc pl-9 paragraph-2 md:pl-14 md:paragraph-1">
          {listItems.map((list, index) => (
            <li key={index}>{list}</li>
          ))}
        </ul>
      </section>
    );
}
