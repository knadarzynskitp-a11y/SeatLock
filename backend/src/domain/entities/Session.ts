export interface Session
{
    id: number;
    user_id: number;
    hashedRefreshToken: string;
    created_at: Date;
    expires_at: Date;
}