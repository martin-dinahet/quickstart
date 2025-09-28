"use client";

import type { FC } from "react";
import { useActionState } from "react";
import { signUp } from "@/lib/actions/auth/sign-up";

const SignUpPage: FC = () => {
  const [data, action, pending] = useActionState(signUp, {
    success: false,
    errors: {},
    form: { email: "", password: "", username: "" },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <form action={action}>
        {/* Sign in form */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Sign Up</legend>
          {/* Username field */}
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            defaultValue={data?.form.username}
            className="input"
            placeholder="Username"
          />
          {data?.errors.username && <p className="text-error">{data.errors.username}</p>}
          {/* Email field */}
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={data?.form.email}
            className="input"
            placeholder="john.doe@mail.com"
          />
          {data?.errors.email && <p className="text-error">{data.errors.email}</p>}
          {/* Password field */}
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={data?.form.password}
            className="input"
            placeholder="Password"
          />
          {data?.errors.password && <p className="text-error">{data.errors.password}</p>}
          {/* Submit button */}
          <button type="submit" disabled={pending} className="btn btn-neutral mt-4">
            {pending ? <span className="loading loading-dots" /> : "Sign In"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;
