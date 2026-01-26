import { z } from "zod/v4";

export const CreateUserRequestSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string().nullable(),
});

export const CreateUserResponseSchema = z.null();

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;
