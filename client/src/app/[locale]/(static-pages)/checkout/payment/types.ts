type MonriError = {
  message: string;
};

type Result<PaymentResult> = {
  result: PaymentResult | null;
  error: MonriError | null;
};

type PaymentResult = {
  status: string; // approved or declined
  currency: string;
  amount: number; // amount in minor units, eg 10.24 USD is 1024
  order_number: string;
  pan_token: string | null; // pan token representing tokenized card
  created_at: string;
  transaction_type: string; // authorize or purchase, depending on trx type used in payment/new
  payment_method: SavedCardPaymentMethod | null; // available if card is tokenized for future payments, null if not
  errors: Array<string> | null; // errors if transaction is declined
  response_code?: string; // response code if transaction is declined
};

// TODO: Not being used currently, but in case we need to save card for future payments
type SavedCardPaymentMethod = {
  type: string;
  data: SavedCardPaymentMethodData;
};

// TODO: Not being used currently, but in case we need to save card for future payments
type SavedCardPaymentMethodData = {
  brand: string;
  issuer: string;
  masked: string;
  expiration_date: string;
  token: string;
};

export type {
  MonriError,
  Result,
  PaymentResult,
  SavedCardPaymentMethod,
  SavedCardPaymentMethodData,
};
