import type { Request, Response } from "express";
import { errorFunction } from "../middleware/errors/errorFunction.js";

export async function loginController(req: Request, res: Response)
{
    try
    {
        
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



