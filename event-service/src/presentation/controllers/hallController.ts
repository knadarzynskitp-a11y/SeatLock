import type { Request, Response } from "express";
import  {errorFunction} from '../middleware/errors/errorFunction.js'
import * as Service from '../../application/use-cases/hallServices.js'
import * as Repo from '../../infrastructure/database/repository/hallRepo.js'

export async function createSeatsController(req: Request, res: Response)
{
    try
    {
        const hallId = Number(req.params.hallId);
        const {sector, rows} = req.body;

        const data = await Service.createSeatsService(hallId, sector, rows, Repo.seatRepository);

        return res.status(201).json({success: true, data});
    }
    catch (err)
    {
        errorFunction(res, err);
    }
}

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
            institution,
            Repo.hallRepository
        )

        return res.status(201).json({success: true})
    }
    catch(err)
    {
        errorFunction(res, err)
    }
}
