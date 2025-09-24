"use server";

import { authServer } from "@/lib/auth/server";

export const signIn = async (_prevState: unknown, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  await authServer.api.signInEmail({ body: { email, password } });
  return { success: true };
};
