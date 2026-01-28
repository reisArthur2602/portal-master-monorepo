export * from './create-user.js';
export * from './get-profile.js';
export * from './list-users.js';
export * from './remove-user.js';
export * from './sign-in.js';

export type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    role: UserRole;
};

export type UserRole = 'ADMIN' | 'MEMBER';
