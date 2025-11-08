"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function signInAction(_prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await auth.api.signInEmail({
      body: { email, password },
    });
    redirect("/dashboard");
  } catch {
    return {
      error: "Invalid email or password",
      values: {
        email: email ?? "",
        password: password ?? "",
      },
    };
  }
}
