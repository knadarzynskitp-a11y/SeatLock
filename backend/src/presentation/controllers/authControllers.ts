import type { Request, Response } from "express";
import { errorFunction } from "../middleware/errors/errorFunction.js";
import * as Service from '../../application/use-cases/authServices.js'
import * as Repo from '../../infrastructure/database/repositories/authRepo.js'
import { passwordHasher } from "../../infrastructure/security/bcrypt.js";
import { generateTokens } from "../../infrastructure/security/jwt.js";
import { cryptoNumber } from "../../infrastructure/security/crypto.js";
import {sendMail} from '../../infrastructure/security/nodemailer.js'
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

    }
    catch(err)
    {
        errorFunction(res, err)
    }
}

export async function logoutController(req: Request, res: Response)
{
    try
    {

    }
    catch(err)
    {
        errorFunction(res, err)
    }
}



