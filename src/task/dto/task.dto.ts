import { ParamsDictionary } from "express-serve-static-core";
export interface ITaskDto {
    title: string,
    description: string,
    status: TaskStatus,
    dueDate: Date
}

export enum TaskStatus {
    ONGOING = "ongoing",
    UPCOMING = "upcoming",
    COMPLETED = "completed",
    ARCHIVED = "archived"
}



export interface ICustomRequestParams extends ParamsDictionary {
    id: string;
}

export interface ICustomRequestParamsTask extends ParamsDictionary {
    taskId: string;
}

export interface IUpdateTask {
    status?: TaskStatus,
    dueDate?: Date
} 