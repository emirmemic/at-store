import { z } from 'zod';

import { LocalizationKey } from '../types';

const booleanFromForm = z
  .union([z.literal('on'), z.literal('true'), z.literal('false'), z.boolean()])
  .optional()
  .transform((value) => value === 'on' || value === 'true' || value === true);

export const createAddressSchema = (t: LocalizationKey) =>
  z.object({
    label: z
      .string()
      .trim()
      .min(1, t('addressLabelRequired'))
      .max(50, t('addressLabelMaxLength', { maxLength: '50' })),
    address: z
      .string()
      .trim()
      .min(1, t('addressRequired'))
      .max(255, t('addressMaxLength', { maxLength: '255' })),
    city: z
      .string()
      .trim()
      .max(100, t('cityMaxLength', { maxLength: '100' }))
      .optional()
      .or(z.literal('')),
    postalCode: z
      .string()
      .trim()
      .max(20, t('postalCodeMaxLength', { maxLength: '20' }))
      .optional()
      .or(z.literal('')),
    country: z
      .string()
      .trim()
      .max(100, t('countryMaxLength', { maxLength: '100' }))
      .optional()
      .or(z.literal('')),
    isDefault: booleanFromForm,
  });

type AddressFormData = z.infer<ReturnType<typeof createAddressSchema>>;

export type { AddressFormData };
