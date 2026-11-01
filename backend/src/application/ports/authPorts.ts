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

export interface IemailVerificationRepository
{
    createEmailVerificatonData(name: string, surname: string, email: string, password: string, code: string, expires_at: Date): Promise<void>;
    deleteEmailVerificationData(email: string): Promise<void>
}



//---------------------------------------------------------------------------------------------------------------------------------------



export interface IpasswordHasher
{
    compare(password: string, hashedPassword: string): Promise<boolean>;
    hash(password: string): Promise<string>
}


export interface Icrypto
{
    randomInt(number1: number, number2: number): Promise<string>;
}

export interface IemailSend
{
    sendMail(email: string, code: string): Promise<void>;
}

//-----------------------------tokens------------------------------------------------------------------

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