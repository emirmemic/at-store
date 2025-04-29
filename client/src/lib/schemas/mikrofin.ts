import { z } from 'zod';

import { LocalizationKey } from '../types';

import { nameAndSurnameSchema, phoneNumberSchema } from './common';

const mikrofinSchema = (t: LocalizationKey) =>
  z.object({
    nameAndSurname: nameAndSurnameSchema(t),
    phoneNumber: phoneNumberSchema(t),
    email: z.string().min(1, t('emailRequired')).email(t('invalidEmailFormat')),
    productLink: z.string().trim().nonempty(t('linkRequired')),
    note: z
      .string()
      .trim()
      .max(300, t('nameMaxLength', { maxLength: '300' }))
      .optional(),
  });
export type mikrofinFormData = z.infer<ReturnType<typeof mikrofinSchema>>;
export default mikrofinSchema;
