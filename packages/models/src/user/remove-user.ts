import { z } from "zod/v4";

export const RemoveUserRequestSchema = z.object({
  userId: z.cuid(),
});

export const RemoveUserResponseSchema = z.null();

export type RemoveUserRequest = z.infer<typeof RemoveUserRequestSchema>;
export type RemoveUserResponse = z.infer<typeof RemoveUserResponseSchema>;
