'use server';
//TODO handle API Errors for files
import { ZodError } from 'zod';

import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI, StrapiValidationError } from '@/lib/fetch-api';
import complaintsSchema, { ComplaintsFormData } from '@/lib/schemas/complaints';
import { getAuthToken } from '@/lib/services';

export async function complaintsAction(
  _prevState: unknown,
  formData: FormData
): Promise<{
  data: ComplaintsFormData;
  errors: Record<string, string>;
} | null> {
  const authToken = await getAuthToken();

  const formDataObject = Object.fromEntries(formData) as ComplaintsFormData;
  const files: Record<string, File> = {};

  for (const [key, value] of formData.entries()) {
    if (['deviceImage', 'warrantyImage', 'billImage'].includes(key)) {
      files[key] = value as File;
    }
  }
  let validated;
  try {
    validated = complaintsSchema.parse(formDataObject);
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErrors = Object.fromEntries(
        [...error.errors]
          .reverse()
          .map(({ path, message }) => [path[0], message])
      );
      // Early return without uploading any files if non-file data is invalid
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
    const res = await fetchAPI<{ id: number }>(
      `${STRAPI_BASE_URL}/api/upload`,
      {
        method: 'POST',
        authToken,
        body: uploadFormData,
      }
    );
    if (res.error) {
      throw new Error(res.error.message);
    }
    return res.data?.id || null;
  };

  let deviceImageId: number | null = null;
  let warrantyImageId: number | null = null;
  let billImageId: number | null = null;

  try {
    deviceImageId = await uploadFile(files.deviceImage);
    warrantyImageId = await uploadFile(files.warrantyImage);
    billImageId = await uploadFile(files.billImage);
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
    authToken,
    body: { data: complaintData },
  });
  if (res.error) {
    const detailsErrors = res.error.details.errors as StrapiValidationError[];
    const fieldErrors = Object.fromEntries(
      detailsErrors.map(({ path, message }) => [path[0], message])
    );
    return { data: formDataObject, errors: fieldErrors };
  }

  return null;
}
