'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { APIResponse, fetchAPI } from '@/lib/fetch-api';
import { ProductBase, UserInformation } from '@/lib/types';

import { deleteCookie } from '../actions';

type UserContextType = {
  user: UserInformation | null;
  setUser: (user: UserInformation | null) => void;
  toggleFavorite: (
    product: ProductBase
  ) => Promise<APIResponse<{ isFavorited: boolean }>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  toggleFavorite: async () => ({
    data: { isFavorited: false },
    status: 200,
    statusText: 'OK',
    type: 'default',
  }),
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

  const setFavorites = (favorites: ProductBase[]) => {
    if (user) {
      setUser({ ...user, favoriteProducts: favorites });
    }
  };

  const toggleFavorite = async (
    product: ProductBase
  ): Promise<APIResponse<{ isFavorited: boolean }>> => {
    const path = `/api/products/${product.documentId}/favorite`;
    const res = await fetchAPI<{ isFavorited: boolean }>(
      `${STRAPI_BASE_URL}${path}`,
      {
        method: 'POST',
      }
    );
    if (res.status === 200) {
      const isFavorited = res.data?.isFavorited;
      const updatedFavorites = isFavorited
        ? [...(user?.favoriteProducts ?? []), product]
        : user?.favoriteProducts.filter(
            (favProduct) => favProduct.id !== product.id
          );
      setFavorites(updatedFavorites ?? []);
    }
    return res;
  };

  return (
    <UserContext.Provider value={{ user, setUser, toggleFavorite }}>
      {children}
    </UserContext.Provider>
  );
}
