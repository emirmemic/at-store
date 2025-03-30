import { useContext, useState } from 'react';

import { createJwtCookie } from '@/app/actions';
import { UserContext } from '@/app/providers';
import { useRouter } from '@/i18n/routing';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { LoginFormData, RegisterFormData } from '@/lib/schemas/auth';
import { AuthError, AuthResponse } from '@/lib/types';

import { getUser } from '../services';

export const useAuth = () => {
  const router = useRouter();
  const userProvider = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);

  const login = async (data: LoginFormData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const res = await fetchAPI<AuthResponse>(
      `${STRAPI_BASE_URL}/api/auth/local`,
      {
        method: 'POST',
        body: {
          identifier: data.email,
          password: data.password,
        },
      }
    );

    if (res.error) {
      setError({ message: res.error.message });
      setIsLoading(false);
      return false;
    }

    const jwt = res.data?.jwt;
    if (jwt) {
      await createJwtCookie(jwt);
      const user = await getUser();
      userProvider.setUser(user);
      router.push('/');

      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const register = async (data: RegisterFormData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    const res = await fetchAPI<AuthResponse>(
      `${STRAPI_BASE_URL}/api/auth/local/register`,
      {
        method: 'POST',
        body: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      }
    );

    if (res.error) {
      setError({ message: res.error.message });
      setIsLoading(false);
      return false;
    }

    setIsLoading(false);
    router.push('/login');
    return true;
  };

  return { login, register, isLoading, error };
};
