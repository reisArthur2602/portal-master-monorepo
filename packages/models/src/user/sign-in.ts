import { z } from "zod/v4";

export const SignInRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignInResponseSchema = z.object({
  user: z.object({
    name: z.string().nullable(),
    email: z.string().email(),
  }),
  accessToken: z.string(),
});

export type SignInRequest = z.infer<typeof SignInRequestSchema>;
export type SignInResponse = z.infer<typeof SignInResponseSchema>;
