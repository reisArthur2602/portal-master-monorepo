import { z } from 'zod/v4';

export const CreateExamRequestSchema = z.object({
    description: z.string(),
    performedBy: z.string(),
    notes: z.string(),
    patientId: z.cuid(),
});

export const CreateExamResponseSchema = z.null();

export type CreateExamRequest = z.infer<typeof CreateExamRequestSchema>;

export type CreateExamResponse = z.infer<typeof CreateExamResponseSchema>;
