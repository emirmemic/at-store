import { z } from 'zod';

import { LocalizationKey } from '../types';

import { phoneNumberSchema } from './common';
export const FileImageSchema = (t: LocalizationKey) => {
  const indexPhotoSchema = z
    .instanceof(File)
    .refine((f) => ['image/png', 'image/jpeg'].includes(f.type), {
      message: t('invalidFileFormat'),
    })
    .refine(
      (file) => {
        if (file === null) return true;
        return file.size <= 5 * 1024 * 1024;
      },
      { message: t('maxFileSize', { maxSize: '5 MB' }) }
    );
  return indexPhotoSchema;
};

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
    indexPhoto: FileImageSchema(t),
  });

export type EducationalDiscountSchema = z.infer<
  ReturnType<typeof educationalDiscountSchema>
>;
export default educationalDiscountSchema;
