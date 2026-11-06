import type { Request, Response } from "express";
import  {errorFunction} from '../middleware/errors/errorFunction.js'

export async function getEvents(req: Request, res: Response)
{
    try
    {

    }
    catch(err)
    {
        errorFunction(res, err)
    }
}