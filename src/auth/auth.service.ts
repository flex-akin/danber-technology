import { NextFunction, Request, Response } from "express";
import { ILoginDto } from "./dto/auth.dto";
import { UserModel } from "../users/user.schema";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { MessageInterface } from "interface/messageInterface";
import { validateLoginData } from "../helper/validation";


export const loginUser = async (req: Request<{}, {}, ILoginDto>, res: Response<MessageInterface>, next: NextFunction) => {
    validateLoginData(req.body)
    let user = await UserModel.findOne({
        email: req.body.email
    })

    if (!user) return next(createHttpError.NotFound("user not found"))
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return next(createHttpError[401]("invalid credentials"))
    const payload = {
        role: user.role,
        id: user.id
    }
    res.status(200).send({
        message: "log in successful",
        status: true,
        data: {
            token: generateJWT(payload),
            tokenType: "Bearer"
        }
    })
}

const generateJWT = (payload: { role: string, id: string }) => {
    return jwt.sign(payload, process.env.JWT_SECRET!)
}