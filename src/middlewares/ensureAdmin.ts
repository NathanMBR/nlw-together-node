import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    const { userId } = request;

    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne(userId);
    const isAdmin = user?.isAdmin;

    return isAdmin ? next() : response.status(401).json({
        error: "Unauthorized"
    });
}