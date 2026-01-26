import { z } from "zod/v4";
import { UserRole } from ".";

export const ListUsersResponseSchema = z.object({
  users: z.array(
    z.object({
      id: z.cuid(),
      email: z.string().email("Formato de email inválido"),
      name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
      role: z.enum(["ADMIN", "MEMBER"] as UserRole[]),
      createdAt: z.date(),
    }),
  ),
});

export type ListUsersResponse = z.infer<typeof ListUsersResponseSchema>;
