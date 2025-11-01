import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signInAction } from "@/lib/actions/auth/sign-in-action";
import { auth } from "@/lib/auth";

export default async function SignInPage() {
  // Redirect to dashboard if already signed in
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) return redirect("/dashboard");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <form action={signInAction}>
        {/* Sign in form */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Sign In</legend>
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
