import { z } from 'zod';

import { LocalizationKey, UserType } from '../types';

import {
  createContactInfoSchema,
  createPersonalInfoSchema,
  emailSchema,
  nameAndSurnameSchema,
} from './common';

// Base schemas
const passwordSchema = (t: LocalizationKey) =>
  z
    .string()
    .trim()
    .min(8, t('passwordMinLength', { minLength: '8' }))
    .max(50, t('passwordMaxLength', { maxLength: '50' }))
    .regex(/[A-Z]/, t('passwordUppercase'))
    .regex(/[a-z]/, t('passwordLowercase'))
    .regex(/[0-9]/, t('passwordNumber'));

const createCompanyInfoSchema = (t: LocalizationKey) =>
  z.object({
    companyName: z.string().trim().min(1, t('companyNameRequired')),
    companyIdNumber: z
      .string()
      .trim()
      .nonempty(t('companyIdNumberRequired'))
      .length(13, t('companyIdNumberLength', { length: 13 })),
  });

const createRegisterAddressSchema = (t: LocalizationKey) =>
  z.object({
    addressLabel: z
      .string()
      .trim()
      .max(50, t('addressLabelMaxLength', { maxLength: '50' }))
      .optional()
      .or(z.literal('')),
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
  });

// Main schemas using composition
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

const createRegisterSchema = (t: LocalizationKey) =>
  createLoginSchema(t)
    .merge(createPersonalInfoSchema(t))
    .merge(createContactInfoSchema(t))
    .merge(createRegisterAddressSchema(t))
    .extend({
      confirmPassword: z.string().min(1, t('confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordMatch'),
      path: ['confirmPassword'],
    });

const createRegisterOrgSchema = (t: LocalizationKey) =>
  createLoginSchema(t)
    .merge(createCompanyInfoSchema(t))
    .merge(createContactInfoSchema(t))
    .merge(createRegisterAddressSchema(t))
    .extend({
      nameAndSurname: nameAndSurnameSchema(t),
      role: z.enum(['organization']),
      confirmPassword: z.string().min(1, t('confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordMatch'),
      path: ['confirmPassword'],
    });

const createAccountDetailsSchema = (t: LocalizationKey, userType: UserType) =>
  z
    .object({
      password: z
        .string()
        .trim()
        .optional()
        .refine(
          (password) => {
            if (!password) return true;
            return (
              password.length >= 8 &&
              password.length <= 50 &&
              /[A-Z]/.test(password) &&
              /[a-z]/.test(password) &&
              /[0-9]/.test(password)
            );
          },
          (password) => ({
            message:
              password && password.length < 8
                ? t('passwordMinLength', { minLength: '8' })
                : password && password.length > 50
                  ? t('passwordMaxLength', { maxLength: '50' })
                  : !password?.match(/[A-Z]/)
                    ? t('passwordUppercase')
                    : !password?.match(/[a-z]/)
                      ? t('passwordLowercase')
                      : t('passwordNumber'),
          })
        ),
      confirmPassword: z.string().trim().optional(),
    })
    .merge(
      userType === 'organization'
        ? createCompanyInfoSchema(t)
        : createPersonalInfoSchema(t)
    )
    .merge(createContactInfoSchema(t))
    .refine(
      (data) => {
        if (!data.password && !data.confirmPassword) return true;
        return data.password === data.confirmPassword;
      },
      {
        message: t('passwordMatch'),
        path: ['confirmPassword'],
      }
    );

type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
type RegisterOrgFormData = z.infer<ReturnType<typeof createRegisterOrgSchema>>;
type ForgotPasswordFormData = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;
type ResetPasswordFormData = z.infer<
  ReturnType<typeof createResetPasswordSchema>
>;
type AccountDetailsFormData = z.infer<
  ReturnType<typeof createAccountDetailsSchema>
>;

export {
  createAccountDetailsSchema,
  createForgotPasswordSchema,
  createLoginSchema,
  createRegisterOrgSchema,
  createRegisterSchema,
  createResetPasswordSchema,
};
export type {
  AccountDetailsFormData,
  ForgotPasswordFormData,
  LoginFormData,
  RegisterFormData,
  RegisterOrgFormData,
  ResetPasswordFormData,
};
