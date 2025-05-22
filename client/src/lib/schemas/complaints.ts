import { z } from 'zod';

import { LocalizationKey } from '../types';

import { phoneNumberSchema } from './common';

export const FileImageSchema = (t: LocalizationKey) => {
  const singleImage = z
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

  return z.object({
    billImage: singleImage,
    deviceImage: singleImage,
    warrantyImage: singleImage,
  });
};
export const complaintsSchema = (t: LocalizationKey) =>
  z
    .object({
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
      email: z
        .string()
        .min(1, t('emailRequired'))
        .email(t('invalidEmailFormat')),
      message: z
        .string()
        .nonempty(t('messageRequired'))
        .min(20, t('messageMinLength', { minLength: '20' }))
        .max(500, t('messageMaxLength', { maxLength: '500' })),
    })
    .merge(FileImageSchema(t));
export type ComplaintsFormData = z.infer<ReturnType<typeof complaintsSchema>>;
export default complaintsSchema;
