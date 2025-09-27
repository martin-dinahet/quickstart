"use server";

import { loginSchema } from "@/lib/definitions/auth";
import { SignInFormState } from "@/lib/definitions/form-states";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const signIn = async (prevState: SignInFormState, formData: FormData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const emailString = typeof email === "string" ? email : "";
  const passwordString = typeof password === "string" ? password : "";
  const parsed = loginSchema.safeParse({ email: emailString, password: passwordString });
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
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });
    if (!existingUser) throw new Error();
    await createSession(existingUser.id);
    redirect("/dashboard");
  } catch (error) {
    return {
      success: false,
      form: {
        ...prevState?.form,
        email: emailString,
        password: passwordString,
      },
      errors: { email: ["Invalid email or password"] },
    };
  }
};
