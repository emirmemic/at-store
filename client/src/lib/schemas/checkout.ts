import { z } from 'zod';

import { LocalizationKey } from '../types';

import {
  createPersonalInfoSchema,
  emailSchema,
  phoneNumberSchema,
} from './common';

export const deliverySchema = (t: LocalizationKey) =>
  z
    .object({
      email: emailSchema(t),
      city: z.string().trim().nonempty(t('cityRequired')),
      postalCode: z
        .string()
        .trim()
        .nonempty(t('postalCodeRequired'))
        .regex(/^[0-9]+$/, t('postalCodeInvalidFormat')),
      country: z.string().trim().nonempty(t('countryRequired')),
      note: z
        .string()
        .trim()
        .max(150, t('nameMaxLength', { maxLength: '150' }))
        .optional(),
      address: z.string().trim().nonempty(t('addressRequired')),
      phoneNumber: phoneNumberSchema(t),
    })
    .merge(createPersonalInfoSchema(t));

export type DeliveryForm = z.infer<ReturnType<typeof deliverySchema>>;
