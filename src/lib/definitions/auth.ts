import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email or password"),
  password: z.string("Invalid email or password"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
