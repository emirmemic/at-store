import { z } from 'zod';

import { LocalizationKey } from '../types';

import { nameAndSurnameSchema } from './common';

// Helper function to validate card number using Luhn algorithm
const validateLuhn = (cardNumber: string): boolean => {
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;

  // Loop from right to left
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validates if a card number matches known card number patterns for major card providers:
 * - Visa
 * - Visa Electron
 * - Mastercard
 * - Maestro
 */
const validateCardNumberPattern = (cardNumber: string): boolean => {
  const digitsOnly = cardNumber.replace(/\D/g, ''); // remove spaces, dashes, etc.
  const pattern =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|4026[0-9]{12}|417500[0-9]{10}|4508[0-9]{12}|4844[0-9]{12}|4913[0-9]{12}|4917[0-9]{12}|5[1-5][0-9]{14}|5018[0-9]{12}|5020[0-9]{12}|5038[0-9]{12}|6304[0-9]{12}|6759[0-9]{12}|6761[0-9]{12}|6763[0-9]{12})$/;
  return pattern.test(digitsOnly);
};

const paymentMethodSchema = (t: LocalizationKey) =>
  z.object({
    cardNumber: z
      .string()
      .trim()
      .nonempty(t('cardNumberRequired'))
      .refine(validateCardNumberPattern, {
        message: t('invalidCardNumber'),
      })
      .refine(validateLuhn, {
        message: t('invalidCardNumber'),
      }),
    // Make sure the expiration date is in the format MM/YY and is not in the past
    expirationDate: z
      .string()
      .trim()
      .nonempty(t('expirationDateRequired'))
      .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/, t('invalidExpirationDate'))
      .refine((date) => {
        const [month, year] = date.split('/').map(Number);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year
        return !(
          year < currentYear ||
          (year === currentYear && month < currentDate.getMonth() + 2)
        );
      }, t('invalidExpirationDate')),
    nameAndSurname: nameAndSurnameSchema(t),
  });
export type PaymentMethod = z.infer<ReturnType<typeof paymentMethodSchema>>;
export default paymentMethodSchema;
