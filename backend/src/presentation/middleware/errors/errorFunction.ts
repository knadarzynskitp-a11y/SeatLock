import { AppError } from "../../../application/errors/errors.js"
import errorHandler from "./errorHandler.js"
import type {Response} from 'express'

export function errorFunction(res: Response, err: any)
{
    if (err instanceof AppError)
    {
        return errorHandler(res, err.message, err.statusCode)
    }

    console.error(err)
    return errorHandler(res, "Wystąpił nieoczekiwany błąd", 500)
}