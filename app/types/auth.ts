export type AuthFormType = 'signin' | 'signup' | 'forgot-password' | 'reset-password';

export interface AuthFormProps {
  type: AuthFormType;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  password: string;
  token?: string;
}
