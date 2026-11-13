import type { Request, Response } from 'express'
import { NoAccess } from '../../application/errors/errors.js'
import { createEventService, takeEventByIdService, takeEventsService } from '../../application/use-cases/eventServices.js'
import { eventRepository } from '../../infrastructure/database/repository/eventRepo.js'
import { errorFunction } from '../middleware/errors/errorFunction.js'

export async function createEventController(req: Request, res: Response)
{
    try
    {
        if (res.locals.user_role !== 'Admin')
        {
            throw new NoAccess('Tylko administrator może utworzyć wydarzenie')
        }

        const {name, price, description, startDate, endDate, hallId} = req.body
        await createEventService(name, price, description, startDate, endDate, hallId, eventRepository)

        return res.status(201).json({success: true})
    }
    catch (err)
    {
        return errorFunction(res, err)
    }
}

export async function takeEventsController(req: Request, res: Response)
{
    try
    {
        const data = await takeEventsService(eventRepository)

        return res.status(200).json({success: true, data})
    }
    catch (err)
    {
        return errorFunction(res, err)
    }
}

export async function takeEventByIdController(req: Request, res: Response)
{
    try
    {
        const eventId = Number(req.params.eventId)
        const data = await takeEventByIdService(eventId, eventRepository)

        return res.status(200).json({success: true, data})
    }
    catch (err)
    {
        return errorFunction(res, err)
    }
}
