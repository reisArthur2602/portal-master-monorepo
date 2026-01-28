import { cuid, z } from 'zod/v4';
import { ExamStatus, ExamType } from '.';

export const GetExamRequestSchema = z.object({
    examId: z.cuid(),
});

export const GetExamResponseSchema = z.object({
    exam: z.object({
        id: cuid(),
        description: z.string(),
        createdAt: z.date(),
        patient: z.object({
            name: z.string(),
            birthDate: z.date(),
        }),
        registry: z.number().nullable(),
        performedBy: z.string(),
        notes: z.string().nullable(),
        status: z.enum(['AwaitingPickup', 'Delivered', 'Pending', 'Ready'] as ExamStatus[]),
        type: z.enum(['DICOM', 'External'] as ExamType[]),
        orthancStudyId: z.string().nullable(),
    }),
});

export type GetExamResponse = z.infer<typeof GetExamRequestSchema>;
export type GetExamRequest = z.infer<typeof GetExamResponseSchema>;
