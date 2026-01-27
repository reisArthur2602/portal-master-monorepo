import { cuid, z } from 'zod/v4';

export const ListPatientsResponseSchema = z.object({
    patients: z.array(
        z.object({
            id: cuid(),
            name: z.string(),
            cpf: z.string(),
            phone: z.string(),
        })
    ),
});

export type ListPatientsResponse = z.infer<typeof ListPatientsResponseSchema>;
