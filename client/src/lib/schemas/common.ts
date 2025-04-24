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
