import React from 'react';

import { ContentPlaceholder, MenuCard, NameCard } from './components';

export default function Layout({ children }: { children: React.ReactNode }) {
  // This is the `nav-bar` height (3.5rem) + the top padding in the page
  const distanceFromTop = 'lg:top-[7rem] md:top-[6.5rem]';

  return (
    <div className="flex flex-col gap-9 py-9 container-max-width md:flex-row md:gap-6 md:py-12 lg:py-14">
      <div className={`md:sticky ${distanceFromTop} flex h-fit flex-col gap-9`}>
        <NameCard />
        <MenuCard className="flex-1 md:w-[290px] lg:w-[330px]" />
      </div>
      <ContentPlaceholder>{children}</ContentPlaceholder>
    </div>
  );
}
