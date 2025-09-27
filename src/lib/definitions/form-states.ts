export type SignInFormState = {
  success?: boolean;
  errors?: {
    email?: string[];
    password?: string[];
  };
  form?: {
    email?: string;
    password?: string;
  };
};
