import { z } from 'zod/v4';

export const CreatePatientRequestSchema = z.object({
    name: z.string(),
    cpf: z.string().transform((value) => value.replace(/\D/g, '')),
    phone: z.string().transform((value) => value.replace(/\D/g, '')),
    birthDate: z.coerce.date(),
});

export const CreatePatientResponseSchema = z.null();

export type CreatePatientResponse = z.infer<typeof CreatePatientResponseSchema>;
export type CreatePatientResquest = z.infer<typeof CreatePatientRequestSchema>;
