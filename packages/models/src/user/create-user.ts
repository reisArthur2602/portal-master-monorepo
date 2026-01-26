import { z } from "zod/v4";

export const CreateUserRequestSchema = z.object({
  email: z.string().email("Formato de email inválido"),
  name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
});

export const CreateUserResponseSchema = z.null();

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;
