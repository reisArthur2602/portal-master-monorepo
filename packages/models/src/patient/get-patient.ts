import { cuid, z } from 'zod/v4';

export const GetPatientRequestSchema = z.object({
    patientId: z.cuid(),
});

export const GetPatientResponseSchema = z.object({
    patient: z.object({
        id: cuid(),
        name: z.string(),
        cpf: z.string(),
        phone: z.string(),
        birthDate: z.date(),
        createdAt: z.date(),
    }),
});

export type GetPatientResponse = z.infer<typeof GetPatientResponseSchema>;
export type GetPatientRequest = z.infer<typeof GetPatientRequestSchema>;
