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
  const getValue = (key: string) => {
    const value = formData.get(key);
    return typeof value === 'string' ? value.trim() : '';
  };

  const deliveryMethod = getValue('deliveryMethod');
  const isPickup = deliveryMethod === 'pickup';

  const data: DeliveryForm & { deliveryMethod?: string } = {
    name: getValue('name'),
    surname: getValue('surname'),
    address: isPickup ? 'Preuzimanje u poslovnici' : getValue('address'),
    email: getValue('email'),
    city: isPickup ? 'n/a' : getValue('city'),
    postalCode: isPickup ? '00000' : getValue('postalCode'),
    country: isPickup ? 'BA' : getValue('country'),
    note: getValue('note'),
    phoneNumber: getValue('phoneNumber'),
    deliveryMethod: deliveryMethod || undefined,
  };

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
