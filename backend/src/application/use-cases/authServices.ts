import * as Error from '../errors/errors.js'
import validator from 'validator'
import * as Interfaces from '../ports/authPorts.js'

export async function loginService(email: string, password: string, userRepository: Interfaces.IuserRepository, passwordHasher: Interfaces.IpasswordHasher, generateTokens: Interfaces.ItokenGeneration, createRefreshToken: Interfaces.IrefreshTokensRepository)
{
    try
    {
        if(!email || !password)
        {
            throw new Error.ValidationError("Wprowadź dane");
        }

        email = email.trim();
        password = password.trim();

        if(!email || !password)
        {
            throw new Error.ValidationError("Wprowadź dane");
        }
        else if(email.length < 6 || email.length > 60)
        {
            throw new Error.ValidationError("Długość znaków adresu e-mail jest nieprawidłowa")
        }
        else if(!validator.isEmail(email))
        {
            throw new Error.ValidationError("Podany adres e-mail najprawdopodobniej nie jest adresem e-mail")
        }

        const user = await userRepository.findByEmail(email);

        if(!user)
        {
            throw new Error.ValidationError("Nieprawidłowy login lub hasło")
        }

        const match = await passwordHasher.compare(password, user.password)

        if(!match)
        {
            throw new Error.ValidationError("Nieprawidłowy login lub hasło")
        }
        const user_id = user.id
        const role = user.role

        const tokens = await generateTokens.generateTokens({user_id, role})


        await createRefreshToken.createRefreshToken(tokens.hashedRefreshToken, tokens.expires_at, user_id)

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        }
    }
    catch(err)
    {
        throw err;
    }
}

export async function registerService(name: string, surname: string, email: string, password: string)
{
    try
    {

    }
    catch(err)
    {
    throw err;
    }
}

export async function registerEndService(email: string, code: number)
{
    try
    {

    }
    catch(err)
    {
    throw err;
    }
}

export async function forgotPasswordService(email:string)
{
    try
    {

    }
    catch(err)
    {
        throw err;
    }
}

export async function resetPasswordService(password: string, token: string)
{
    try
    {

    }
    catch(err)
    {
        throw err;
    }
}


export async function refreshService(refreshToken: string)
{
    try
    {

    }
    catch(err)
    {
        throw err;
    }
}

export async function logoutService(refreshToken: string, allDevices: boolean)
{
    try
    {

    }
    catch(err)
    {
        throw err;
    }
}