import { ZodError } from 'zod';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import {
  createForgotPasswordSchema,
  ForgotPasswordFormData,
} from '@/lib/schemas/auth';
import { LocalizationKey } from '@/lib/types';

export async function handleSubmit(
  _prevState: unknown,
  formData: FormData,
  t: LocalizationKey
) {
  const data = Object.fromEntries(formData) as ForgotPasswordFormData;

  try {
    const validated = createForgotPasswordSchema(t).parse(data);
    const isCodeSent = await forgotPassword(validated);
    return { data, isCodeSent };
  } catch (err) {
    return err instanceof ZodError
      ? {
          data,
          errors: Object.fromEntries(
            [...err.errors]
              .reverse()
              .map(({ path, message }) => [path[0], message])
          ) as ForgotPasswordFormData,
        }
      : {
          data,
          apiError: (err as Error).message,
        };
  }
}

const forgotPassword = async ({
  email,
}: ForgotPasswordFormData): Promise<boolean> => {
  const res = await fetchAPI(`${STRAPI_BASE_URL}/api/auth/forgot-password`, {
    method: 'POST',
    body: { email },
  });

  if (res.error) throw new Error(res.error.message);

  if (res.status !== 200) throw new Error(res.statusText);

  return res.status === 200;
};
