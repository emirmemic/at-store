import React from 'react';

import { MacDodaciBar } from '@/components/product-card';

export default function ProductCardExamples() {
  return (
    <>
      <div className="h-[2px] w-full bg-grey"></div>
      <h2 className="display">Product Card</h2>
      <div className="h-[2px] w-full bg-grey"></div>
      <h3 className="heading-2">Mac dodaci bar</h3>
      <div className="h-[2px] w-full bg-grey"></div>
      <MacDodaciBar />
    </>
  );
}
