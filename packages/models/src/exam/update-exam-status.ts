import { z } from 'zod/v4';
import { ExamStatus } from '.';

export const UpdateExamStatusRequestSchema = z.object({
    examId: z.cuid(),
    status: z.enum(['AwaitingPickup', 'Delivered', 'Pending', 'Ready'] as ExamStatus[]),
});

export const UpdateExamStatusResponseSchema = z.null();

export type UpdateExamStatusRequest = z.infer<typeof UpdateExamStatusResponseSchema>;
export type UpdateExamStatusResponse = z.infer<typeof UpdateExamStatusRequestSchema>;
