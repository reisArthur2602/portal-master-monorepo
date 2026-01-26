export * from './create-patient.js';
export * from './list-patients.js';
export * from './remove-patients.js';

export type Patient = {
    id: string;
    name: string;
    cpf: string;
    phone: string;
    birthDate: string;
    createdAt: string;
};
