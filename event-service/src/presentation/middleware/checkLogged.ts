import type { NextFunction, Request, Response } from "express";
import { AppError, AuthorizationError, NoAccess } from "../../application/errors/errors.js";
import { errorFunction } from "./errors/errorFunction.js";

export async function checkLogged(req: Request, res: Response, next: NextFunction)
{
    try
    {
        const response = await fetch("http://identity-service:3001/logged", {
            headers: {cookie: req.headers.cookie ?? ""},
            signal: AbortSignal.timeout(5000)
        });

        if (response.status === 400 || response.status === 401)
        {
            throw new AuthorizationError("Zaloguj się");
        }

        if (response.status === 403)
        {
            throw new NoAccess("Brak dostępu");
        }

        if (!response.ok)
        {
            throw new AppError("Nie udało się sprawdzić logowania", 502);
        }

        const result = await response.json();

        if (result?.success !== true || typeof result?.data?.user_id !== "number" || typeof result?.data?.role !== "string")
        {
            throw new AppError("Nieprawidłowa odpowiedź serwisu logowania", 502);
        }

        res.locals.user_id = result.data.user_id;
        res.locals.user_role = result.data.role;
    }
    catch (err)
    {
        return errorFunction(res, err);
    }

    next();
}
