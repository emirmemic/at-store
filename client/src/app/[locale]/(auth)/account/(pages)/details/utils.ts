import { AccountDetails } from '@/lib/types';
interface InputField {
  name: string;
  type: string;
  id: string;
  required?: boolean;
  disabled?: boolean;
}

export const getInputFields = (
  accountDetails?: AccountDetails
): InputField[] => {
  const userType = accountDetails?.role?.type || 'authenticated';
  const provider = accountDetails?.provider || 'local';

  const commonFields = [
    {
      name: 'name',
      type: 'text',
      id: 'name',
      required: true,
    },
    {
      name: 'surname',
      type: 'text',
      id: 'surname',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      id: 'password',
      disabled: provider !== 'local',
    },
    {
      name: 'confirmPassword',
      type: 'password',
      id: 'confirmPassword',
      disabled: provider !== 'local',
    },
    {
      name: 'address',
      type: 'text',
      id: 'address',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      id: 'phoneNumber',
      required: true,
    },
  ];

  const orgFields = [
    {
      name: 'companyName',
      type: 'text',
      id: 'companyName',
      required: true,
    },
    {
      name: 'companyIdNumber',
      type: 'number',
      id: 'companyIdNumber',
      required: true,
    },
  ];

  const inputFields =
    userType === 'organization'
      ? [...commonFields, ...orgFields]
      : commonFields;
  return inputFields;
};
