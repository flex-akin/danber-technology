import { NextFunction, Request, Response } from "express";
import { ICreateUserDto } from "./dto/user.dto";
import bcrypt from "bcryptjs";
import { UserModel } from "./user.schema";
import { validateCreateData } from "../helper/validation";
import { MessageInterface } from "interface/messageInterface";
import { catchAsync } from "catch-async-wrapper-express";
import createHttpError from "http-errors";


export const createUser = catchAsync(async (req: Request<{}, {}, ICreateUserDto>, res: Response<MessageInterface>, next: NextFunction) => {
    const valid = validateCreateData(req.body)
    if (valid.error) return next(createHttpError.BadRequest(valid.error.message.replace(/\\"/g, '')))
    const user = await UserModel.findOne({
        email: req.body.email
    })
    if(user) return next(createHttpError.BadRequest("this email is already taken"))
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword
    const savedUser = await UserModel.create(req.body)
    res.status(201).send({
        message: "user created",
        data: {id : savedUser._id, email: savedUser.email},
        status: true
    })
})

export const getAllUsers = 
async (req: Request, res: Response<MessageInterface>, next: NextFunction) => {
    try {
        const user = await UserModel.find()
        if (!user) return next(createHttpError(404, "No task found"));
        res.status(200).send({
            message: "data fetched successfully",
            status: true, 
            data: user          
        });
    } catch (error) {
       return next(createHttpError.InternalServerError("internal server error"))
    }
}

