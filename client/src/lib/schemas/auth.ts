import { z } from 'zod';

import { LocalizationKey } from '../types';

import { emailSchema, phoneNumberSchema } from './common';

const passwordSchema = (t: LocalizationKey) =>
  z
    .string()
    .min(8, t('passwordMinLength', { minLength: '8' }))
    .max(50, t('passwordMaxLength', { maxLength: '50' }))
    .regex(/[A-Z]/, t('passwordUppercase'))
    .regex(/[a-z]/, t('passwordLowercase'))
    .regex(/[0-9]/, t('passwordNumber'));

const createLoginSchema = (t: LocalizationKey) =>
  z.object({
    email: emailSchema(t),
    password: passwordSchema(t),
  });

const createForgotPasswordSchema = (t: LocalizationKey) =>
  z.object({
    email: emailSchema(t),
  });

const createResetPasswordSchema = (t: LocalizationKey) =>
  z
    .object({
      password: passwordSchema(t),
      passwordConfirmation: z.string().min(1, t('confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t('passwordMatch'),
      path: ['passwordConfirmation'],
    });

const createRegisterSchema = (t: LocalizationKey) => {
  const loginSchema = createLoginSchema(t);
  return loginSchema
    .extend({
      name: z.string().min(1, t('nameRequired')),
      surname: z.string().min(1, t('surnameRequired')),
      confirmPassword: z.string().min(1, t('confirmPasswordRequired')),
      address: z.string().min(1, t('addressRequired')),
      phoneNumber: phoneNumberSchema(t),
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
      phoneNumber: phoneNumberSchema(t),
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
type ForgotPasswordFormData = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;
type ResetPasswordFormData = z.infer<
  ReturnType<typeof createResetPasswordSchema>
>;

export {
  createLoginSchema,
  createRegisterOrgSchema,
  createRegisterSchema,
  createForgotPasswordSchema,
  createResetPasswordSchema,
};
export type {
  LoginFormData,
  RegisterFormData,
  RegisterOrgFormData,
  ForgotPasswordFormData,
  ResetPasswordFormData,
};
