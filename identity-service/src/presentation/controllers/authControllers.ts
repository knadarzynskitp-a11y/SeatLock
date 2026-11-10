import type { NextFunction, Request, Response } from "express";
import { errorFunction } from "../middleware/errors/errorFunction.js";
import * as Service from '../../application/use-cases/authServices.js'
import * as Repo from '../../infrastructure/database/repositories/authRepo.js'
import { passwordHasher } from "../../infrastructure/security/bcrypt.js";
import { generateTokens } from "../../infrastructure/security/jwt.js";
import { cryptoNumber } from "../../infrastructure/security/crypto.js";
import {sendMail} from '../../infrastructure/security/nodemailer.js'
import { ValidationError } from "../../application/errors/errors.js";
export async function loginController(req: Request, res: Response)
{
    try
    {
        const {email, password} = req.body;

        const data = await Service.loginService(email, password, Repo.userRepository, passwordHasher, generateTokens, Repo.refreshTokenRepository)

        const refreshToken = data.refreshToken;
        const accessToken = data.accessToken;

        return res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.STACK === 'production',
            sameSite: "strict",
            maxAge: 90 * 24 * 60 * 60 * 1000,
        }).cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.STACK === 'production',
            sameSite: "strict",
            maxAge: 15 * 60 * 1000}).json({
            success: true
        })
    }
    catch(err)
    {
        errorFunction(res, err)
    }
}

export async function registerController(req: Request, res: Response)
{
    try
    {
        const {name, surname, email, password} = req.body;

        await Service.registerService(name, surname, email, password, Repo.userRepository, passwordHasher, Repo.emailVerificationRepository, cryptoNumber, sendMail)

        return res.json({success: true, message: "Jeśli email istnieje, wyslaliśmy na niego wiadomość"})
    }
    catch(err)
    {
        errorFunction(res, err)
    }
}

export async function registerEndController(req: Request, res: Response)
{
    try
    {
        const {email, code} = req.body;

        await Service.registerEndService(email, code, Repo.emailVerificationRepository, Repo.userRepository, Repo.createUserTransactionRepository)

        return res.json({success: true})
    }
    catch(err)
    {
        errorFunction(res, err)
    }
}

export async function forgotPasswordController(req: Request, res: Response)
{
    try
    {
        const {email} = req.body;

        await Service.forgotPasswordService(email, Repo.userRepository, cryptoNumber, Repo.resetPasswordRepository, sendMail)

        return res.json({success:true, message: "Jeśli email istnieje, wysłalismy na niego wiadomość"})
    }
    catch(err)
    {
        errorFunction(res, err)
    }
}

export async function resetPasswordController(req: Request, res: Response)
{
    try
    {
        const {token, password} = req.body;

        await Service.resetPasswordService(password, token, cryptoNumber, Repo.resetPasswordRepository, passwordHasher, Repo.createResetTransactionRepository)

        return res.json({success: true, message: "Konto utworzone"});
    }
    catch(err)
    {
        errorFunction(res, err)
    }
}


export async function refreshController(req: Request, res: Response)
{
    try
    {
        const {refreshToken} = req.cookies;

        const result = await Service.refreshService(refreshToken, cryptoNumber, Repo.refreshTokenRepository, generateTokens, Repo.userRepository)

        return res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: process.env.STACK === 'production',
            sameSite: "strict",
            maxAge: 90 * 24 * 60 * 60 * 1000,
        }).cookie("accessToken", result.accessToken, {
            httpOnly: true,
            secure: process.env.STACK === 'production',
            sameSite: "strict",
            maxAge: 15 * 60 * 1000}).json({
            success: true
        })
    }
    catch(err)
    {
        clearCookie(res)
        errorFunction(res, err)
    }
}

export async function logoutController(req: Request, res: Response)
{
    try
    {
        const {refreshToken} = req.cookies;
        const {allDevices} = req.body;

        if (typeof refreshToken !== "string") {
            throw new ValidationError("Nieprawidlowy Token")
            }

        await Service.logoutService(refreshToken, allDevices, Repo.refreshTokenRepository, cryptoNumber)

        clearCookie(res)

        return res.json({success: true})
    }
    catch(err)
    {
        clearCookie(res)
        errorFunction(res, err)
    }
}

export async function requireBeLoggedController(req: Request, res: Response, next: NextFunction)
{
    const {accessToken} = req.cookies;

    try
    {
         const data = await Service.requireBeLoggedService(accessToken, generateTokens);

         res.locals.user_id = data.user_id;

         next()
    }
    catch(err)
    {
        errorFunction(res, err)
    }
}




function clearCookie(res: Response)
{
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.STACK === "production",
        sameSite: "strict",
        path: "/"
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.STACK === "production",
        sameSite: "strict",
        path: "/"
    });
}



