import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Invalid email or password"),
  password: z.string("Invalid email or password"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
