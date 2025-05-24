import { ZodError } from 'zod';

import { DeliveryForm, deliverySchema } from '@/lib/schemas/checkout';
import { LocalizationKey } from '@/lib/types';

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

// Generate a shorter unique order number
export const generateOrderNumber = () => {
  // Use timestamp for uniqueness
  const timestamp = `${Date.now()}${Math.floor(performance.now() % 1000)}`; // Combine Date.now() with performance.now() for better uniqueness
  // Add some randomness (4 digits)
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  // Combine for uniqueness
  return `${timestamp}${randomPart}`;
};
