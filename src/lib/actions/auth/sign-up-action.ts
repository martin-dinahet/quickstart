"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function signUpAction(_currentState: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await auth.api.signUpEmail({
      body: { name, email, password },
    });
    redirect("/dashboard");
  } catch {
    return {
      error: "Sign up failed. Please try again.",
      values: {
        name: name ?? "",
        email: email ?? "",
        password: password ?? "",
      },
    };
  }
}
