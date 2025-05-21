import { UserInformation } from './auth';
import { ShoppingCartItem } from './product';

interface InvoiceData {
  organization: UserInformation | null;
  cart: ShoppingCartItem[];
  invoiceNumber: string;
  totalPrice: number;
}

interface UploadedFile {
  id: number;
  name: string;
  url: string;
}

interface InvoiceSuccessResponse {
  message: string;
  file: UploadedFile;
}
interface InvoiceErrorResponse {
  error: {
    status?: number;
    name?: string;
    message: string;
  };
}
type InvoiceGenerateResponse = InvoiceSuccessResponse | InvoiceErrorResponse;

interface CreateInvoiceResponse {
  id: number;
  invoiceNumber: string;
  invoiceStatus: string;
  pdfFile: UploadedFile;
  title: string;
  totalAmount: number;
}
export type {
  InvoiceData,
  InvoiceGenerateResponse,
  UploadedFile,
  CreateInvoiceResponse,
};
