import {
  NewsletterFormData,
  createNewsletterSchema,
} from '@/lib/schemas/newsletter';

import { LocalizationKey } from '@/lib/types';
import { STRAPI_BASE_URL } from '@/lib/constants';
import { ZodError } from 'zod';
import { fetchAPI } from '@/lib/fetch-api';

interface SubscribeResponse {
  data: {
    name: string;
    email: string;
    subscribedAt: string;
    unsubscribedAt: string | null;
  };
}

const subscribe = async ({ name, email }: NewsletterFormData) => {
  const url = `${STRAPI_BASE_URL}/api/newsletter/subscribe`;

  const res = await fetchAPI<SubscribeResponse>(url, {
    method: 'POST',
    body: { name, email },
    isAuth: false,
  });

  if (res.error) throw new Error(res.error.message);
  if (res.data) {
    return res.data;
  }
  return null;
};

export async function handleSubmit(
  _prevState: unknown,
  formData: FormData,
  t: LocalizationKey
) {
  const data = Object.fromEntries(formData) as NewsletterFormData;

  try {
    const newsletterData = createNewsletterSchema(t).parse(data);
    const response = await subscribe(newsletterData);
    return {
      data: response?.data,
      errors: null,
      apiError: null,
    };
  } catch (err) {
    return err instanceof ZodError
      ? {
          data,
          errors: Object.fromEntries(
            [...err.errors]
              .reverse()
              .map(({ path, message }) => [path[0], message])
          ) as NewsletterFormData,
        }
      : {
          data,
          apiError: (err as Error).message,
        };
  }
}
