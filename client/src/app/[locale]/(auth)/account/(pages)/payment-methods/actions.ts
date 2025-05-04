import { ZodError } from 'zod';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import paymentMethodSchema, {
  PaymentMethod,
} from '@/lib/schemas/payment-method';
import { LocalizationKey } from '@/lib/types';

import { PaymentMethodResponse } from '../../types';

export async function handleSubmit(
  _prevState: unknown,
  formData: FormData,
  t: LocalizationKey,
  userId: number
) {
  const data = Object.fromEntries(formData) as PaymentMethod;

  try {
    const validatedData = paymentMethodSchema(t).parse(data);
    const paymentMethod = await addPaymentMethod(validatedData, userId);
    return {
      data: data,
      paymentMethod,
    };
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = Object.fromEntries(
        [...err.errors].reverse().map(({ path, message }) => {
          return [path[0], message];
        })
      ) as PaymentMethod;

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

    const errors = (err as { errors: PaymentMethod }).errors;

    return {
      data: data,
      errors: errors,
    };
  }
}

const addPaymentMethod = async (
  data: PaymentMethod,
  userId: number
): Promise<PaymentMethodResponse | undefined> => {
  // remove spaces or dashes from card number
  data.cardNumber = data.cardNumber.replace(/\s+/g, '').replace(/-/g, '');
  const res = await fetchAPI<{ data: PaymentMethodResponse }>(
    `${STRAPI_BASE_URL}/api/payment-methods`,
    {
      method: 'POST',
      body: { data: { ...data, user: userId } },
    }
  );

  if (res.error) {
    const errors = res.error.details?.errors?.reverse() || [];

    const fieldErrors = Object.fromEntries(
      errors.map(({ path, message }) => [path[0], message])
    );

    throw errors.length === 0
      ? new Error(res.error.message)
      : new Object({ errors: fieldErrors });
  }

  return res.data?.data;
};

export const deletePaymentMethod = async (documentId: string) =>
  fetchAPI(`${STRAPI_BASE_URL}/api/payment-methods/${documentId}`, {
    method: 'DELETE',
  });

export const toggleDefault = async (documentId: string) =>
  fetchAPI(`${STRAPI_BASE_URL}/api/payment-methods/${documentId}/isDefault`, {
    method: 'PUT',
  });
