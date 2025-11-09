"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function signInAction(_prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await auth.api.signInEmail({
    body: {
      email: email,
      password: password,
    },
  });

  redirect("/dashboard");
}
