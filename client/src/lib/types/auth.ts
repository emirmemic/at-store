import { ProductResponse } from './product';

interface AuthError {
  message: string;
  field?: string;
}

interface AccountDetails {
  name?: string;
  surname?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  initials?: string;
  companyName?: string;
  companyIdNumber?: string;
  role?: RoleResponse;
  newsletter?: NewsletterResponse | null;
  provider: OAuthProvider;
}

interface UserAddress {
  id: number;
  documentId: string;
  label: string;
  address: string;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
  isDefault: boolean;
}

interface UserInformation {
  id: number;
  documentId: string;
  accountDetails: AccountDetails;
  addresses: UserAddress[];
  favoriteProducts: ProductResponse[];
}

interface UserInformationResponse extends AccountDetails {
  id: number;
  documentId: string;
  addresses?: UserAddress[];
}

interface AuthResponse {
  jwt: string;
  user: UserInformationResponse;
}

interface RoleResponse {
  id: string;
  documentId: string;
  name: string;
  type: UserType;
}
interface NewsletterResponse {
  id: number;
  documentId: string;
  name: string;
  email: string;
  subscribed: boolean;
  subscribedAt: string;
  unsubscribedAt: string | null;
}
type OAuthProvider = 'google' | 'facebook' | 'apple' | 'local';
type UserType = 'organization' | 'authenticated';

export type {
  AuthError,
  AuthResponse,
  OAuthProvider,
  UserAddress,
  UserInformation,
  UserInformationResponse,
  UserType,
  NewsletterResponse,
  AccountDetails,
};
