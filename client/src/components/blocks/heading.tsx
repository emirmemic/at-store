import React from 'react';

interface HeadingProps {
  heading: string;
  subHeading?: string;
  text?: string;
}

export function Heading({ heading, subHeading, text }: HeadingProps) {
  return (
    <section className="container flex flex-col items-center gap-6 pb-2 pt-24 sm:gap-7">
      <div className="flex flex-col gap-3">
        {subHeading && (
          <span className="text-center font-bold uppercase text-primary">
            {subHeading}
          </span>
        )}
        <h2 className="font-heading text-center text-3xl font-semibold sm:text-4xl">
          {heading}
        </h2>
      </div>
      {text && (
        <p className="max-w-2xl text-center text-lg text-muted-foreground">
          {text}
        </p>
      )}
    </section>
  );
}
