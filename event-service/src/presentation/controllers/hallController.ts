import type { Request, Response } from "express";
import  {errorFunction} from '../middleware/errors/errorFunction.js'
import * as Service from '../../application/use-cases/hallServices.js'

export async function createHallController(req: Request, res: Response)
{
    try
    {
        const {name, country, zipCode, city, street, number, institution} = req.body;

        await Service.createHallService(
            name,
            country,
            zipCode,
            city,
            street,
            number,
            institution
        )

        return res.json({success: true})
    }
    catch(err)
    {
        errorFunction(res, err)
    }
}