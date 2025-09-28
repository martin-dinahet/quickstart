"use server";

import { redirect } from "next/navigation";
import type { SignInFormState } from "@/lib/definitions/form-states";
import { signInSchema } from "@/lib/definitions/sign-in";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export const signIn = async (prevState: SignInFormState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const emailString = typeof email === "string" ? email : "";
  const passwordString = typeof password === "string" ? password : "";
  const parsed = signInSchema.safeParse({
    email: emailString,
    password: passwordString,
  });
  if (!parsed.success) {
    return {
      success: false,
      form: { ...prevState?.form, email: emailString, password: passwordString },
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (!existingUser) {
    return {
      success: false,
      form: { ...prevState?.form, email: emailString, password: passwordString },
      errors: { email: ["User not found"] },
    };
  }
  if (existingUser.password !== parsed.data.password) {
    return {
      success: false,
      form: { ...prevState?.form, email: emailString, password: passwordString },
      errors: { password: ["Incorrect email or password"] },
    };
  }
  await createSession(existingUser.id);
  redirect("/dashboard");
};
