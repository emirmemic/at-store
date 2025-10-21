import { ZodError } from 'zod';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import {
  createRegisterOrgSchema,
  createRegisterSchema,
} from '@/lib/schemas/auth';
import { LocalizationKey, UserType } from '@/lib/types';

export async function handleSubmit<T>(
  _prevState: unknown,
  formData: FormData,
  userType: UserType,
  t: LocalizationKey
): Promise<{ data: T; errors?: T; apiError?: string; success?: boolean }> {
  const data = Object.fromEntries(formData) as T;
  const isOrg = userType === 'organization';
  try {
    if (isOrg) {
      const registerOrgSchema = createRegisterOrgSchema(t);

      const { confirmPassword, nameAndSurname, ...registerData } =
        registerOrgSchema.parse(data);
      const [name, surname] = nameAndSurname.split(' ');
      await register({ ...registerData, name, surname });
    } else {
      const registerSchema = createRegisterSchema(t);

      const { confirmPassword, ...registerData } = registerSchema.parse(data);

      await register(registerData);
    }
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = Object.fromEntries(
        [...err.errors].reverse().map(({ path, message }) => {
          return [path[0], message];
        })
      ) as T;
      return {
        data: data,
        errors: errors,
      };
    }

    if (err instanceof Error) {
      return {
        data: data,
        apiError: err.message,
      };
    }

    const errors = (err as { errors: T }).errors;
    return {
      data: data,
      errors: errors,
    };
  }

  return { data: data, success: true };
}

const register = async <T extends Record<string, unknown>>(data: T) => {
  const res = await fetchAPI(`${STRAPI_BASE_URL}/api/auth/local/register`, {
    method: 'POST',
    body: {
      ...data,
      username: data.email,
    },
    isAuth: false,
  });

  if (res.error) {
    const errors = res.error.details?.errors?.reverse() || [];

    const fieldErrors = Object.fromEntries(
      errors.map(({ path, message }) => [path[0], message])
    );

    throw errors.length === 0
      ? new Error(res.error.message)
      : new Object({ errors: fieldErrors });
  }

  return res.data;
};
