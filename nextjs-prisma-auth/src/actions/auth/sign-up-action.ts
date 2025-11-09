"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function signUpAction(_prevState: unknown, formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("Sign up action called with:", { username, email, password });

  await auth.api.signUpEmail({
    body: {
      name: username,
      email: email,
      password: password,
    },
  });

  redirect("/dashboard");
}
