import { z } from "zod/v4";

export const SignInRequestSchema = z.object({
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const SignInResponseSchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  accessToken: z.jwt(),
});

export type SignInRequest = z.infer<typeof SignInRequestSchema>;
export type SignInResponse = z.infer<typeof SignInResponseSchema>;
