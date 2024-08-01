import { catchAsync } from "catch-async-wrapper-express";
import { NextFunction, Request, Response } from "express";
import { MessageInterface } from "interface/messageInterface";
import {  ICustomRequestParams, ITaskDto, IUpdateTask } from "./dto/task.dto";
import {  validateTask, validateUpdateTask } from "../helper/validation";
import createHttpError from "http-errors";
import { TaskModel } from "./task.schema";

export const createTask = catchAsync(async(req: Request<{}, {}, ITaskDto >, res: Response<MessageInterface>, next: NextFunction) => {
    let user = req.user?.id
    const valid = validateTask(req.body)
    if (valid.error) return next(createHttpError.BadRequest(valid.error.message.replace(/\\"/g, '')));
    const createData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate,
        user
    }
   const data = await TaskModel.create(createData)
    res.status(201).send({
        message: "task created",
        status: true,
        data 
    })
} )

export const deleteTask = 
    async (req: Request<ICustomRequestParams>, res: Response<MessageInterface>, next: NextFunction) => {
        try {
            const { id } = req.params; 
            const task = await TaskModel.findByIdAndDelete(id);
            if (!task) return next(createHttpError(404, 'Task not found'));
            res.status(204).send({
                message: "deleted",
                status: true           
            }); 
        } catch (error) {
            return next(createHttpError.InternalServerError("internal server error"))
        }
    
    };

export const getUserTask = 
    async (req: Request<ICustomRequestParams>, res: Response<MessageInterface>, next: NextFunction) => {
        try {
            let user = req.user?.id
            const task = await TaskModel.find({
                user
            })
            if (!task) return next(createHttpError(404, "No task found"));
            res.status(200).send({
                message: "data fetched successfully",
                status: true, 
                data: task          
            });
        } catch (error) {
           return next(createHttpError.InternalServerError("internal server error"))
        }
    }

    export const updateTask = 
    async (req: Request<ICustomRequestParams, {}, IUpdateTask>, res: Response<MessageInterface>, next: NextFunction) => {
       try {
        const valid = validateUpdateTask(req.body)
        if (valid.error) return next(createHttpError.BadRequest(valid.error.message.replace(/\\"/g, '')));
        const { id } = req.params; 
        const task = await TaskModel.findById(id);
        if (!task) return next(createHttpError(404, 'Task not found'));
        const updatedTask = await TaskModel.updateOne({_id : id}, {
            status: req.body?.status,
            dueDate: req.body?.dueDate
        },  { new: true } )
        
       
        res.status(200).send({
            message: "task updated",
            status: true,
            data : updatedTask           
        });
       } catch (error) {
        
       }
       
    };

    export const getAllTask = 
    async (req: Request, res: Response<MessageInterface>, next: NextFunction) => {
        try {
            const task = await TaskModel.find()
            if (!task) return next(createHttpError(404, "No task found"));
            res.status(200).send({
                message: "data fetched successfully",
                status: true, 
                data: task          
            });
        } catch (error) {
           return next(createHttpError.InternalServerError("internal server error"))
        }
    }

    export const filterTaskByStatus = async (req: Request, res: Response<MessageInterface>, next: NextFunction) => {
        try {
            const { status } = req.query;
            const query = status ? { status } : {}
            const tasks = await TaskModel.find(query).sort({ dueDate: 1 });
            if (tasks.length === 0) return next(createHttpError(404, "No task found"));
            res.status(200).send({
                message: "Data fetched successfully",
                status: true,
                data: tasks
            });
        } catch (error) {
            return next(createHttpError(500, "Internal server error"));
        }
    };
