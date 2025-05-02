'use client';

import { useState } from 'react';

import { AnimateSlots } from '@/components/transitions';
import { UserType } from '@/lib/types';

import { RegistrationForm, UserTypeSelection } from './components';

export default function Page() {
  const [userType, setUserType] = useState<UserType>();

  return (
    <AnimateSlots
      className="flex min-h-screen-h-cutoff w-full flex-col items-center justify-center px-4 py-9 md:px-9 md:py-16"
      currentSlotKey={userType ?? 'initial'}
    >
      {userType ? (
        <RegistrationForm
          userType={userType ?? 'individual'}
          onSelectUserType={setUserType}
        />
      ) : (
        <UserTypeSelection onSelectUserType={setUserType} />
      )}
    </AnimateSlots>
  );
}
