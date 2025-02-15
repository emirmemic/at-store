interface AuthError {
  message: string;
  field?: string;
}

interface UserInformation {
  id: number;
  documentId: string;
  username: string;
  email: string;
}

interface UserInformationProps {
  user: UserInformation | null;
}

interface AuthResponse {
  jwt: string;
  user: UserInformation;
}

export type { AuthError, AuthResponse, UserInformation, UserInformationProps };
