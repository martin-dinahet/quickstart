"use server";

import { redirect } from "next/navigation";
import type { SignUpFormState } from "@/lib/definitions/form-states";
import { signUpSchema } from "@/lib/definitions/sign-up";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";

export const signUp = async (prevState: SignUpFormState, formData: FormData) => {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const usernameString = typeof username === "string" ? username : "";
  const emailString = typeof email === "string" ? email : "";
  const passwordString = typeof password === "string" ? password : "";
  const parsed = signUpSchema.safeParse({
    username: usernameString,
    email: emailString,
    password: passwordString,
  });
  if (!parsed.success) {
    return {
      success: false,
      form: {
        ...prevState?.form,
        username: usernameString,
        email: emailString,
        password: passwordString,
      },
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existingUser) {
    return {
      success: false,
      form: {
        ...prevState?.form,
        username: usernameString,
        email: emailString,
        password: passwordString,
      },
      errors: { email: ["Email already in use"] },
    };
  }
  const newUser = await prisma.user.create({
    data: {
      username: parsed.data.username,
      email: parsed.data.email,
      password: parsed.data.password,
    },
  });
  await createSession(newUser.id);
  redirect("/dashboard");
};
