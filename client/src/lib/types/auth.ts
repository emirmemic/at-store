import { ProductBase } from './product';

interface AuthError {
  message: string;
  field?: string;
}

interface AccountDetails {
  name?: string;
  surname?: string;
  email: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  initials?: string;
}

interface UserInformation {
  id: number;
  documentId: string;
  accountDetails: AccountDetails;
  favoriteProducts: ProductBase[];
}

interface UserInformationResponse extends AccountDetails {
  id: number;
  documentId: string;
}

interface AuthResponse {
  jwt: string;
  user: UserInformationResponse;
}

type OAuthProvider = 'google' | 'facebook' | 'apple';

export type {
  AuthError,
  AuthResponse,
  OAuthProvider,
  UserInformation,
  UserInformationResponse,
};
