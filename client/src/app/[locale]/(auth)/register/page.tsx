'use client';

import { useEffect, useState } from 'react';

import { AnimateAppearance } from '@/components/transitions';

import { RegistrationForm, UserTypeSelection } from './components';

export type UserType = 'org' | 'individual';

export default function Page() {
  const [userType, setUserType] = useState<UserType>();
  const styles =
    'flex flex-col items-center justify-center min-h-screen-h-cutoff';

  // This is a workaround to solve an issue where the animations were not smooth,
  // and the padding was not being applied correctly for small height screens.
  const [verticalPadding, setVerticalPadding] = useState('');
  useEffect(() => {
    const handleResize = () => {
      const isPadding =
        (userType && window.innerHeight < 1000) ||
        (!userType && window.innerHeight < 750);
      setVerticalPadding(isPadding ? 'py-9 md:py-16' : '0');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [userType]);

  return (
    <div className={`px-4 md:px-9 ${verticalPadding}`}>
      <AnimateAppearance className={styles} isVisible={!userType}>
        <UserTypeSelection onSelectUserType={setUserType} />
      </AnimateAppearance>
      {userType && (
        <AnimateAppearance className={styles} isVisible={true}>
          <RegistrationForm
            userType={userType ?? 'individual'}
            onSelectUserType={setUserType}
          />
        </AnimateAppearance>
      )}
    </div>
  );
}
