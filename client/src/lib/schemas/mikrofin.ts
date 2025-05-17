import { z } from 'zod';

import { LocalizationKey } from '../types';

import { phoneNumberSchema } from './common';

const mikrofinSchema = (t: LocalizationKey) =>
  z.object({
    nameAndSurname: z.string().trim().min(3, t('nameAndSurnameRequired')),
    phoneNumber: phoneNumberSchema(t),
    email: z.string().min(1, t('emailRequired')).email(t('invalidEmailFormat')),
    productVariantId: z.string().trim().nonempty(t('productIdRequired')),
    note: z
      .string()
      .trim()
      .max(300, t('nameMaxLength', { maxLength: '300' }))
      .optional(),
  });
export type mikrofinFormData = z.infer<ReturnType<typeof mikrofinSchema>>;
export default mikrofinSchema;
