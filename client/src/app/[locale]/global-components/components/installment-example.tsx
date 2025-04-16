'use client';
import { useState } from 'react';

import Installments from '@/components/ui/installments';
import { InstallmentOption } from '@/lib/types';

export default function InstallmentExample() {
  const [selectedOption, setSelectedOption] =
    useState<InstallmentOption | null>(null);
  const installmentOptions = [
    { label: '6 rata', value: 6 },
    { label: '12 rata', value: 12 },
    { label: '18 rata', value: 18 },
    { label: '24 rata', value: 24 },
  ];
  return (
    <>
      <div className="h-[2px] w-full bg-grey"></div>
      <h2 className="display">Dropdown</h2>
      <div className="h-[2px] w-full bg-grey"></div>
      <Installments
        installmentOptions={installmentOptions}
        selectedOption={selectedOption}
        onSelectOption={setSelectedOption}
      />
    </>
  );
}
