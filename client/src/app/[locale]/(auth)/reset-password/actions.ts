import { ZodError } from 'zod';

import { createJwtCookie } from '@/app/actions';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import {
  createResetPasswordSchema,
  ResetPasswordFormData,
} from '@/lib/schemas/auth';
import { getUser } from '@/lib/services';
import { AuthResponse, LocalizationKey, UserInformation } from '@/lib/types';

export async function handleSubmit(
  _prevState: unknown,
  formData: FormData,
  code: string,
  t: LocalizationKey
) {
  const data = Object.fromEntries(formData) as ResetPasswordFormData;

  try {
    const validated = createResetPasswordSchema(t).parse(data);
    const user = await resetPassword({ ...validated, code });
    return { data, user };
  } catch (err) {
    return err instanceof ZodError
      ? {
          data,
          errors: Object.fromEntries(
            [...err.errors]
              .reverse()
              .map(({ path, message }) => [path[0], message])
          ) as ResetPasswordFormData,
        }
      : {
          data,
          apiError: (err as Error).message,
        };
  }
}

const resetPassword = async ({
  password,
  passwordConfirmation,
  code,
}: ResetPasswordFormData & {
  code: string;
}): Promise<UserInformation | null> => {
  const res = await fetchAPI<AuthResponse>(
    `${STRAPI_BASE_URL}/api/auth/reset-password`,
    {
      method: 'POST',
      body: {
        password: password,
        passwordConfirmation: passwordConfirmation,
        code: code,
      },
    }
  );

  if (res.error) throw new Error(res.error.message);

  if (res.data) {
    await createJwtCookie(res.data.jwt);
    const user = await getUser();
    return user;
  }

  return null;
};
