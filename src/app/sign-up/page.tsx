import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signUpAction } from "@/actions/auth/sign-up-action";
import { auth } from "@/lib/auth";

export default async function SignUpPage() {
  // Redirect to dashboard if already signed in
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) return redirect("/dashboard");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <form action={signUpAction}>
        {/* Sign in form */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Sign Up</legend>
          {/* Username field */}
          <label className="label" htmlFor="name">
            Username
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input"
            placeholder="John Doe"
            required
          />
          {/* Email field */}
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input"
            placeholder="john.doe@mail.com"
            required
          />
          {/* Password field */}
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input"
            placeholder="●●●●●●●●"
            required
          />
          {/* Submit button */}
          <button type="submit" className="btn btn-neutral mt-4">
            Sign In
          </button>
        </fieldset>
      </form>
    </div>
  );
}
