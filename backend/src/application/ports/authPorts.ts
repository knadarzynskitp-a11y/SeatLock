import type {User} from '../../domain/entities/User.js'

export interface IuserRepository
{
    findByEmail(email: string): Promise<User | null>;
    findById(user_id: number): Promise<User | null>;
}

export interface IrefreshTokensRepository
{
    createRefreshToken(hashedRefreshToken: string, expires_at: Date, user_id: number): Promise<void>;
}

export interface IpasswordHasher
{
    compare(password: string, hashedPassword: string): Promise<boolean>;
}

export interface TokenPayload
{
    user_id: number,
    role: string
}

export interface TokenPair
{
    accessToken: string,
    refreshToken: string,
    hashedRefreshToken: string,
    expires_at: Date
}

export interface ItokenGeneration
{
    generateTokens(payload: TokenPayload): Promise<TokenPair>;
}