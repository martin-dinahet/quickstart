import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SignUpForm } from "@/components/sign-up-form";
import { auth } from "@/lib/auth";

export default async function SignUpPage() {
  // Redirect to dashboard if already signed in
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) return redirect("/dashboard");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <SignUpForm />
    </div>
  );
}
