import { NextFunction } from "express";

export async function checkLogged(req: Request, res: Response, next: NextFunction)
{
    const data = await fetch(
        `http://identity-service:3001/logged`,
        
    )

    res.locals.user_id = data.user_id;
    res.locals.user_role = data.role

    next()
}