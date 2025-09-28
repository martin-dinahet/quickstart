"use server";

import { redirect } from "next/navigation";
import { loginSchema } from "@/lib/definitions/auth";
import type { SignInFormState } from "@/lib/definitions/form-states";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export const signIn = async (prevState: SignInFormState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const emailString = typeof email === "string" ? email : "";
  const passwordString = typeof password === "string" ? password : "";
  const parsed = loginSchema.safeParse({
    email: emailString,
    password: passwordString,
  });
  if (!parsed.success) {
    return {
      success: false,
      form: {
        ...prevState?.form,
        email: emailString,
        password: passwordString,
      },
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (!existingUser) {
    return {
      success: false,
      form: {
        ...prevState?.form,
        email: emailString,
        password: passwordString,
      },
      errors: { email: ["User not found"] },
    };
  }
  if (existingUser.password !== parsed.data.password) {
    return {
      success: false,
      form: {
        ...prevState?.form,
        email: emailString,
        password: passwordString,
      },
      errors: { password: ["Incorrect email or password"] },
    };
  }
  await createSession(existingUser.id);
  redirect("/dashboard");
};
