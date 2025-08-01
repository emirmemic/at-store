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
  const rawData = Object.fromEntries(formData) as DeliveryForm & {
    deliveryMethod?: string;
  };

  const data: DeliveryForm & { deliveryMethod?: string } = {
    ...rawData,
    email: rawData.email || 'noemail@pickup.com',
    address: rawData.address || 'Preuzimanje u poslovnici',
    city: rawData.city || 'n/a',
    postalCode: rawData.postalCode || '00000',
    country: rawData.country || 'BA',
  };

  try {
    const validationSchema =
      data.deliveryMethod === 'pickup'
        ? deliverySchema(t).partial({
            address: true,
            email: true,
            city: true,
            postalCode: true,
            country: true,
          }) // samo ime, prezime, phoneNumber i note ostaju required
        : deliverySchema(t);

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
