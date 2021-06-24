import { Request, Response, NextFunction } from "express";

export function ensureAdmin(_request: Request, response: Response, next: NextFunction) {
    const admin = true;

    return admin ? next() : response.status(401).json({
        error: "Unauthorized"
    });
}