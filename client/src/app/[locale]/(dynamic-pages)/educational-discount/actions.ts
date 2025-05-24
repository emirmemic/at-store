import { ZodError } from 'zod';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import educationalDiscountSchema, {
  EducationalDiscountSchema,
} from '@/lib/schemas/educationalDiscount';
import { LocalizationKey } from '@/lib/types';

export async function formAction(
  _prevState: unknown,
  formData: FormData,
  t: LocalizationKey
): Promise<{
  data: EducationalDiscountSchema;
  errors: Record<string, string>;
} | null> {
  const data = Object.fromEntries(formData) as EducationalDiscountSchema;
  try {
    const validated = educationalDiscountSchema(t);
    validated.parse(data);
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
  const indexPhoto = data.indexPhoto;

  const uploadFile = async (file: File): Promise<number | null> => {
    const fd = new FormData();
    fd.append('files', file);
    const res = await fetchAPI<{ id: number }[]>(
      `${STRAPI_BASE_URL}/api/upload`,
      {
        method: 'POST',
        isAuth: false,
        body: fd,
      }
    );

    if (!res || !res.data || res.data.length === 0) {
      throw new Error('Upload failed or returned no data');
    }
    return res.data[0].id;
  };

  let indexPhotoId: number | null = null;

  try {
    if (indexPhoto) {
      indexPhotoId = await uploadFile(indexPhoto);
    }
  } catch (error) {
    return { data: data, errors: { msg: (error as Error).message } };
  }

  const submitData = {
    ...data,
    indexPhoto: indexPhotoId,
  };

  const res = await fetchAPI(`${STRAPI_BASE_URL}/api/educational-discounts`, {
    method: 'POST',
    isAuth: false,
    body: { data: submitData },
  });
  if (res.error) {
    const details = res.error.details?.errors || [];
    const fieldErrors = Object.fromEntries(
      details.map((d) => [d.path[0], d.message])
    );
    return { data: data, errors: fieldErrors };
  }
  return null;
}
