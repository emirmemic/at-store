import { StrapiProduct } from '../src/api/product/types';

export interface StrapiUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  name: string;
  surname: string;
  address: string;
  addresses?: UserAddress[];
  companyName: string;
  companyIdNumber: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  confirmedByAdmin: boolean;
  role?: {
    id: number;
    documentId: string;
    name: string;
    description: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface UserAddress {
  id: number;
  documentId: string;
  label: string;
  address: string;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}
