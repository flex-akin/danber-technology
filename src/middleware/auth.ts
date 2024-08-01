import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { role } from "../interface/optionsInterface";
import jwt from "jsonwebtoken"
import { TUser } from "../types/express";

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction ) => {
    try {
        const {authorization} = req.headers
        if (!authorization) {
            next(createHttpError[401]("Unauthorized"))
        }
        const accessToken = authorization?.split(" ")[1]
        const payload = jwt.verify(
            accessToken!, process.env.JWT_SECRET!
        ) as TUser
        req.user = payload
        next()
    } catch (error) {
        return next(createHttpError.BadRequest("unable to verify token"))
    }
}

export const isAdmin = async(req: Request, res: Response, next: NextFunction) =>{
    if (req.user?.role !== role.ADMIN) return next(createHttpError[403]("Forbidden"))
    next()
}