import { cuid, z } from 'zod/v4';
import { ExamStatus } from '.';

export const ListExamsRequestSchema = z.object({
    status: z.enum(['AwaitingPickup', 'Delivered', 'Pending,', 'Ready'] as ExamStatus[]),
});

export const ListExamsResponseSchema = z.object({
    exams: z.array(
        z.object({
            id: cuid(),
            description: z.string(),
            createdAt: z.date(),
            patient: z.object({
                name: z.string(),
            }),
        })
    ),
});

export type ListExamsResponse = z.infer<typeof ListExamsResponseSchema>;
