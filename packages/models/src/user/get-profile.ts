import { z } from "zod/v4";

export const ProfileResponseSchema = z.object({
  user: z.object({
    id: z.string().cuid(),
    name: z.string().nullable(),
    email: z.string().email(),
  }),
});

export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
