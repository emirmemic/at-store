import { ZodError } from 'zod';

import { UserContextType } from '@/app/providers/user-provider';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import {
  AccountDetailsFormData,
  createAccountDetailsSchema,
} from '@/lib/schemas/auth';
import { getUser } from '@/lib/services';
import { LocalizationKey } from '@/lib/types';

export async function handleSubmit(
  _prevState: unknown,
  formData: FormData,
  userProvider: UserContextType,
  t: LocalizationKey
): Promise<{
  data: AccountDetailsFormData;
  errors?: AccountDetailsFormData;
  apiError?: string;
  success?: boolean;
}> {
  const data = Object.fromEntries(formData) as AccountDetailsFormData;
  const { user, setUser } = userProvider;
  const userId = user?.id || 0;
  const userType = user?.accountDetails?.role?.type || 'authenticated';

  try {
    const validationSchema = createAccountDetailsSchema(t, userType);

    const { confirmPassword, ...accountDetails } = validationSchema.parse(data);
    await updateAccountDetails(accountDetails, userId);
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = Object.fromEntries(
        [...err.errors].reverse().map(({ path, message }) => {
          return [path[0], message];
        })
      ) as AccountDetailsFormData;

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

    const errors = (err as { errors: AccountDetailsFormData }).errors;

    return {
      data: data,
      errors: errors,
    };
  }

  // onSuccess
  const updatedUser = await getUser();
  setUser(updatedUser);

  return {
    data: { ...data, password: '', confirmPassword: '' },
    success: true,
  };
}

const updateAccountDetails = async (
  data: AccountDetailsFormData,
  userId: number
) => {
  const res = await fetchAPI(`${STRAPI_BASE_URL}/api/users/${userId}`, {
    method: 'PUT',
    body: data,
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
};
