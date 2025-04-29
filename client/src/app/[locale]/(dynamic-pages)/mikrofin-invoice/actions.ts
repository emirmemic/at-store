import { ZodError } from 'zod';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import mikrofinSchema, { mikrofinFormData } from '@/lib/schemas/mikrofin';
import { LocalizationKey } from '@/lib/types';

export async function mikrofinAction(
  _prevState: unknown,
  formData: FormData,
  t: LocalizationKey
): Promise<{
  data: mikrofinFormData;
  errors: Record<string, string>;
} | null> {
  const data = Object.fromEntries(formData) as mikrofinFormData;
  const validated = mikrofinSchema(t);

  try {
    const { nameAndSurname, ...mikrofinData } = validated.parse(data);
    const [name, surname] = nameAndSurname.split(' ');
    const dataToSend = {
      ...mikrofinData,
      name,
      surname,
    };
    createPreInvoice(dataToSend);
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = Object.fromEntries(
        [...error.errors]
          .reverse()
          .map(({ path, message }) => [path[0], message])
      );
      return { data: data, errors: fieldErrors };
    }
    return {
      data: data,
      errors: { msg: 'Unexpected error during validation' },
    };
  }
  return null;
}
async function createPreInvoice(
  dataToSend: Omit<mikrofinFormData, 'nameAndSurname'> & {
    name: string;
    surname: string;
  }
) {
  const res = await fetchAPI(`${STRAPI_BASE_URL}/api/pre-invoices`, {
    method: 'POST',
    body: { data: dataToSend },
  });
  if (res.error) {
    const detailsErrors = res.error.details?.errors || [];
    const fieldErrors = Object.fromEntries(
      detailsErrors.map(({ path, message }) => [path[0], message])
    );
    throw new Object({ errors: fieldErrors });
  }
}
