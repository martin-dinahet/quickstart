"use client";

import { useActionState } from "react";
import { signInAction } from "@/lib/actions/auth/sign-in-action";

export function SignInForm() {
  const [state, action, pending] = useActionState(signInAction, null);

  return (
    <form action={action}>
      {/* Sign in form */}
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Sign In</legend>
        {/* Error display */}
        {state?.error && <span className="text-error">{state.error}</span>}
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
          defaultValue={state?.values?.email ?? ""}
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
          defaultValue={state?.values.password ?? ""}
        />
        {/* Submit button */}
        <button type="submit" disabled={pending} className="btn btn-neutral mt-4">
          {pending ? <span className="loading loading-spinner" /> : "Sign In"}
        </button>
      </fieldset>
    </form>
  );
}
