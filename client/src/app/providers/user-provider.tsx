'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

import { UserInformation } from '@/lib/types';

import { deleteCookie } from '../actions';

type UserContextType = {
  user: UserInformation | null;
  setUser: (user: UserInformation | null) => void;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export default function UserProvider({
  children,
  initialValue,
}: {
  children: ReactNode;
  initialValue: UserInformation | null;
}) {
  const [user, setUser] = useState<UserInformation | null>(initialValue);

  useEffect(() => {
    if (!user) deleteCookie('jwt');
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
