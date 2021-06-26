import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { settings } from "../settings";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;
    const { secret } = settings.jwt;

    if (!authorization)
        return response.status(401).end();
    
    const token = authorization.split(" ")[1];
    
    try {
        const { sub } = verify(token, secret) as IPayload;
        request.userId = sub;
        return next();
    } catch (error) {
        return response.status(401).end();
    }
}