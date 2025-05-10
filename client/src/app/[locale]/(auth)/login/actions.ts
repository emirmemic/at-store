import { ZodError } from 'zod';

import { createJwtCookie } from '@/app/actions';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { createLoginSchema, LoginFormData } from '@/lib/schemas/auth';
import { getUser } from '@/lib/services';
import { getCart } from '@/lib/services/get-cart';
import {
  AuthResponse,
  LocalizationKey,
  ShoppingCartItem,
  UserInformation,
} from '@/lib/types';

export async function handleSubmit(
  _prevState: unknown,
  formData: FormData,
  t: LocalizationKey
) {
  const data = Object.fromEntries(formData) as LoginFormData;

  try {
    const loginData = createLoginSchema(t).parse(data);
    const loginResponse = await login(loginData);
    return { data, loginResponse };
  } catch (err) {
    return err instanceof ZodError
      ? {
          data,
          errors: Object.fromEntries(
            [...err.errors]
              .reverse()
              .map(({ path, message }) => [path[0], message])
          ) as LoginFormData,
        }
      : {
          data,
          apiError: (err as Error).message,
        };
  }
}

const login = async ({
  email,
  password,
}: LoginFormData): Promise<{
  user: UserInformation | null;
  cart: ShoppingCartItem[];
} | null> => {
  const res = await fetchAPI<AuthResponse>(
    `${STRAPI_BASE_URL}/api/auth/local`,
    {
      method: 'POST',
      body: { identifier: email, password },
    }
  );

  if (res.error) throw new Error(res.error.message);
  if (res.data) {
    await createJwtCookie(res.data.jwt);
    const user = await getUser();
    const cart = await getCart();
    return { user, cart };
  }
  return null;
};
