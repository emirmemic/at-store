import { z } from 'zod';

import { LocalizationKey } from '../types';

import { phoneNumberSchema } from './common';

const educationalDiscountSchema = (t: LocalizationKey) =>
  z.object({
    name: z
      .string()
      .nonempty(t('nameRequired'))
      .min(3, t('nameMinLength', { minLength: '3' }))
      .max(50, t('nameMaxLength', { maxLength: '50' })),
    surname: z
      .string()
      .nonempty(t('surnameRequired'))
      .min(3, t('nameMinLength', { minLength: '3' }))
      .max(50, t('nameMaxLength', { maxLength: '50' })),
    phoneNumber: phoneNumberSchema(t),
    email: z.string().min(1, t('emailRequired')).email(t('invalidEmailFormat')),
  });
export type EducationalDiscountSchema = z.infer<
  ReturnType<typeof educationalDiscountSchema>
>;
export default educationalDiscountSchema;
