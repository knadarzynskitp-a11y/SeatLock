export interface User {
    id: number,
    name: string,
    surname: string,
    email: string,
    passwordHash: string,
    role: string,
    created_at: Date
}