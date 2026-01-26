import { z } from 'zod/v4';

export const RemovePatientRequestSchema = z.object({
    patientId: z.cuid(),
});

export const RemovePatientResponseSchema = z.null();

export type RemovePatientRequest = z.infer<typeof RemovePatientRequestSchema>;
export type RemoveUserResponse = z.infer<typeof RemovePatientResponseSchema>;
