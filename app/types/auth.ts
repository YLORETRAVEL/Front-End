export type AuthFormType =
  | "signin"
  | "signup"
  | "forgot-password"
  | "reset-password"
  | "verify-email";


export interface AuthFormProps {
  type: AuthFormType;
}


export interface UserProfile {
  displayName: string;
  username: string;
  email: string;
  address: string;
  location: string;
  photoURL: string;
}