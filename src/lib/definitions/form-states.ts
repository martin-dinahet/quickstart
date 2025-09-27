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

export type SignUpFormState = {
  success?: boolean;
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
  form?: {
    username?: string;
    email?: string;
    password?: string;
  };
};
