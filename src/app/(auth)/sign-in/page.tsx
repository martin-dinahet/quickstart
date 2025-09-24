"use client";

import type { FC } from "react";
import { useActionState } from "react";
import { signIn } from "@/lib/actions/sign-in";

const SignInPage: FC = () => {
  const [state, action, pending] = useActionState(signIn, undefined);

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <form action={action} className="card w-full max-w-sm shadow-xl bg-base-100 p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        {state?.error && (
          <div role="alert" className="alert alert-error">
            <span>{state.error}</span>
          </div>
        )}
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@mail.com"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            className="input input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
