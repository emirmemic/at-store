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

interface UserInformation {
  id: number;
  documentId: string;
  accountDetails: AccountDetails;
  favoriteProducts: ProductResponse[];
}

interface UserInformationResponse extends AccountDetails {
  id: number;
  documentId: string;
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
  UserInformation,
  UserInformationResponse,
  UserType,
  NewsletterResponse,
  AccountDetails,
};
