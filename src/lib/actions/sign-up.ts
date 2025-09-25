"use server";

import { auth } from "@/lib/auth";

export const signUp = async (prevState: unknown, formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await auth.api.signUpEmail({ body: { name, email, password } });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Unable to sign up" };
  }
};
