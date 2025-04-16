import { z } from 'zod';

//TODO Finish Validation Errors and add translations ot bs.json
const complaintsSchema = z.object({
  name: z
    .string()
    .min(3, 'Name is required')
    .max(50, 'Name must at less than 50 characters '),
  surname: z
    .string()
    .min(3, 'Surname is required')
    .max(50, 'name must be less than 50 characters'),
  phoneNumber: z
    .string()
    .min(8, 'Number must be at least 8 digits')
    .max(12, 'Number must be less than 12 digits')
    .regex(/^[0-9]+$/, 'Must be valid phone format'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
  deviceImage: z.union([
    z.instanceof(File).refine((file) => /\.(jpeg|png)$/i.test(file.name), {
      message: 'Only .jpeg or .png files are allowed',
    }),
    z.null(),
    z.undefined(),
  ]),
  warrantyImage: z
    .custom<File>((file) => file instanceof File, {
      message: 'Not a valid file',
    })
    .refine((file) => /\.(jpeg|png)$/i.test(file.name), {
      message: 'Only .svg or .png files are allowed',
    }),
  billImage: z
    .custom<File>((file) => file instanceof File, {
      message: 'Not a valid file',
    })
    .refine((file) => /\.(jpeg|png)$/i.test(file.name), {
      message: 'Only .svg or .png files are allowed',
    }),
});
export type ComplaintsFormData = z.infer<typeof complaintsSchema>;
export default complaintsSchema;
