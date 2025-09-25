"use server";

import { auth } from "@/lib/auth";

export const signIn = async (_prevState: unknown, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await auth.api.signInEmail({ body: { email, password } });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Unable to login" };
  }
};
