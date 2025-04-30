import { z } from 'zod';

// TODO FIX VALIDATION FOR FILES
import { LocalizationKey } from '../types';

import { phoneNumberSchema } from './common';

const complaintsSchema = (t: LocalizationKey) =>
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
    message: z
      .string()
      .nonempty(t('messageRequired'))
      .min(20, t('messageMinLength', { minLength: '20' }))
      .max(500, t('messageMaxLength', { maxLength: '500' })),
    deviceImage: z
      .custom<File>((file) => file instanceof File, {
        message: 'Not a valid file',
      })
      .refine((file) => /\.(jpeg|png)$/i.test(file.name), {
        message: 'Only .jpeg or .png files are allowed',
      }),
    warrantyImage: z
      .custom<File>((file) => file instanceof File, {
        message: 'Not a valid file',
      })
      .refine((file) => /\.(jpeg|png)$/i.test(file.name), {
        message: 'Only .jpeg or .png files are allowed',
      }),
    billImage: z
      .custom<File>((file) => file instanceof File, {
        message: 'Not a valid file',
      })
      .refine((file) => /\.(jpeg|png)$/i.test(file.name), {
        message: 'Only .jpeg or .png files are allowed',
      }),
  });
export type ComplaintsFormData = z.infer<ReturnType<typeof complaintsSchema>>;
export default complaintsSchema;
