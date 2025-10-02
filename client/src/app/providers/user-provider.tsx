'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { APIResponse, fetchAPI } from '@/lib/fetch-api';
import { ProductResponse, UserAddress, UserInformation } from '@/lib/types';

import { deleteCookie } from '../actions';

export type UserContextType = {
  user: UserInformation | null;
  setUser: (user: UserInformation | null) => void;
  toggleFavorite: (
    product: ProductResponse
  ) => Promise<APIResponse<{ isFavorited: boolean }>>;
  updateUserNewsletter: (subscribed: boolean) => void;
  setAddresses: (addresses: UserAddress[]) => void;
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
  updateUserNewsletter: () => {},
  setAddresses: () => {},
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
    if (!user) {
      deleteCookie('jwt');
    }
  }, [user]);

  const setFavorites = (favorites: ProductResponse[]) => {
    if (user) {
      setUser({ ...user, favoriteProducts: favorites });
    }
  };
  const updateUserNewsletter = (subscribed: boolean) => {
    if (user && user.accountDetails && user.accountDetails.newsletter) {
      setUser({
        ...user,
        accountDetails: {
          ...user.accountDetails,
          newsletter: {
            ...user.accountDetails.newsletter,
            subscribed: subscribed,
          },
        },
      });
    }
  };

  const setAddresses = (addresses: UserAddress[]) => {
    if (!user) return;

    const defaultAddress =
      addresses.find((address) => address.isDefault) ?? addresses[0] ?? null;

    setUser({
      ...user,
      addresses,
      accountDetails: {
        ...user.accountDetails,
        address: defaultAddress?.address ?? user.accountDetails.address ?? '',
      },
    });
  };

  const toggleFavorite = async (
    product: ProductResponse
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
    <UserContext.Provider
      value={{
        user,
        setUser,
        toggleFavorite,
        updateUserNewsletter,
        setAddresses,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserProvider() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserProvider must be used within UserProvider');
  }
  return context;
}
