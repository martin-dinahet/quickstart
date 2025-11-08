"use client";

import { useActionState } from "react";
import { signUpAction } from "@/lib/actions/auth/sign-up-action";

export function SignUpForm() {
  const [state, action, pending] = useActionState(signUpAction, null);

  return (
    <form action={action}>
      {/* Sign in form */}
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Sign Up</legend>
        {/* Error display */}
        {state?.error && <span className="text-error">{state.error}</span>}
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
        <button type="submit" disabled={pending} className="btn btn-neutral mt-4">
          {pending ? <span className="loading loading-spinner" /> : "Sign Up"}
        </button>
      </fieldset>
    </form>
  );
}
