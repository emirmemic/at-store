import { z } from 'zod';

import { LocalizationKey } from '../types';

export const phoneNumberSchema = (t: LocalizationKey) =>
  z
    .string()
    .nonempty(t('phoneNumberRequired'))
    .min(8, t('phoneNumberMinLength', { minLength: '8' }))
    .max(20, t('phoneNumberMaxLength', { maxLength: '20' }))
    .regex(/^(\+387|00387|0)?[0-9\s\-\/]+$/, t('phoneNumberInvalidFormat'));

export const emailSchema = (t: LocalizationKey) =>
  z.string().min(1, t('emailRequired')).email(t('invalidEmailFormat'));

export const nameAndSurnameSchema = (t: LocalizationKey) =>
  z
    .string()
    .trim()
    .min(1, t('nameAndSurnameRequired'))
    .regex(/^[\p{L} .'\-]+$/u, t('nameAndSurnameFormat'))
    .refine(
      (val) => {
        const parts = val.trim().split(/\s+/);
        return parts.length >= 2;
      },
      { message: t('nameAndSurnameFormat') }
    );

export const createPersonalInfoSchema = (t: LocalizationKey) =>
  z.object({
    name: z.string().trim().min(1, t('nameRequired')),
    surname: z.string().trim().min(1, t('surnameRequired')),
  });

export const createContactInfoSchema = (t: LocalizationKey) =>
  z.object({
    address: z.string().trim().optional(),
    phoneNumber: phoneNumberSchema(t),
  });
