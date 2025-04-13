import { z } from 'zod';

import { LocalizationKey } from '../types';

const createLoginSchema = (t: LocalizationKey) =>
  z.object({
    email: z.string().min(1, t('emailRequired')).email(t('invalidEmailFormat')),
    password: z
      .string()
      .min(8, t('passwordMinLength'))
      .max(50, t('passwordMaxLength'))
      .regex(/[A-Z]/, t('passwordUppercase'))
      .regex(/[a-z]/, t('passwordLowercase'))
      .regex(/[0-9]/, t('passwordNumber')),
  });

const createRegisterSchema = (t: LocalizationKey) => {
  const loginSchema = createLoginSchema(t);
  return loginSchema
    .extend({
      name: z.string().min(1, t('nameRequired')),
      surname: z.string().min(1, t('surnameRequired')),
      confirmPassword: z.string().min(1, t('confirmPasswordRequired')),
      address: z.string().min(1, t('addressRequired')),
      phoneNumber: z
        .string()
        .min(8, t('phoneNumberRequired'))
        .max(12, t('phoneNumberMaxLength')),
      dateOfBirth: z
        .string()
        .regex(
          /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
          t('dateMustBeInFormatDDMMYYYY')
        )
        .refine(
          (date) => {
            const [day, month, year] = date.split('/');
            const formattedDate = new Date(`${year}-${month}-${day}`);
            return formattedDate <= new Date();
          },
          {
            message: t('dateOfBirthMustBeInThePast'),
          }
        ),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordMatch'),
      path: ['confirmPassword'],
    });
};

const createRegisterOrgSchema = (t: LocalizationKey) => {
  const loginSchema = createLoginSchema(t);
  return loginSchema
    .extend({
      nameAndSurname: z.string().min(1, t('nameAndSurnameRequired')),
      confirmPassword: z.string().min(1, t('confirmPasswordRequired')),
      address: z.string().min(1, t('addressRequired')),
      phoneNumber: z
        .string()
        .min(8, t('phoneNumberRequired'))
        .max(12, t('phoneNumberMaxLength')),
      companyName: z.string().min(1, t('companyNameRequired')),
      companyIdNumber: z.string().min(1, t('companyIdNumberRequired')),
      role: z.enum(['organization']),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordMatch'),
      path: ['confirmPassword'],
    });
};
type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
type RegisterOrgFormData = z.infer<ReturnType<typeof createRegisterOrgSchema>>;

export { createLoginSchema, createRegisterSchema, createRegisterOrgSchema };
export type { LoginFormData, RegisterFormData, RegisterOrgFormData };
