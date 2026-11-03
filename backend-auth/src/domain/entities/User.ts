export interface User {
    id: number,
    name: string,
    surname: string,
    email: string,
    password: string,
    role: string,
    created_at: Date
}

export type NewUser = Omit<User, "id" | "role" | "created_at">


export interface emailVerification
{
    id: number,
    name: string,
    surname: string,
    email: string,
    password: string,
    code: string,
    expires_at: Date,
    created_at: Date
}

export interface ResetPassword 
{
    id: number,
    user_id: number,
    resetToken: string,
    expires_at: Date,
    created_at: Date
}

export type newResetPassword = Omit<ResetPassword, "id" | "created_at">;

export interface refreshToken
{
    id: number,
    user_id: number,
    refreshToken: string,
    expires_at: Date,
    created_at: Date
}

export type newRefreshToken = Omit<refreshToken, "id" | "created_at">;