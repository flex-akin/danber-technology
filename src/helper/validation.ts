import { ILoginDto } from "auth/dto/auth.dto"
import Joi from "joi"
import { ITaskDto, IUpdateTask } from "task/dto/task.dto"
import { ICreateUserDto } from "users/dto/user.dto"

export const validateLoginData = (login: ILoginDto) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return loginSchema.validate(login)
}

export const validateCreateData = (createUserData: ICreateUserDto) => {
    const userSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        username: Joi.string().required(),
        role: Joi.string().valid('admin', 'user').required()
    })
    return userSchema.validate(createUserData)
}

export const validateTask = (taskDto: ITaskDto) => {
    const taskSchema = Joi.object({
        dueDate: Joi.date().required(),
        description: Joi.string().required(),
        title: Joi.string().required(),
        status: Joi.string().valid('ongoing', 'upcoming', 'completed', 'archived').required()
    })
    return taskSchema.validate(taskDto)
}

export const validateUpdateTask = (taskDto: IUpdateTask) => {
    const taskSchema = Joi.object({
        dueDate: Joi.date(),
        status: Joi.string().valid('ongoing', 'upcoming', 'completed', 'archived')
    })
    return taskSchema.validate(taskDto)
}
