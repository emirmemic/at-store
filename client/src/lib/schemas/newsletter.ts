import { z } from 'zod';

import { LocalizationKey } from '../types';

const createNewsletterSchema = (t: LocalizationKey) =>
  z.object({
    name: z.string().min(1, t('nameRequired')),
    email: z.string().min(1, t('emailRequired')).email(t('invalidEmailFormat')),
  });

type NewsletterFormData = z.infer<ReturnType<typeof createNewsletterSchema>>;

export { createNewsletterSchema };
export type { NewsletterFormData };
