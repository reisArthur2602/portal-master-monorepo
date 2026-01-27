import { cuid, z } from 'zod/v4';

export const getPatientRequestSchema = z.object({
    patientId: z.cuid(),
});

export const getPatientResponseSchema = z.object({
    patient: z.object({
        id: cuid(),
        name: z.string(),
        cpf: z.string(),
        phone: z.string(),
        birthDate: z.date(),
        createdAt: z.date(),
    }),
});

export type GetPatientResponse = z.infer<typeof getPatientResponseSchema>;
export type GetPatientRequest = z.infer<typeof getPatientRequestSchema>;
