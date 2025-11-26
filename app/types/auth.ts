export type AuthFormType =
  | "signin"
  | "signup"
  | "forgot-password"
  | "reset-password"
  | "verify-email";


export interface AuthFormProps {
  type: AuthFormType;
}
