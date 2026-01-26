import { z } from "zod/v4";

export const ProfileResponseSchema = z.object({
  user: z.object({
    id: z.cuid(),
    email: z.string().email("Formato de email inválido"),
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  }),
});

export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
