import { ZodError } from 'zod';

import { DeliveryForm, deliverySchema } from '@/lib/schemas/checkout';
import { LocalizationKey } from '@/lib/types';
import { generateIdFromDate } from '@/lib/utils/utils';

export async function handleSubmit(
  _prevState: unknown,
  formData: FormData,
  t: LocalizationKey
): Promise<{
  data: DeliveryForm;
  errors?: DeliveryForm;
  success?: boolean;
}> {
  const data = Object.fromEntries(formData) as DeliveryForm;

  try {
    const validationSchema = deliverySchema(t);

    validationSchema.parse(data);
    // go to the payment page
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = Object.fromEntries(
        [...err.errors].reverse().map(({ path, message }) => {
          return [path[0], message];
        })
      ) as DeliveryForm;

      return {
        data: data,
        errors: errors,
      };
    }

    return {
      data: data,
    };
  }

  return {
    data: data,
    success: true,
  };
}

export const generateOrderNumber = () => {
  return `ORD-${generateIdFromDate()}`;
};
