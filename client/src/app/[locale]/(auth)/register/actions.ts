import { redirect } from 'next/navigation';
import { ZodError } from 'zod';

import { PAGE_NAMES } from '@/i18n/page-names';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import {
  createRegisterOrgSchema,
  createRegisterSchema,
} from '@/lib/schemas/auth';
import { LocalizationKey } from '@/lib/types';

import { UserType } from './page';

export async function handleSubmit<T>(
  _prevState: unknown,
  formData: FormData,
  userType: UserType,
  t: LocalizationKey
): Promise<{ data: T; errors?: T }> {
  const data = Object.fromEntries(formData) as T;
  const isOrg = userType === 'org';
  try {
    if (isOrg) {
      const registerOrgSchema = createRegisterOrgSchema(t);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, nameAndSurname, ...registerData } =
        registerOrgSchema.parse(data);
      const [name, surname] = nameAndSurname.split(' ');
      await register({ ...registerData, name, surname });
    } else {
      const registerSchema = createRegisterSchema(t);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    return {
      data: data,
    };
  }

  // onSuccess
  redirect(PAGE_NAMES.LOGIN);
}

const register = async <T extends Record<string, unknown>>(data: T) => {
  const res = await fetchAPI(`${STRAPI_BASE_URL}/api/auth/local/register`, {
    method: 'POST',
    body: {
      ...data,
      username:
        typeof data.email === 'string' ? data.email.split('@')[0] : 'USERNAME', // TEMP
    },
  });

  if (res.error) {
    throw new Error(res.error.message);
  }
};
