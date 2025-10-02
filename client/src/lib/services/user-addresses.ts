import { STRAPI_BASE_URL } from '@/lib/constants';
import { fetchAPI } from '@/lib/fetch-api';
import { AddressFormData } from '@/lib/schemas/address';
import { UserAddress } from '@/lib/types';

const ENDPOINT = `${STRAPI_BASE_URL}/api/user-addresses`;

type AddressResponse = { data: UserAddress[] };

type FieldErrors = Record<string, string>;

const handleError = (error: {
  message: string;
  details?: { errors?: { path: string[]; message: string }[] } | null;
}): never => {
  const errors = error.details?.errors?.reverse() || [];

  const fieldErrors: FieldErrors = Object.fromEntries(
    errors.map(({ path, message }) => [
      path[path.length - 1] ?? path[0],
      message,
    ])
  );

  throw errors.length === 0
    ? new Error(error.message)
    : new Object({ errors: fieldErrors });
};

const extractAddresses = (
  res: Awaited<ReturnType<typeof fetchAPI<AddressResponse>>>
) => {
  if (res.error) {
    handleError(res.error);
  }

  return res.data?.data ?? [];
};

export const getUserAddresses = async (): Promise<UserAddress[]> => {
  const res = await fetchAPI<AddressResponse>(ENDPOINT, {
    method: 'GET',
  });
  return extractAddresses(res);
};

export const createUserAddress = async (
  data: AddressFormData
): Promise<UserAddress[]> => {
  const res = await fetchAPI<AddressResponse>(ENDPOINT, {
    method: 'POST',
    body: { data },
  });

  return extractAddresses(res);
};

export const updateUserAddress = async (
  documentId: string,
  data: AddressFormData
): Promise<UserAddress[]> => {
  const res = await fetchAPI<AddressResponse>(`${ENDPOINT}/${documentId}`, {
    method: 'PUT',
    body: { data },
  });

  return extractAddresses(res);
};

export const deleteUserAddress = async (
  documentId: string
): Promise<UserAddress[]> => {
  const res = await fetchAPI<AddressResponse>(`${ENDPOINT}/${documentId}`, {
    method: 'DELETE',
  });

  return extractAddresses(res);
};

export const setDefaultUserAddress = async (
  documentId: string
): Promise<UserAddress[]> => {
  const res = await fetchAPI<AddressResponse>(
    `${ENDPOINT}/${documentId}/set-default`,
    {
      method: 'POST',
      body: {},
    }
  );

  return extractAddresses(res);
};
