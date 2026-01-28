export * from './create-exam.js';
export * from './update-exam-status.js';
export * from './list-exams.js';
export * from './get-exam.js';
import { Patient } from '../patient';

export type Exam = {
    id: string;
    status: ExamStatus;
    type: ExamType;
    registry: number;
    description: string;
    orthancStudyId?: string;
    performedBy: string;
    createdAt: string;
    notes?: string;
    patient: Patient;
};

export type ExamStatus = 'Pending' | 'Ready' | 'AwaitingPickup' | 'Delivered';
export type ExamType = 'External' | 'DICOM';
