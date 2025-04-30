//TODO handle API Errors for files
import { ZodError } from 'zod';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import complaintsSchema, { ComplaintsFormData } from '@/lib/schemas/complaints';
import { LocalizationKey } from '@/lib/types';

export async function complaintsAction(
  _prevState: unknown,
  formData: FormData,
  t: LocalizationKey
): Promise<{
  data: ComplaintsFormData;
  errors: Record<string, string>;
} | null> {
  const formDataObject = Object.fromEntries(formData) as ComplaintsFormData;
  const files: Record<string, File> = {};

  for (const [key, value] of formData.entries()) {
    if (['deviceImage', 'warrantyImage', 'billImage'].includes(key)) {
      files[key] = value as File;
    }
  }
  let validated: ComplaintsFormData;
  try {
    validated = complaintsSchema(t).parse(formDataObject);
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = Object.fromEntries(
        [...error.errors]
          .reverse()
          .map(({ path, message }) => [path[0], message])
      );
      // Early return without uploading any files if data is invalid
      return { data: formDataObject, errors: fieldErrors };
    }
    return {
      data: formDataObject,
      errors: { msg: 'Unexpected error during validation' },
    };
  }

  // Helper function to upload a single file
  const uploadFile = async (file: File): Promise<number | null> => {
    const uploadFormData = new FormData();
    uploadFormData.append('files', file);
    const res = await fetchAPI<{ id: number }[]>(
      `${STRAPI_BASE_URL}/api/upload`,
      {
        method: 'POST',
        body: uploadFormData,
      }
    );
    if (!res || !res.data || res.data.length === 0) {
      throw new Error('Upload failed or returned no data');
    }
    return res.data[0].id;
  };

  let deviceImageId: number | null = null;
  let warrantyImageId: number | null = null;
  let billImageId: number | null = null;

  try {
    if (files.deviceImage) {
      deviceImageId = await uploadFile(files.deviceImage);
    }
    if (files.warrantyImage) {
      warrantyImageId = await uploadFile(files.warrantyImage);
    }
    if (files.billImage) {
      billImageId = await uploadFile(files.billImage);
    }
  } catch (error) {
    return { data: formDataObject, errors: { msg: (error as Error).message } };
  }

  const complaintData = {
    ...validated,
    deviceImage: deviceImageId,
    warrantyImage: warrantyImageId,
    billImage: billImageId,
  };

  const res = await fetchAPI(`${STRAPI_BASE_URL}/api/complaints`, {
    method: 'POST',
    body: { data: complaintData },
  });
  if (res.error) {
    const detailsErrors = res.error.details?.errors || [];
    const fieldErrors = Object.fromEntries(
      detailsErrors.map(({ path, message }) => [path[0], message])
    );
    return { data: formDataObject, errors: fieldErrors };
  }

  return null;
}
