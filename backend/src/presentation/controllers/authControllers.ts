import type { Request, Response } from "express";
import { errorFunction } from "../middleware/errors/errorFunction.js";
import * as Service from '../../application/use-cases/authServices.js'
import * as Repo from '../../infrastructure/database/repositories/authRepo.js'
import { bcryptPasswordHasher } from "../../infrastructure/security/bcrypt.js";
import { generateTokens } from "../../infrastructure/security/jwt.js";
export async function loginController(req: Request, res: Response)
{
    try
    {
        const {email, password} = req.body;

        const data = await Service.loginService(email, password, Repo.userRepository, bcryptPasswordHasher, generateTokens, Repo.refreshTokenRepository)
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



