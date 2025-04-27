import { z } from 'zod';

import { LocalizationKey } from '../types';

export const phoneNumberSchema = (t: LocalizationKey) =>
  z
    .string()
    .nonempty(t('phoneNumberRequired'))
    .min(8, t('phoneNumberMinLength', { minLength: '8' }))
    .max(12, t('phoneNumberMaxLength', { maxLength: '12' }))
    .regex(/^[0-9]+$/, t('phoneNumberInvalidFormat'));

export const emailSchema = (t: LocalizationKey) =>
  z.string().min(1, t('emailRequired')).email(t('invalidEmailFormat'));

export const nameAndSurnameSchema = (t: LocalizationKey) =>
  z
    .string()
    .trim()
    .min(1, t('nameAndSurnameRequired'))
    .regex(/^[A-Za-z]+\s+[A-Za-z]+$/, t('nameAndSurnameFormat'))
    .refine(
      (val) => {
        const parts = val.split(' ');
        return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
      },
      { message: t('nameAndSurnameFormat') }
    );
