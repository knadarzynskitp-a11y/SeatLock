import { ValidationError, AuthorizationError, NoAccess, NotFoundError } from '../errors/errors.js'
import validator from 'validator'
import type * as Interfaces from '../ports/authPorts.js'

export async function loginService(email: string, password: string, userRepository: Interfaces.IuserRepository, passwordHasher: Interfaces.IpasswordHasher, generateTokens: Interfaces.ItokenGeneration, createRefreshToken: Interfaces.IrefreshTokensRepository)
{
    
        if(!email || !password)
        {
            throw new ValidationError("Wprowadź dane");
        }

        email = email.trim();
        password = password.trim();

        if(!email || !password)
        {
            throw new ValidationError("Wprowadź dane");
        }
        else if(email.length < 6 || email.length > 60)
        {
            throw new ValidationError("Długość znaków adresu e-mail jest nieprawidłowa")
        }
        else if(!validator.isEmail(email))
        {
            throw new ValidationError("Podany adres e-mail najprawdopodobniej nie jest adresem e-mail")
        }

    try
    {

        const user = await userRepository.findByEmail(email);

        if(!user)
        {
            throw new AuthorizationError("Nieprawidłowy login lub hasło")
        }

        const match = await passwordHasher.compare(password, user.password)

        if(!match)
        {
            throw new AuthorizationError("Nieprawidłowy login lub hasło")
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

export async function registerService(name: string, surname: string, email: string, password: string, userRepository: Interfaces.IuserRepository, passwordHasher: Interfaces.IpasswordHasher, emailVerificationRepository: Interfaces.IemailVerificationRepository, cryptoNumber: Interfaces.Icrypto, sendMail: Interfaces.IemailSend)
{
    
        if(!name || !surname || !email || !password)
        {
            throw new ValidationError("Wprowadź dane")
        }

        surname = surname.trim()
        name = name.trim()
        email = email.trim()
        password = password.trim()

        if(!name || !surname || !email || !password)
        {
            throw new ValidationError("Wprowadź dane")
        }
        if(name.length > 15) 
        {
            throw new ValidationError("Imię jest zbyt długie");
        }
        if(surname.length < 2 || surname.length > 30)
        {
            throw new ValidationError("Nazwisko musi zawierać od 2 do maksymalnie 30 znaków")
        }
        if(!validator.isEmail(email))
        {
            throw new ValidationError("Podany adres e-mail najprawdopodobniej nie jest adresem e-mail")
        }
        if(!validator.isStrongPassword(password, {
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
            minLength: 8
        }))
        {
            throw new ValidationError("Hasło musi zawierać co najmniej jedną małą, dużą literę, jedną cyfrę oraz minimum 8 znaków")
        }
        if (Buffer.byteLength(password, 'utf8') > 72) 
        {
            throw new ValidationError("Hasło jest zbyt długie");
        }

        const zawieraCyfry = /\d/.test(name);
        const zawieraZnakiSpecjalne = /[^A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(name);
        const zawieraCyfry2 = /\d/.test(surname);
        const zawieraZnakiSpecjalne2 = /[^A-Za-ząćęłńóśźżĄĆĘŁŃÓŚŹŻ]/.test(surname);

        if(zawieraCyfry || zawieraCyfry2 || zawieraZnakiSpecjalne || zawieraZnakiSpecjalne2)
        {
            throw new ValidationError("Imię i nazwisko nie mogą zawierać znaków specjalnych i cyfr")
        }

    try
    {
        const match = await userRepository.findByEmail(email)

        if(!match)
        {
            throw new ValidationError("E-mail jest już zajęty")
        }

        const hashedPassword = await passwordHasher.hash(password)
        const code = await cryptoNumber.randomInt(100000, 1000000)
        const expires_at = new Date(Date.now() + 10 * 60 * 1000);

        await emailVerificationRepository.deleteEmailVerificationData(email)
        
        await emailVerificationRepository.createEmailVerificatonData(name, surname, email, hashedPassword, code, expires_at)

        await sendMail.sendMail(email, code)
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